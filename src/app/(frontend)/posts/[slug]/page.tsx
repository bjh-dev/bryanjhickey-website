import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/client/live'
import { postPagesSlugs, postQuery } from '@/lib/sanity/queries/queries'
import { Metadata } from 'next'
import { client } from '@/lib/sanity/client/client'
import { PostQueryResult } from '@/types/sanity.types'
import Post from '@/components/templates/Post'
import { formatMetaData } from '@/lib/sanity/client/seo'

type Props = {
  params: Promise<{ slug: string }>
}

const loadData = async (props: Props): Promise<PostQueryResult> => {
  const { slug } = await props.params

  const { data: post } = await sanityFetch({
    query: postQuery,
    params: { slug },
  })

  return post
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const routeData = await loadData(props)

  if (!routeData?.seo) {
    return {}
  }

  return formatMetaData(routeData.seo, routeData?.title || '')
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const slugs = await client.fetch(postPagesSlugs, {
    limit: 50,
  })

  const staticParams = slugs
    ? slugs.filter((slug) => slug !== null).map((slug) => ({ slug: slug }))
    : []

  return [...staticParams]
}

export default async function PostPage(props: Props) {
  const post = await loadData(props)

  if (!post) {
    notFound()
  }

  return <Post post={post} />
}
