'use client'

import { useState } from 'react'
import { getOrCreateSlug } from '@/app/actions/prompts'

export function ShareButton({ promptId }: { promptId: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'copied'>('idle')

  const share = async () => {
    setState('loading')
    const slug = await getOrCreateSlug(promptId)
    const url = `${window.location.origin}/p/${slug}`

    if (navigator.share) {
      await navigator.share({ url })
    } else {
      await navigator.clipboard.writeText(url)
    }

    setState('copied')
    setTimeout(() => setState('idle'), 2000)
  }

  return (
    <button className="share-btn" onClick={share} disabled={state === 'loading'}>
      {state === 'loading' && '…'}
      {state === 'copied' && '✓ Lien copié'}
      {state === 'idle' && 'Partager'}
    </button>
  )
}
