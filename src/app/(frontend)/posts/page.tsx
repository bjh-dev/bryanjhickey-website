import { PostCard } from '@/components/modules/PostCard'
import { PostFeaturedCard } from '@/components/modules/PostFeaturedCard'
import { sanityFetch } from '@/lib/sanity/client/live'
import { allPostsQuery } from '@/lib/sanity/queries/queries'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function PostsPage() {
  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
  })

  if (!posts) {
    notFound()
  }
  const featuredPosts = posts
    .slice() // shallow copy to avoid mutating original
    .filter((post) => post.isFeatured)
    .slice(0, 2) // Limit to 2 featured posts

  return (
    <section className="py-24">
      <div className="content feature">
        <div className="py-16">
          <h1 className="text-4xl font-bold">Posts</h1>
        </div>
        {featuredPosts && (
          <section className="pt-12 pb-6">
            <div>
              <h4 className="text-foreground my-8 text-3xl font-bold tracking-wider uppercase">
                Recent Featured Posts
              </h4>

              <div className="grid grid-cols-2 place-content-around items-stretch gap-12 md:grid-cols-2">
                {featuredPosts.map((featuredPost) => (
                  <PostFeaturedCard {...featuredPost} key={featuredPost._id} />
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="popout pt-6 pb-12">
          <h4 className="text-foreground my-8 text-3xl font-bold tracking-wider uppercase">
            Recent Posts
          </h4>
          <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-2 lg:grid-cols-3">
            {posts // Exclude posts with isFeatured === true
              .map((post) => {
                return <PostCard key={post._id} post={post} showFeaturedTag />
              })}
          </div>
        </section>
      </div>
    </section>
  )
}
