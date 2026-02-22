'use client'

import { useState, useEffect, useCallback } from 'react'
import { PortableTextBlock } from 'next-sanity'
import CustomPortableText from '@/components/modules/PortableText'
import { BibleQuoteOfTheDaySection } from '@/components/sections/types'
import { getDailyVerse } from '@/utils/dailyVerses'

type EsvPassageResponse = {
  passages?: string[]
  canonical?: string
  error?: string
}

export default function BibleQuoteOfTheDay({
  section,
}: {
  section: BibleQuoteOfTheDaySection
}) {
  const [data, setData] = useState<EsvPassageResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchPassage = useCallback(async () => {
    const reference = getDailyVerse()
    const params = new URLSearchParams({ q: reference })

    try {
      const res = await fetch(`/api/esv/passage?${params}`)
      const json: EsvPassageResponse = await res.json()
      setData(json)
    } catch {
      setData({ error: 'Failed to load passage.' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPassage()
  }, [fetchPassage])

  if (loading) {
    return (
      <section className="my-16 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="border-border animate-pulse border-l-4 pl-6">
            <div className="bg-muted h-4 w-24 rounded" />
            <div className="bg-muted mt-3 h-8 w-64 rounded" />
            <div className="bg-muted mt-6 h-32 rounded" />
          </div>
        </div>
      </section>
    )
  }

  if (!data?.passages?.[0]) return null

  return (
    <section className="my-16 px-4">
      <div className="mx-auto max-w-3xl">
        {section.eyebrow && (
          <p className="text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
            {section.eyebrow}
          </p>
        )}

        <h2 className="text-foreground mb-6 font-serif text-3xl font-bold tracking-tight lg:text-4xl">
          {section.title}
        </h2>

        {section.content && (
          <div className="mb-8">
            <CustomPortableText
              value={section.content as PortableTextBlock[]}
              paragraphStyles="text-muted-foreground text-base leading-relaxed"
            />
          </div>
        )}

        <blockquote className="border-border border-l-4 pl-6">
          <p className="text-foreground font-serif text-xl leading-relaxed whitespace-pre-wrap lg:text-2xl">
            {data.passages[0]}
          </p>
          <footer className="text-muted-foreground mt-4 text-sm font-medium">
            {data.canonical} — ESV
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
