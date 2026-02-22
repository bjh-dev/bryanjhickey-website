'use client'

import { useState, useEffect, useCallback } from 'react'
import { ScripturePassageSection } from '@/components/sections/types'

type EsvPassageResponse = {
  passages?: string[]
  canonical?: string
  error?: string
}

export default function ScripturePassage({
  section,
}: {
  section: ScripturePassageSection
}) {
  const [data, setData] = useState<EsvPassageResponse | null>(null)
  const hasReference = Boolean(section.passageReference)
  const [loading, setLoading] = useState(hasReference)

  const fetchPassage = useCallback(async () => {
    if (!section.passageReference) return

    const params = new URLSearchParams({
      q: section.passageReference,
    })

    if (section.showVerseNumbers === false) {
      params.set('include-verse-numbers', 'false')
    }

    try {
      const res = await fetch(`/api/esv/passage?${params}`)
      const json: EsvPassageResponse = await res.json()
      setData(json)
    } catch {
      setData({ error: 'Failed to load passage.' })
    } finally {
      setLoading(false)
    }
  }, [section.passageReference, section.showVerseNumbers])

  useEffect(() => {
    fetchPassage()
  }, [fetchPassage])

  if (!section.passageReference) return null

  if (loading) {
    return (
      <section className="my-16 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="border-border animate-pulse border-l-4 pl-6">
            <div className="bg-muted h-6 w-48 rounded" />
            <div className="bg-muted mt-4 h-32 rounded" />
          </div>
        </div>
      </section>
    )
  }

  if (!data?.passages?.[0]) return null

  return (
    <section className="my-16 px-4">
      <div className="mx-auto max-w-3xl">
        {section.heading && (
          <p className="text-primary mb-6 text-xs font-semibold tracking-[0.2em] uppercase">
            {section.heading}
          </p>
        )}
        <blockquote className="border-border border-l-4 pl-6">
          <p className="text-foreground font-serif text-xl leading-relaxed whitespace-pre-wrap lg:text-2xl">
            {data.passages[0]}
          </p>
          <footer className="text-muted-foreground mt-4 text-sm font-medium">
            {data.canonical ?? section.passageReference} — ESV
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
