'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition, useRef } from 'react'

export function SearchInput() {
  const router = useRouter()
  const params = useSearchParams()
  const [, startTransition] = useTransition()
  const isSemantic = params.get('sem') === '1'
  const [value, setValue] = useState(params.get('q') ?? '')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navigate = (q: string, sem: boolean) => {
    const next = new URLSearchParams()
    const cat = params.get('cat')
    if (q) next.set('q', q)
    if (cat) next.set('cat', cat)
    if (sem) next.set('sem', '1')
    startTransition(() => router.replace(`/prompts?${next.toString()}`))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    setValue(q)
    if (timerRef.current) clearTimeout(timerRef.current)
    const delay = isSemantic ? 800 : 300
    timerRef.current = setTimeout(() => navigate(q, isSemantic), delay)
  }

  const handleClear = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setValue('')
    navigate('', isSemantic)
  }

  return (
    <div className="search-wrapper">
      <div className="search-input-row">
        <input
          className="search-input"
          type="search"
          placeholder="Rechercher un prompt..."
          value={value}
          onChange={handleChange}
        />
        {value && (
          <button className="search-clear" onClick={handleClear} aria-label="Effacer">
            ×
          </button>
        )}
      </div>
      <div className="search-mode">
        <button
          className={`cat-chip ${!isSemantic ? 'cat-chip--active' : ''}`}
          onClick={() => navigate(value, false)}
        >
          Texte
        </button>
        <button
          className={`cat-chip ${isSemantic ? 'cat-chip--active' : ''}`}
          onClick={() => navigate(value, true)}
        >
          Sémantique ✦
        </button>
      </div>
    </div>
  )
}
