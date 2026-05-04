'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'

type Props = { tags: string[] }

export function FiltersPanel({ tags }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const activeTags = (params.get('tags') ?? '').split(',').filter(Boolean)
  const minCopies = params.get('minCopies') ?? ''
  const dateFrom = params.get('dateFrom') ?? ''
  const dateTo = params.get('dateTo') ?? ''
  const activeCount = activeTags.length + (minCopies ? 1 : 0) + (dateFrom || dateTo ? 1 : 0)

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString())
    if (value) next.set(key, value)
    else next.delete(key)
    next.delete('page')
    startTransition(() => router.replace(`/prompts?${next.toString()}`))
  }

  const toggleTag = (tag: string) => {
    const next = activeTags.includes(tag)
      ? activeTags.filter(t => t !== tag)
      : [...activeTags, tag]
    update('tags', next.join(','))
  }

  const clearAll = () => {
    const next = new URLSearchParams(params.toString())
    ;['tags', 'minCopies', 'dateFrom', 'dateTo', 'page'].forEach(k => next.delete(k))
    startTransition(() => router.replace(`/prompts?${next.toString()}`))
  }

  return (
    <div className="filters-panel">
      <div className="filters-toggle-row">
        <button className="filters-toggle" onClick={() => setOpen(o => !o)}>
          Filtres {activeCount > 0 && <span className="filters-badge">{activeCount}</span>}
          <span className="filters-arrow">{open ? '▲' : '▼'}</span>
        </button>
        {activeCount > 0 && (
          <button className="filters-clear-all" onClick={clearAll}>
            Tout effacer
          </button>
        )}
      </div>

      {open && (
        <div className="filters-content">
          {tags.length > 0 && (
            <div className="filter-group">
              <span className="detail-label">Tags</span>
              <div className="cat-filter" style={{ marginBottom: 0 }}>
                {tags.map(tag => (
                  <button
                    key={tag}
                    className={`cat-chip ${activeTags.includes(tag) ? 'cat-chip--active' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="filter-group">
            <span className="detail-label">Copies minimum</span>
            <input
              type="number"
              className="filter-number"
              min={0}
              value={minCopies}
              placeholder="0"
              onChange={e => update('minCopies', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <span className="detail-label">Date de création</span>
            <div className="filter-dates">
              <input
                type="date"
                className="filter-date"
                value={dateFrom}
                onChange={e => update('dateFrom', e.target.value)}
              />
              <span className="filter-date-sep">→</span>
              <input
                type="date"
                className="filter-date"
                value={dateTo}
                onChange={e => update('dateTo', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
