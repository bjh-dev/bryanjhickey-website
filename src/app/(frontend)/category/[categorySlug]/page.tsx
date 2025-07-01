import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/client/live'
import {
  categoryQuery,
  categorySlugs,
  postsArchiveQuery,
} from '@/lib/sanity/queries/queries'
import { paginatedData } from '@/lib/pagination'
import { POSTS_PER_PAGE } from '@/lib/constants'
import { Metadata } from 'next'
import { client } from '@/lib/sanity/client/client'
import { getDocumentLink } from '@/lib/links'
import PostRiver from '@/components/templates/PostRiver'

type Props = {
  params: Promise<{ categorySlug: string }>
}

const loadData = async (props: Props) => {
  const { categorySlug } = await props.params

  const from = 0
  const to = POSTS_PER_PAGE - 1

  const [{ data: archiveData }, { data: categoryData }] = await Promise.all([
    sanityFetch({
      query: postsArchiveQuery,
      params: { from, to, filters: { categorySlug } },
    }),
    sanityFetch({
      query: categoryQuery,
      params: { slug: categorySlug },
    }),
  ])

  return {
    category: categoryData,
    posts: paginatedData(archiveData, 0, POSTS_PER_PAGE),
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { category } = (await loadData(props)) || {}

  if (!category) {
    return notFound()
  }

  return {
    title: `Category ${category.title}`,
    alternates: {
      canonical: getDocumentLink(category, true),
    },
  }
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const slugs = await client.fetch(categorySlugs, {
    limit: 20,
  })

  return slugs
    ? slugs
        .filter((slug) => slug !== null)
        .map((slug) => ({ categorySlug: slug, pagination: undefined }))
    : []
}

export default async function PostPage(props: Props) {
  const { posts, category } = (await loadData(props)) || {}

  if (!category) {
    notFound()
  }

  return (
    <section className="py-24">
      <div className="content feature">
        <div className="py-16">
          <h1 className="text-4xl font-bold">{category.title}</h1>
        </div>
        <div className="pb-8">
          <PostRiver
            listingData={posts.data}
            currentPage={posts.currentPage}
            totalPages={posts.totalPages}
            paginationBase={`/category/${category.slug}`}
          />
        </div>
      </div>
    </section>
  )
}
