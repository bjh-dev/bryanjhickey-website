'use client'

import { useState, useCallback } from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

type EsvPassageResponse = {
  passages?: string[]
  canonical?: string
  error?: string
}

type ScripturePopoverProps = {
  reference: string
  children: React.ReactNode
}

export default function ScripturePopover({
  reference,
  children,
}: ScripturePopoverProps) {
  const [data, setData] = useState<EsvPassageResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetched, setFetched] = useState(false)

  const fetchPassage = useCallback(async () => {
    if (fetched) return
    setLoading(true)
    setFetched(true)
    try {
      const res = await fetch(
        `/api/esv/passage?q=${encodeURIComponent(reference)}`,
      )
      const json: EsvPassageResponse = await res.json()
      setData(json)
    } catch {
      setData({ error: 'Failed to load passage.' })
    } finally {
      setLoading(false)
    }
  }, [reference, fetched])

  return (
    <HoverCard
      openDelay={200}
      closeDelay={100}
      onOpenChange={(open) => {
        if (open) fetchPassage()
      }}
    >
      <HoverCardTrigger asChild>
        <span
          className="decoration-primary cursor-pointer underline decoration-dotted underline-offset-2"
          tabIndex={0}
          role="button"
          aria-label={`View ESV passage: ${reference}`}
        >
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        className="max-h-64 w-80 overflow-y-auto p-4 text-sm leading-relaxed"
        side="top"
        align="center"
      >
        {loading && (
          <p className="text-muted-foreground animate-pulse">
            Loading passage…
          </p>
        )}
        {!loading && data?.error && (
          <p className="text-destructive text-sm">{data.error}</p>
        )}
        {!loading && data?.passages?.[0] && (
          <div>
            <p className="text-primary mb-2 text-xs font-semibold tracking-wider uppercase">
              {data.canonical ?? reference}
            </p>
            <p className="text-foreground font-serif text-sm leading-relaxed whitespace-pre-wrap">
              {data.passages[0]}
            </p>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}
