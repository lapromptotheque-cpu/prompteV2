require('dotenv').config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const TARGET_PAGE_ID = process.env.NOTION_TARGET_PAGE_ID;

if (!NOTION_API_KEY || !DATABASE_ID || !TARGET_PAGE_ID) {
  console.error("ERREUR : Variables d'environnement manquantes (NOTION_API_KEY, NOTION_DATABASE_ID ou NOTION_TARGET_PAGE_ID). Veuillez configurer votre fichier .env");
  process.exit(1);
}

const headers = {
  "Authorization": `Bearer ${NOTION_API_KEY}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json"
};

async function fetchCompletedTasksToday() {
  const today = new Date().toISOString().split('T')[0];
  console.log(`Recherche des tickets terminés aujourd'hui (${today})...`);

  const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      filter: {
        and: [
          {
            property: 'Status',
            status: {
              equals: 'Fait'
            }
          },
          {
            timestamp: "last_edited_time",
            last_edited_time: {
              on_or_after: today
            }
          }
        ]
      }
    })
  });

  const data = await response.json();
  if (data.object === "error") {
    throw new Error(data.message);
  }
  return data.results;
}

async function appendDashboardToPage(tasks) {
  const todayDate = new Date().toLocaleDateString('fr-FR');
  
  let childrenBlocks = [
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: `🚀 Dashboard du ${todayDate}` } }]
      }
    }
  ];

  if (tasks.length === 0) {
    childrenBlocks.push({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ type: 'text', text: { content: "Aucun ticket n'a été marqué comme 'Fait' aujourd'hui." } }]
      }
    });
  } else {
    const taskBlocks = tasks.map(task => {
      const titleProp = task.properties.Title;
      const title = titleProp && titleProp.title.length > 0 ? titleProp.title[0].plain_text : "Ticket sans titre";
      const url = task.url;

      return {
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [
            { type: 'text', text: { content: "✅ " } },
            { type: 'text', text: { content: title, link: { url: url } } }
          ]
        }
      };
    });

    childrenBlocks = childrenBlocks.concat(taskBlocks);
  }

  // Ajout d'un séparateur
  childrenBlocks.push({
    object: 'block',
    type: 'divider',
    divider: {}
  });

  const response = await fetch(`https://api.notion.com/v1/blocks/${TARGET_PAGE_ID}/children`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      children: childrenBlocks
    })
  });

  const data = await response.json();
  if (data.object === "error") {
    throw new Error(`Erreur lors de l'écriture dans Notion: ${data.message}`);
  }
  console.log("✅ Dashboard mis à jour avec succès dans Notion !");
}

async function run() {
  try {
    const tasks = await fetchCompletedTasksToday();
    console.log(`${tasks.length} ticket(s) trouvé(s).`);
    await appendDashboardToPage(tasks);
  } catch (error) {
    console.error("❌ Erreur d'exécution :", error.message);
  }
}

run();
