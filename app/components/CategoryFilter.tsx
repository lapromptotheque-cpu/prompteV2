'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

type Props = { categories: string[] }

export function CategoryFilter({ categories }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [, startTransition] = useTransition()
  const active = params.get('cat') ?? ''

  const select = (cat: string) => {
    const next = new URLSearchParams(params.toString())
    if (active === cat) {
      next.delete('cat')
    } else {
      next.set('cat', cat)
      next.delete('page')
    }
    startTransition(() => router.replace(`/prompts?${next.toString()}`))
  }

  return (
    <div className="cat-filter">
      {categories.map(cat => (
        <button
          key={cat}
          className={`cat-chip ${active === cat ? 'cat-chip--active' : ''}`}
          onClick={() => select(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
