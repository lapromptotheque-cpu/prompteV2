import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { embedText } from '@/lib/embeddings'
import { PromptCard } from '@/app/components/PromptCard'
import { SearchInput } from '@/app/components/SearchInput'
import { CategoryFilter } from '@/app/components/CategoryFilter'
import { FiltersPanel } from '@/app/components/FiltersPanel'
import type { Prompt } from '@/types/prompt'

const PAGE_SIZE = 24
const COLUMNS = 'id,notion_id,titre,numero,prompt,punchline,objectif,categorie,couleur,tag,livre,framework_utilise,resultat,step,texte_seo,notion_created_at,copy_count,created_at,updated_at,slug'

type Props = {
  searchParams: Promise<{
    q?: string
    page?: string
    cat?: string
    sem?: string
    tags?: string
    minCopies?: string
    dateFrom?: string
    dateTo?: string
  }>
}

async function fetchCategories(): Promise<string[]> {
  const { data } = await supabase
    .from('prompts')
    .select('categorie')
    .not('categorie', 'is', null)
  if (!data) return []
  return Array.from(new Set(data.map(r => r.categorie as string).filter(Boolean))).sort()
}

async function fetchTags(): Promise<string[]> {
  const { data } = await supabase
    .from('prompts')
    .select('tag')
    .not('tag', 'is', null)
  if (!data) return []
  return Array.from(new Set(data.map(r => r.tag as string).filter(Boolean))).sort()
}

async function fetchPrompts(
  q: string,
  cat: string,
  page: number,
  tags: string[],
  minCopies: number,
  dateFrom: string,
  dateTo: string,
) {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('prompts')
    .select(COLUMNS, { count: 'exact' })
    .order('numero', { ascending: true })
    .range(from, to)

  if (q) {
    if (q.length >= 2) {
      query = query.textSearch('fts', q, { type: 'websearch', config: 'french' })
    } else {
      query = query.or(`titre.ilike.%${q}%,punchline.ilike.%${q}%,tag.ilike.%${q}%,categorie.ilike.%${q}%`)
    }
  }
  if (cat) query = query.eq('categorie', cat)
  if (tags.length > 0) query = query.or(tags.map(t => `tag.eq.${t}`).join(','))
  if (minCopies > 0) query = query.gte('copy_count', minCopies)
  if (dateFrom) query = query.gte('created_at', dateFrom)
  if (dateTo) query = query.lte('created_at', dateTo)

  const { data, count, error } = await query
  if (error) throw error
  return { prompts: (data as Prompt[]) ?? [], total: count ?? 0 }
}

async function fetchPromptsSemantic(q: string, cat: string, tags: string[], minCopies: number, dateFrom: string, dateTo: string) {
  const embedding = await embedText(q)

  const { data, error } = await supabase.rpc('match_prompts', {
    query_embedding: embedding,
    match_threshold: 0.4,
    match_count: PAGE_SIZE,
  })

  if (error) throw error
  let results = (data as Prompt[]) ?? []
  if (cat) results = results.filter(p => p.categorie === cat)
  if (tags.length > 0) results = results.filter(p => p.tag && tags.includes(p.tag))
  if (minCopies > 0) results = results.filter(p => (p.copy_count ?? 0) >= minCopies)
  if (dateFrom) results = results.filter(p => p.created_at >= dateFrom)
  if (dateTo) results = results.filter(p => p.created_at <= dateTo + 'T23:59:59')
  return { prompts: results, total: results.length }
}

function buildPaginationUrl(q: string, cat: string, page: number, tags: string[], minCopies: number, dateFrom: string, dateTo: string) {
  const p = new URLSearchParams()
  if (q) p.set('q', q)
  if (cat) p.set('cat', cat)
  if (tags.length > 0) p.set('tags', tags.join(','))
  if (minCopies > 0) p.set('minCopies', String(minCopies))
  if (dateFrom) p.set('dateFrom', dateFrom)
  if (dateTo) p.set('dateTo', dateTo)
  p.set('page', String(page))
  return `/prompts?${p.toString()}`
}

export default async function PromptsPage({ searchParams }: Props) {
  const {
    q = '',
    page: pageStr = '1',
    cat = '',
    sem = '',
    tags: tagsStr = '',
    minCopies: minCopiesStr = '',
    dateFrom = '',
    dateTo = '',
  } = await searchParams

  const page = Math.max(1, parseInt(pageStr, 10) || 1)
  const isSemantic = sem === '1' && !!q
  const tags = tagsStr ? tagsStr.split(',').filter(Boolean) : []
  const minCopies = parseInt(minCopiesStr, 10) || 0

  const [{ prompts, total }, categories, allTags] = await Promise.all([
    isSemantic
      ? fetchPromptsSemantic(q, cat, tags, minCopies, dateFrom, dateTo)
      : fetchPrompts(q, cat, page, tags, minCopies, dateFrom, dateTo),
    fetchCategories(),
    fetchTags(),
  ])

  const totalPages = isSemantic ? 1 : Math.ceil(total / PAGE_SIZE)
  const hasFilters = tags.length > 0 || minCopies > 0 || dateFrom || dateTo

  return (
    <main className="container">
      <div className="prompts-header">
        <h1>La Promptothèque</h1>
        <p>
          {isSemantic
            ? `${total} résultat${total > 1 ? 's' : ''} sémantique${total > 1 ? 's' : ''} pour « ${q} »`
            : `${total} prompt${total > 1 ? 's' : ''}${cat ? ` dans "${cat}"` : ''}${hasFilters ? ' (filtrés)' : ''}`}
        </p>
        <Suspense>
          <SearchInput />
        </Suspense>
      </div>

      <Suspense>
        <CategoryFilter categories={categories} />
      </Suspense>

      <Suspense>
        <FiltersPanel tags={allTags} />
      </Suspense>

      {prompts.length === 0 ? (
        <div className="prompts-empty">
          <p>Aucun prompt trouvé{q ? ` pour « ${q} »` : ''}{cat ? ` dans "${cat}"` : ''}</p>
        </div>
      ) : (
        <div className="prompts-grid">
          {prompts.map(p => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav className="prompts-pagination">
          {page > 1 && (
            <a className="btn-primary" href={buildPaginationUrl(q, cat, page - 1, tags, minCopies, dateFrom, dateTo)}>
              ← Précédent
            </a>
          )}
          <span>{page} / {totalPages}</span>
          {page < totalPages && (
            <a className="btn-primary" href={buildPaginationUrl(q, cat, page + 1, tags, minCopies, dateFrom, dateTo)}>
              Suivant →
            </a>
          )}
        </nav>
      )}
    </main>
  )
}
