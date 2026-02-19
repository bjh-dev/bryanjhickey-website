import { homePageQuery } from '@/lib/sanity/queries/queries'
import { sanityFetch } from '@/lib/sanity/client/live'
import { formatMetaData } from '@/lib/sanity/client/seo'
import PageSections from '@/components/sections/PageSections'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
  const { data: home } = await sanityFetch({
    query: homePageQuery,
  })

  if (!home?.seo) {
    return {}
  }

  return formatMetaData(home.seo, home?.name || '')
}

export default async function Page() {
  const { data: home } = await sanityFetch({
    query: homePageQuery,
  })

  if (!home) {
    notFound()
  }

  const { _id, _type, pageSections } = home

  return (
    <PageSections
      documentId={_id}
      documentType={_type}
      sections={pageSections}
    />
  )
}
