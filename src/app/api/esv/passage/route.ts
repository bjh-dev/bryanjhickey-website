import { NextRequest, NextResponse } from 'next/server'
import { esvApiKey } from '@/studio/env'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')

  if (!q) {
    return NextResponse.json(
      { error: 'q parameter is required' },
      { status: 400 },
    )
  }

  if (!esvApiKey) {
    return NextResponse.json(
      { error: 'ESV API key is not configured' },
      { status: 503 },
    )
  }

  const includeVerseNumbers =
    request.nextUrl.searchParams.get('include-verse-numbers') ?? 'true'

  const params = new URLSearchParams({
    q,
    'include-passage-references': 'true',
    'include-verse-numbers': includeVerseNumbers,
    'include-footnotes': 'false',
    'include-headings': 'false',
    'include-short-copyright': 'true',
    'indent-paragraphs': '0',
    'indent-poetry': 'false',
  })

  const response = await fetch(
    `https://api.esv.org/v3/passage/text/?${params}`,
    {
      headers: { Authorization: `Token ${esvApiKey}` },
      next: { revalidate: 86400 },
    },
  )

  if (!response.ok) {
    return NextResponse.json(
      { error: 'ESV API error' },
      { status: response.status },
    )
  }

  const data = await response.json()

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
