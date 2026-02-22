'use client'

import { useState, useEffect, useCallback, ReactNode } from 'react'
import { PortableTextBlock } from 'next-sanity'
import CustomPortableText from '@/components/modules/PortableText'
import { BibleQuoteOfTheDaySection } from '@/components/sections/types'
import { getDailyVerse } from '@/utils/dailyVerses'

type EsvPassageResponse = {
  passages?: string[]
  canonical?: string
  error?: string
}

function cleanPassageText(text: string, canonical?: string): string {
  let cleaned = text
  if (canonical) {
    const escaped = canonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    cleaned = cleaned.replace(new RegExp(`^\\s*${escaped}\\s*`), '')
  }
  cleaned = cleaned.replace(/\s*\(ESV\)\s*$/, '')
  return cleaned.trim()
}

function formatVerseNumbers(text: string): ReactNode[] {
  const parts = text.split(/(\[\d+\])/)
  return parts.map((part, i) => {
    const match = part.match(/^\[(\d+)\]$/)
    if (match) {
      return (
        <sup key={i} className="text-muted-foreground font-sans text-[0.6em]">
          {match[1]}
        </sup>
      )
    }
    return part
  })
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
    const params = new URLSearchParams({
      q: reference,
      'indent-poetry': 'true',
      'indent-paragraphs': '2',
      'include-selahs': 'true',
    })

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
    <section className="bg-foreground/10 py-24">
      <div className="content">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="max-w-3xl">
            {section.eyebrow && (
              <p className="text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
                {section.eyebrow}
              </p>
            )}

            <h2 className="text-foreground mb-6 font-serif text-xl font-bold tracking-tight lg:text-2xl">
              {section.title}
            </h2>

            {section.content && (
              <div className="mb-8">
                <CustomPortableText
                  value={section.content as PortableTextBlock[]}
                  paragraphStyles="text-muted-foreground leading-relaxed"
                />
              </div>
            )}
          </div>
          <div>
            <blockquote className="border-primary border-l pl-6">
              <p className="text-foreground font-serif text-lg leading-relaxed whitespace-pre-wrap">
                {formatVerseNumbers(
                  cleanPassageText(data.passages[0], data.canonical),
                )}
              </p>
              <footer className="text-muted-foreground mt-4 text-sm font-medium">
                <a
                  href={`https://www.esv.org/${encodeURIComponent(data.canonical ?? '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground underline decoration-1 underline-offset-2"
                >
                  {data.canonical}
                </a>{' '}
                — ESV
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
