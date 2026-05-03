require('dotenv').config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const TARGET_PAGE_ID = "354639aee62c807aab0ae080f3795538";

if (!NOTION_API_KEY) {
  console.error("Erreur: NOTION_API_KEY manquante dans .env");
  process.exit(1);
}

const headers = {
  "Authorization": `Bearer ${NOTION_API_KEY}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json"
};

async function createDocumentationPage() {
  const children = [
    {
      "object": "block",
      "type": "heading_2",
      "heading_2": { "rich_text": [{ "type": "text", "text": { "content": "1. Architecture Globale (Next.js)" } }] }
    },
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": { "rich_text": [{ "type": "text", "text": { "content": "L'application est construite sur Next.js (App Router) en tant que framework Full-Stack, et organisée de manière modulaire dans le dossier /modules/ (prompts, playground, analytics)." } }] }
    },
    {
      "object": "block",
      "type": "heading_2",
      "heading_2": { "rich_text": [{ "type": "text", "text": { "content": "2. Base de Données (Supabase)" } }] }
    },
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": { "rich_text": [{ "type": "text", "text": { "content": "Nous utilisons Supabase en local pour le développement. L'environnement local est lié au projet distant gsirarihnosmwbummflx. Commandes : npm run db:test:start et npm run db:test:seed." } }] }
    },
    {
      "object": "block",
      "type": "heading_2",
      "heading_2": { "rich_text": [{ "type": "text", "text": { "content": "3. Workflow Git (Feature Branch)" } }] }
    },
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": { "rich_text": [{ "type": "text", "text": { "content": "INTERDICTION de pousser sur main. Il faut créer une branche (feature/xyz) puis ouvrir une Pull Request sur GitHub." } }] }
    },
    {
      "object": "block",
      "type": "heading_2",
      "heading_2": { "rich_text": [{ "type": "text", "text": { "content": "4. Tests" } }] }
    },
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": { "rich_text": [{ "type": "text", "text": { "content": "Vitest pour les tests unitaires (npm run test:unit). Playwright pour les tests End-to-End E2E (npm run test:e2e)." } }] }
    }
  ];

  const payload = {
    "parent": { "page_id": TARGET_PAGE_ID },
    "properties": {
      "title": {
        "title": [
          { "text": { "content": "Documentation Technique & Architecture" } }
        ]
      }
    },
    "children": children
  };

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (data.object === "error") {
    console.error("Erreur Notion:", data.message);
  } else {
    console.log("✅ Page de documentation créée avec succès sur Notion ! ID:", data.id);
  }
}

createDocumentationPage();
