export type Prompt = {
  id: string
  notion_id: string
  titre: string
  numero: number | null
  prompt: string | null
  punchline: string | null
  objectif: string | null
  categorie: string | null
  couleur: string | null
  tag: string | null
  livre: string | null
  framework_utilise: string | null
  resultat: string | null
  step: string | null
  texte_seo: string | null
  notion_created_at: string | null
  copy_count: number
  created_at: string
  updated_at: string
  slug?: string | null
}
