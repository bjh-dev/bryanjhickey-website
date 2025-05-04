import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/client/live'
import {
  personQuery,
  personSlugs,
  postsArchiveQuery,
} from '@/lib/sanity/queries/queries'
import { Metadata } from 'next'
import { client } from '@/lib/sanity/client/client'
import { getDocumentLink } from '@/lib/links'
import PostRiver from '@/components/templates/PostRiver'
import { paginatedData } from '@/lib/pagination'
import PersonArchiveByline from '@/components/templates/PersonArchiveByline'
import Page from '@/components/templates/Page'

type Props = {
  params: Promise<{ personSlug: string }>
}

const loadData = async (props: Props) => {
  const { personSlug } = await props.params

  const from = 0
  const to = 50 - 1

  const [{ data: archiveData }, { data: personData }] = await Promise.all([
    sanityFetch({
      query: postsArchiveQuery,
      params: { from, to, filters: { personSlug } },
    }),
    sanityFetch({
      query: personQuery,
      params: { slug: personSlug },
    }),
  ])

  return {
    person: personData,
    posts: paginatedData(archiveData, 0, 50),
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { person } = (await loadData(props)) || {}

  if (!person) {
    return notFound()
  }

  return {
    title: `Author ${person.firstName} ${person.lastName}`,
    alternates: {
      canonical: getDocumentLink(person, true),
    },
  }
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const slugs = await client.fetch(personSlugs, {
    limit: 50,
  })

  return slugs
    ? slugs
        .filter((slug) => slug !== null)
        .map((slug) => ({ personSlug: slug, pagination: undefined }))
    : []
}

export default async function PostPage(props: Props) {
  const { posts, person } = (await loadData(props)) || {}

  if (!person) {
    notFound()
  }

  return (
    <Page>
      <PersonArchiveByline person={person} />
      <PostRiver
        listingData={posts.data}
        currentPage={posts.currentPage}
        totalPages={posts.totalPages}
        paginationBase={`/author/${person.slug}`}
      />
    </Page>
  )
}
