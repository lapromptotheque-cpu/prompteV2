-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- HNSW index for fast cosine similarity search
CREATE INDEX IF NOT EXISTS prompts_embedding_idx
  ON prompts USING hnsw (embedding vector_cosine_ops);

-- Semantic search RPC
CREATE OR REPLACE FUNCTION match_prompts(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.4,
  match_count int DEFAULT 24
)
RETURNS TABLE (
  id uuid,
  notion_id text,
  titre text,
  numero integer,
  prompt text,
  punchline text,
  objectif text,
  categorie text,
  couleur text,
  tag text,
  livre text,
  framework_utilise text,
  resultat text,
  step text,
  texte_seo text,
  notion_created_at timestamptz,
  copy_count integer,
  created_at timestamptz,
  updated_at timestamptz,
  slug text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    p.id, p.notion_id, p.titre, p.numero, p.prompt, p.punchline, p.objectif,
    p.categorie, p.couleur, p.tag, p.livre, p.framework_utilise, p.resultat,
    p.step, p.texte_seo, p.notion_created_at, p.copy_count, p.created_at,
    p.updated_at, p.slug,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM prompts p
  WHERE p.embedding IS NOT NULL
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
$$;
