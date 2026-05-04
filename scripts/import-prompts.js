require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const PROMPTS_DB_ID = 'abbfa6d4b18c483681b631853c8e395b';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const notionHeaders = {
  Authorization: `Bearer ${NOTION_API_KEY}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
};

function getText(prop) {
  if (!prop) return null;
  if (prop.type === 'title') return prop.title?.map(t => t.plain_text).join('') || null;
  if (prop.type === 'rich_text') return prop.rich_text?.map(t => t.plain_text).join('') || null;
  if (prop.type === 'text') return prop.rich_text?.map(t => t.plain_text).join('') || null;
  return null;
}

function getNumber(prop) {
  return prop?.number ?? null;
}

async function fetchAllPages() {
  let results = [];
  let hasMore = true;
  let cursor;

  while (hasMore) {
    const body = cursor ? { start_cursor: cursor } : {};
    const res = await fetch(`https://api.notion.com/v1/databases/${PROMPTS_DB_ID}/query`, {
      method: 'POST',
      headers: notionHeaders,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.object === 'error') throw new Error(data.message);
    results = results.concat(data.results);
    hasMore = data.has_more;
    cursor = data.next_cursor;
  }
  return results;
}

function mapPage(page) {
  const p = page.properties;
  return {
    notion_id: page.id,
    titre: getText(p['Titre']) || 'Sans titre',
    numero: getNumber(p['Numéro']),
    prompt: getText(p['Prompt']),
    punchline: getText(p['Punchline']),
    objectif: getText(p['Objectif']),
    categorie: getText(p['Catégorie']),
    couleur: getText(p['Couleur']),
    tag: getText(p['Tag']),
    livre: getText(p['Livre']),
    framework_utilise: getText(p['Framework utilisé ']),
    resultat: getText(p['résultat']),
    step: getText(p['step']),
    texte_seo: getText(p['texte_seo']),
    notion_created_at: page.created_time,
  };
}

async function run() {
  console.log('Récupération des prompts depuis Notion...');
  const pages = await fetchAllPages();
  console.log(`${pages.length} prompts trouvés.`);

  const rows = pages.map(mapPage);

  console.log('Import dans Supabase...');
  const { error, count } = await supabase
    .from('prompts')
    .upsert(rows, { onConflict: 'notion_id', count: 'exact' });

  if (error) {
    console.error('Erreur import:', error.message);
    process.exit(1);
  }

  console.log(`Import terminé : ${count ?? rows.length} prompts insérés/mis à jour.`);
}

run();
