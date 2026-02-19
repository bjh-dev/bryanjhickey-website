import { PostListSection } from '@/components/sections/types'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { PostFeaturedCard } from '@/components/modules/PostFeaturedCard'
import { PostCard } from '@/components/modules/PostCard'

type PostType = NonNullable<PostListSection['posts']>[number]

export default function PostList({ section }: { section: PostListSection }) {
  const featuredPosts = section.posts
    .slice() // shallow copy to avoid mutating original
    .filter((post) => post.isFeatured)
    .slice(0, 2)

  const isShowMore = section.posts.length > (section.numberOfPosts ?? 6)

  return (
    <section className="py-12">
      <div className="content feature">
        {featuredPosts && (
          <section className="pt-12 pb-6">
            <div>
              <h4 className="text-foreground border-foreground/60 my-8 mb-8 border-b pb-8 text-3xl font-bold tracking-wider uppercase">
                {section.title || 'Featured Posts'}
              </h4>
              {section.subtitle && (
                <p className="text-muted-foreground -mt-4 mb-8 text-lg">
                  {section.subtitle}
                </p>
              )}

              <div className="grid items-stretch gap-20 md:grid-cols-2 lg:gap-12">
                {featuredPosts.map((featuredPost: PostType) => (
                  <PostFeaturedCard {...featuredPost} key={featuredPost._id} />
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="pt-6 pb-12">
          <h4 className="text-foreground border-foreground/60 my-8 mb-8 border-b pb-8 text-3xl font-bold tracking-wider uppercase">
            {section.recentTitle || 'Recent Posts'}
          </h4>
          {section.recentSubtitle && (
            <p className="text-muted-foreground -mt-4 mb-8 text-lg">
              {section.recentSubtitle}
            </p>
          )}
          <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-2 lg:gap-12 xl:grid-cols-3">
            {section.posts
              .filter((post) => !post.isFeatured) // Exclude posts with isFeatured === true
              .slice(0, 8) // Limit the array to the numberOfPosts
              .map((post) => {
                return <PostCard key={post._id} post={post} />
              })}
          </div>
          {isShowMore && (
            <div className="flex w-full justify-end py-12">
              <Button asChild variant="link">
                <Link
                  className="text-primary hover:text-foreground flex items-center gap-4"
                  href="/posts"
                >
                  More Posts
                  <FaArrowRight />
                </Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </section>
  )
}
