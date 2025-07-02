import ReadTime from '@/components/modules/ReadTime'
import { PostListSection } from '@/components/sections/types'
import { Card, CardContent } from '@/components/ui/card'
import { getDocumentLink } from '@/lib/links'
import Link from 'next/link'

export function PostCard({ post }: { post: PostListSection['posts'][0] }) {
  return (
    <Link
      key={post._id}
      className="group border-border hover:border-primary col-span-1 items-stretch overflow-hidden rounded-xl border-2 md:col-span-2"
      href={getDocumentLink({
        slug: post.slug,
        _type: 'post',
      })}
    >
      <Card className="group-hover:bg-accent bg-accent/30 relative h-full border-none p-0 transition-all">
        <CardContent className="flex flex-col gap-4 p-0">
          <div className="col-span-2 flex flex-col gap-2 p-4 lg:p-6">
            <h3 className="font-serif text-lg lg:font-bold">{post.title}</h3>
            <p className="text-foreground/60 line-clamp-4 font-serif text-sm leading-relaxed lg:text-base">
              {post.excerpt}
            </p>
            <div className="mt-2 flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
              {post.date ? (
                <div className="flex">
                  <time className="text-xs text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              ) : null}
              <div className="hidden md:flex md:items-center">
                <div className="text-sm text-gray-500">&#10013;</div>
              </div>
              <div className="flex items-center">
                <ReadTime wordCount={post.wordCount} className="text-xs" />
              </div>
              {post?.categories && (
                <div className="flex items-center gap-2">
                  {post.categories.map((category) => (
                    <span
                      className="border-primary rounded-full border px-3 py-0.5 text-xs text-gray-950"
                      key={category._id}
                    >{`#${category.title}`}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
