require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function buildText(p) {
  return [p.titre, p.punchline, p.objectif, p.tag, p.categorie]
    .filter(Boolean)
    .join('\n')
    .slice(0, 8000);
}

async function getEmbeddings(texts) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: 'text-embedding-3-small', input: texts }),
  });
  const json = await res.json();
  if (!json.data) throw new Error(JSON.stringify(json));
  return json.data.map(d => d.embedding);
}

async function main() {
  const { data: prompts, error } = await supabase
    .from('prompts')
    .select('id, titre, punchline, objectif, tag, categorie')
    .is('embedding', null);

  if (error) throw error;
  console.log(`${prompts.length} prompts à embedder`);

  const BATCH = 50;
  for (let i = 0; i < prompts.length; i += BATCH) {
    const batch = prompts.slice(i, i + BATCH);
    const texts = batch.map(buildText);
    const embeddings = await getEmbeddings(texts);

    for (let j = 0; j < batch.length; j++) {
      const { error: updateError } = await supabase
        .from('prompts')
        .update({ embedding: embeddings[j] })
        .eq('id', batch[j].id);
      if (updateError) console.error(`Erreur ${batch[j].id}:`, updateError.message);
    }
    console.log(`${Math.min(i + BATCH, prompts.length)} / ${prompts.length} embeddings générés`);
  }
  console.log('Done!');
}

main().catch(console.error);
