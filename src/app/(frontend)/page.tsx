import { homePageQuery } from '@/lib/sanity/queries/queries'
import { sanityFetch } from '@/lib/sanity/client/live'
import { formatMetaData } from '@/lib/sanity/client/seo'
import PageSections from '@/components/sections/PageSections'
import { notFound } from 'next/navigation'
import { SeoType } from '@/types/seo'

export async function generateMetadata() {
  const { data: home } = await sanityFetch({
    query: homePageQuery,
  })

  if (!home?.seo) {
    return {}
  }

  return formatMetaData(home.seo as unknown as SeoType, home?.name || '')
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
