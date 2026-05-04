-- Generated tsvector column for French fulltext search
ALTER TABLE prompts
  ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (
    to_tsvector('french',
      coalesce(titre, '') || ' ' ||
      coalesce(punchline, '') || ' ' ||
      coalesce(tag, '') || ' ' ||
      coalesce(categorie, '') || ' ' ||
      coalesce(objectif, '')
    )
  ) STORED;

CREATE INDEX IF NOT EXISTS prompts_fts_idx ON prompts USING gin(fts);
