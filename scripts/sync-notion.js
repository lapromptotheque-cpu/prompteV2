require('dotenv').config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DB1_ID = "355639ae-e62c-81b8-a61a-cabdbf89a772";
const DB2_ID = process.env.NOTION_KANBAN_DB_ID;

const headers = {
  "Authorization": `Bearer ${NOTION_API_KEY}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json"
};

async function queryDatabase(dbId) {
  let results = [];
  let hasMore = true;
  let nextCursor = undefined;

  while (hasMore) {
    const response = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ start_cursor: nextCursor })
    });
    const data = await response.json();
    if (data.object === "error") throw new Error(data.message);
    results = results.concat(data.results);
    hasMore = data.has_more;
    nextCursor = data.next_cursor;
  }
  return results;
}

async function createDb2Item(db1Item) {
  const title = db1Item.properties.Name.title[0]?.plain_text || "Sans titre";
  const originalId = db1Item.id;
  
  await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      parent: { database_id: DB2_ID },
      properties: {
        "Name": { title: [{ text: { content: title } }] },
        "Status": { select: { name: "À faire" } },
        "Codé": { checkbox: false },
        "Fonctionnel": { checkbox: false },
        "Original ID": { rich_text: [{ text: { content: originalId } }] }
      }
    })
  });
  console.log(`➡️ [SYNC] Carte créée dans le Kanban : "${title}"`);
}

async function updateDb1Item(db1ItemId, code, fonctionnel) {
  await fetch(`https://api.notion.com/v1/pages/${db1ItemId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      properties: {
        "Codé": { checkbox: code },
        "Fonctionnel": { checkbox: fonctionnel }
      }
    })
  });
}

async function updateDb2Status(db2ItemId, newStatus) {
  await fetch(`https://api.notion.com/v1/pages/${db2ItemId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      properties: {
        "Status": { select: { name: newStatus } }
      }
    })
  });
}

async function runSync() {
  console.log("🔄 Début de la synchronisation Notion...");
  try {
    const db1Items = await queryDatabase(DB1_ID);
    const db2Items = await queryDatabase(DB2_ID);

    // 1. Gérer les items "Validés" de la DB 1 vers la DB 2
    for (const item1 of db1Items) {
      const isValidated = item1.properties["Validé"]?.checkbox === true;
      if (isValidated) {
        // Vérifier s'il existe déjà dans la DB 2
        const existsInDb2 = db2Items.some(item2 => {
          const origIdProp = item2.properties["Original ID"];
          return origIdProp && origIdProp.rich_text[0]?.plain_text === item1.id;
        });

        if (!existsInDb2) {
          await createDb2Item(item1);
        }
      }
    }

    // 2. Synchroniser les états de la DB 2 vers la DB 1
    const db2ItemsRefreshed = await queryDatabase(DB2_ID); // Rafraîchir
    for (const item2 of db2ItemsRefreshed) {
      const code = item2.properties["Codé"]?.checkbox === true;
      const fonctionnel = item2.properties["Fonctionnel"]?.checkbox === true;
      const originalId = item2.properties["Original ID"]?.rich_text[0]?.plain_text;
      const currentStatus = item2.properties["Status"]?.select?.name;

      if (originalId) {
        // Mettre à jour la DB 1
        const item1 = db1Items.find(i => i.id === originalId);
        if (item1) {
          const item1Code = item1.properties["Codé"]?.checkbox === true;
          const item1Fonctionnel = item1.properties["Fonctionnel"]?.checkbox === true;
          
          if (item1Code !== code || item1Fonctionnel !== fonctionnel) {
            await updateDb1Item(originalId, code, fonctionnel);
            console.log(`⬅️ [SYNC] Mise à jour des cases pour : "${item2.properties.Name.title[0]?.plain_text}"`);
          }
        }
      }

      // Auto-update Status to "Terminé" if both are checked
      if (code && fonctionnel && currentStatus !== "Terminé") {
        await updateDb2Status(item2.id, "Terminé");
        console.log(`✅ [SYNC] Auto-Terminé : "${item2.properties.Name.title[0]?.plain_text}"`);
      }
    }

    console.log("✅ Synchronisation terminée avec succès !");
  } catch(e) {
    console.error("❌ Erreur de synchronisation:", e.message);
  }
}

runSync();
