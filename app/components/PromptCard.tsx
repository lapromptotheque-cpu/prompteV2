import { Prompt } from '@/types/prompt'
import { CopyButton } from './CopyButton'

export function PromptCard({ prompt }: { prompt: Prompt }) {
  const accent = prompt.couleur ?? 'var(--accent-purple)'

  return (
    <article className="prompt-card glass-card">
      <div className="prompt-card__header">
        {prompt.categorie && (
          <span className="prompt-card__badge" style={{ borderColor: accent, color: accent }}>
            {prompt.categorie}
          </span>
        )}
        {prompt.tag && <span className="prompt-card__tag">{prompt.tag}</span>}
      </div>

      <a href={`/prompts/${prompt.id}`} className="prompt-card__link">
        <h2 className="prompt-card__title">{prompt.titre}</h2>
      </a>

      {prompt.punchline && (
        <p className="prompt-card__punchline">{prompt.punchline}</p>
      )}

      {prompt.prompt && (
        <div className="prompt-card__footer">
          <CopyButton text={prompt.prompt} promptId={prompt.id} initialCount={prompt.copy_count} />
          <a href={`/prompts/${prompt.id}`} className="detail-link">Voir →</a>
        </div>
      )}
    </article>
  )
}
