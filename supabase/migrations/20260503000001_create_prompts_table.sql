-- Migration : table prompts (miroir de la base Notion)
CREATE TABLE IF NOT EXISTS public.prompts (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  notion_id         TEXT        UNIQUE,          -- ID de la page Notion (pour la sync future)
  titre             TEXT        NOT NULL,
  numero            FLOAT,
  prompt            TEXT,
  punchline         TEXT,
  objectif          TEXT,
  categorie         TEXT,
  couleur           TEXT,
  tag               TEXT,
  livre             TEXT,
  framework_utilise TEXT,
  resultat          TEXT,
  step              TEXT,
  texte_seo         TEXT,
  notion_created_at TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prompts_updated_at
  BEFORE UPDATE ON public.prompts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS : lecture publique (bibliothèque accessible à tous sans auth)
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique des prompts"
  ON public.prompts
  FOR SELECT
  TO anon, authenticated
  USING (true);
