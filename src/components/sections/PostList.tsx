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

  const isShowMore = section.numberOfPosts
    ? section.posts.length > section.numberOfPosts + 1 &&
      (section.numberOfPosts ?? 6)
    : false

  return (
    <section className="py-12">
      <div className="content feature">
        {featuredPosts && (
          <section className="popout pt-12 pb-6">
            <div>
              <h4 className="text-foreground my-12 text-3xl font-bold tracking-wider uppercase lg:my-8">
                Featured Posts
              </h4>

              <div className="grid items-stretch gap-20 md:grid-cols-2 lg:gap-12">
                {featuredPosts.map((featuredPost: PostType) => (
                  <PostFeaturedCard {...featuredPost} key={featuredPost._id} />
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="pt-6 pb-12">
          <h4 className="text-foreground my-8 text-3xl font-bold tracking-wider uppercase">
            Recent Posts
          </h4>
          <div className="grid grid-cols-1 items-stretch gap-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {section.posts
              .filter((post) => !post.isFeatured) // Exclude posts with isFeatured === true
              .slice(0, 6) // Limit the array to the numberOfPosts
              .map((post) => {
                return <PostCard key={post._id} post={post} />
              })}
          </div>
          {isShowMore && (
            <div className="flex w-full justify-end py-12">
              <Button asChild variant="link">
                <Link
                  className="text-primary flex items-center gap-4"
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
