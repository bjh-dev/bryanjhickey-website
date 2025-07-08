import { PostListSection } from '@/components/sections/types'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { PostFeaturedCard } from '@/components/modules/PostFeaturedCard'
import { PostCard } from '@/components/modules/PostCard'

export default function PostList({ section }: { section: PostListSection }) {
  const featuredPost = section.posts
    .slice() // shallow copy to avoid mutating original
    .reverse() // reverse to get latest first
    .find((post) => post.isFeatured)

  const isShowMore = section.numberOfPosts
    ? section.posts.length > section.numberOfPosts + 1 &&
      (section.numberOfPosts ?? 6)
    : false

  return (
    <section className="py-12">
      <div className="content feature">
        <div className="max-w-xl">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-primary font-medium tracking-wider uppercase">
                {section.title}
              </h2>
              <h3 className="font-serif text-4xl">{section.subtitle}</h3>
            </div>
            <div>
              <p className="text-foreground/60 font-serif">
                {section.description}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 py-8">
          {featuredPost && (
            <PostFeaturedCard {...featuredPost} key={featuredPost._id} />
          )}
        </div>
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </section>
  )
}
