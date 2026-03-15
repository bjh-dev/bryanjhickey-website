import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/client/live'
import {
  readingNoteQuery,
  readingNoteSlugs,
} from '@/lib/sanity/queries/queries'
import { Metadata } from 'next'
import { client } from '@/lib/sanity/client/client'
import { ReadingNoteQueryResult } from '@/types/sanity.types'
import ReadingNote from '@/components/templates/ReadingNote'
import { formatMetaData } from '@/lib/sanity/client/seo'

type Props = {
  params: Promise<{ slug: string }>
}

const loadData = async (props: Props): Promise<ReadingNoteQueryResult> => {
  const { slug } = await props.params

  const { data: readingNote } = await sanityFetch({
    query: readingNoteQuery,
    params: { slug },
  })

  return readingNote
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const routeData = await loadData(props)

  if (!routeData?.seo) {
    return {}
  }

  return formatMetaData(routeData.seo, routeData?.title || '')
}

export async function generateStaticParams() {
  const slugs = await client.fetch(readingNoteSlugs, {
    limit: 50,
  })

  const staticParams = slugs
    ? slugs.filter((slug) => slug !== null).map((slug) => ({ slug: slug }))
    : []

  return [...staticParams]
}

export default async function ReadingNotePage(props: Props) {
  const readingNote = await loadData(props)

  if (!readingNote) {
    notFound()
  }

  return <ReadingNote readingNote={readingNote} />
}
