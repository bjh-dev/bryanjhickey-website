import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/client/live'
import { bookReviewQuery, bookReviewSlugs } from '@/lib/sanity/queries/queries'
import { Metadata } from 'next'
import { client } from '@/lib/sanity/client/client'
import { BookReviewQueryResult } from '@/types/sanity.types'
import BookReview from '@/components/templates/BookReview'
import { formatMetaData } from '@/lib/sanity/client/seo'

type Props = {
  params: Promise<{ slug: string }>
}

const loadData = async (props: Props): Promise<BookReviewQueryResult> => {
  const { slug } = await props.params

  const { data: bookReview } = await sanityFetch({
    query: bookReviewQuery,
    params: { slug },
  })

  return bookReview
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const routeData = await loadData(props)

  if (!routeData?.seo) {
    return {}
  }

  return formatMetaData(routeData.seo, routeData?.title || '')
}

export async function generateStaticParams() {
  const slugs = await client.fetch(bookReviewSlugs, {
    limit: 50,
  })

  const staticParams = slugs
    ? slugs.filter((slug) => slug !== null).map((slug) => ({ slug: slug }))
    : []

  return [...staticParams]
}

export default async function BookReviewPage(props: Props) {
  const bookReview = await loadData(props)

  if (!bookReview) {
    notFound()
  }

  return <BookReview bookReview={bookReview} />
}
