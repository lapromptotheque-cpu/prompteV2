'use client'

import { useState } from 'react'
import { incrementCopyCount } from '@/app/actions/prompts'

type Props = {
  text: string
  promptId?: string
  initialCount?: number
}

export function CopyButton({ text, promptId, initialCount = 0 }: Props) {
  const [copied, setCopied] = useState(false)
  const [count, setCount] = useState(initialCount)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    if (promptId) {
      setCount(c => c + 1)
      incrementCopyCount(promptId)
    }
  }

  return (
    <div className="copy-btn-wrapper">
      <button className={`copy-btn ${copied ? 'copy-btn--copied' : ''}`} onClick={copy}>
        {copied ? '✓ Copié' : 'Copier'}
      </button>
      {promptId && count > 0 && (
        <span className="copy-count">{count} copie{count > 1 ? 's' : ''}</span>
      )}
    </div>
  )
}
