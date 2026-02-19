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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.bryanjhickey.com/#website',
      url: 'https://www.bryanjhickey.com/',
      name: 'Bryan J. Hickey',
      description:
        'Long-form essays on theology, Scripture, culture, and the Christian life.',
      publisher: {
        '@id': 'https://www.bryanjhickey.com/#person',
      },
      inLanguage: 'en-AU',
    },
    {
      '@type': 'Person',
      '@id': 'https://www.bryanjhickey.com/#person',
      name: 'Bryan J. Hickey',
      url: 'https://www.bryanjhickey.com/',
      description:
        'Writer and theologian based in Melbourne, Australia. Writes on theology, Christian formation, and the intersection of faith and culture.',
      jobTitle: 'Operations',
      worksFor: {
        '@type': 'Organization',
        name: 'Youth Ministry Futures',
        url: 'https://www.ymfutures.com.au/',
      },
      sameAs: [
        'https://www.facebook.com/bryanjhickey',
        'https://www.linkedin.com/in/bryanjhickey',
        'https://x.com/bryanjhickey',
      ],
      knowsAbout: [
        'Theology',
        'Hermeneutics',
        'Christian Formation',
        'Old Testament Studies',
        'Book Reviews',
      ],
    },
  ],
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageSections
        documentId={_id}
        documentType={_type}
        sections={pageSections}
      />
    </>
  )
}
