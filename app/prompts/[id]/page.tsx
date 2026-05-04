import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { CopyButton } from '@/app/components/CopyButton'
import { ShareButton } from '@/app/components/ShareButton'
import type { Prompt } from '@/types/prompt'

type Props = {
  params: Promise<{ id: string }>
}

async function fetchPrompt(id: string): Promise<Prompt | null> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as Prompt
}

export default async function PromptDetailPage({ params }: Props) {
  const { id } = await params
  const prompt = await fetchPrompt(id)

  if (!prompt) notFound()

  const accent = prompt.couleur ?? 'var(--accent-purple)'

  return (
    <main className="container">
      <div className="detail-nav">
        <a href="/prompts" className="detail-back">← Bibliothèque</a>
        {prompt.categorie && (
          <span className="prompt-card__badge" style={{ borderColor: accent, color: accent }}>
            {prompt.categorie}
          </span>
        )}
      </div>

      <div className="detail-layout">
        <div className="detail-main glass-card">
          <div className="detail-header">
            <h1 className="detail-title">{prompt.titre}</h1>
            {prompt.punchline && <p className="detail-punchline">{prompt.punchline}</p>}
          </div>

          {prompt.prompt && (
            <div className="detail-content-block">
              <div className="detail-content-header">
                <span className="detail-label">Prompt</span>
                <div className="detail-actions">
                  <CopyButton text={prompt.prompt} promptId={prompt.id} initialCount={prompt.copy_count} />
                  <ShareButton promptId={prompt.id} />
                </div>
              </div>
              <pre className="detail-prompt-text">{prompt.prompt}</pre>
            </div>
          )}
        </div>

        <aside className="detail-sidebar">
          {prompt.objectif && (
            <div className="detail-meta glass-card">
              <span className="detail-label">Objectif</span>
              <p>{prompt.objectif}</p>
            </div>
          )}

          {prompt.resultat && (
            <div className="detail-meta glass-card">
              <span className="detail-label">Résultat attendu</span>
              <p>{prompt.resultat}</p>
            </div>
          )}

          {(prompt.tag || prompt.step || prompt.framework_utilise || prompt.livre) && (
            <div className="detail-meta glass-card">
              <span className="detail-label">Infos</span>
              <dl className="detail-dl">
                {prompt.tag && <><dt>Tag</dt><dd>{prompt.tag}</dd></>}
                {prompt.step && <><dt>Étape</dt><dd>{prompt.step}</dd></>}
                {prompt.framework_utilise && <><dt>Framework</dt><dd>{prompt.framework_utilise}</dd></>}
                {prompt.livre && <><dt>Livre</dt><dd>{prompt.livre}</dd></>}
              </dl>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
