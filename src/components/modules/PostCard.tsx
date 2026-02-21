import ReadTime from '@/components/modules/ReadTime'
import { PostListSection } from '@/components/sections/types'
import { formatDate } from '@/utils/strings'
import { Card, CardContent } from '@/components/ui/card'
import { getDocumentLink } from '@/lib/links'
import { urlForImage } from '@/lib/sanity/client/image'
import Image from 'next/image'
import Link from 'next/link'

export function PostCard({
  post,
  showFeaturedTag = false,
  showImage = false,
}: {
  post: PostListSection['posts'][0]
  showFeaturedTag?: boolean
  showImage?: boolean
}) {
  return (
    <Link
      key={post._id}
      className="rounded-md:col-span-2 col-span-1 items-stretch overflow-hidden"
      href={getDocumentLink({
        slug: post.slug,
        _type: 'post',
      })}
    >
      <Card className="group hover:bg-foreground/2 relative h-full border-none bg-transparent p-6 transition-all duration-300">
        <CardContent className="flex flex-col gap-4 p-0">
          {showImage && (
            <div className="relative hidden h-[20svh] overflow-hidden transition-transform duration-300 ease-linear xl:block">
              {showFeaturedTag && post.isFeatured && (
                <div className="bg-primary absolute top-2 right-2 z-10 rounded px-2 py-1 text-xs font-semibold text-white">
                  Featured
                </div>
              )}
              <Image
                src={post.image ? urlForImage(post.image).url() : ''}
                alt={post.title}
                fill
                priority
                sizes="100vw"
                className="h-full w-full object-cover transition-transform duration-300 ease-linear group-hover:scale-120"
              />
            </div>
          )}

          <div className="col-span-2 flex flex-col gap-4">
            {showImage && (
              <div className="flex items-start gap-2 md:items-center md:gap-4">
                {post.date ? (
                  <div className="flex">
                    <time className="text-foreground/50 text-xs">
                      {formatDate('short', post.date)}
                    </time>
                  </div>
                ) : null}
                <div className="flex items-center">
                  <ReadTime wordCount={post.wordCount} className="text-xs" />
                </div>
              </div>
            )}
            {!showImage && (
              <div className="text-foreground/60 flex items-start gap-4 text-xs md:items-center md:gap-4">
                {post.date ? (
                  <div className="flex items-center">
                    <time>{formatDate('short', post.date)}</time>
                  </div>
                ) : null}
                <div className="flex items-center">
                  <ReadTime wordCount={post.wordCount} />
                </div>
              </div>
            )}
            <h3 className="group-hover:text-primary font-serif text-2xl transition-all duration-300 md:line-clamp-2">
              {post.title}
            </h3>
            {post.subtitle && (
              <p className="text-foreground font-serif text-lg font-normal italic md:line-clamp-2">
                {post.subtitle}
              </p>
            )}
            <p className="text-foreground/60 group-hover:text-foreground font-serif text-sm leading-relaxed transition-all duration-300 md:line-clamp-4 lg:text-base">
              {post.excerpt}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
