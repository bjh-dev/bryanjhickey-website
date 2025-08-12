import ReadTime from '@/components/modules/ReadTime'
import { PostListSection } from '@/components/sections/types'
import { Card, CardContent } from '@/components/ui/card'
import { getDocumentLink } from '@/lib/links'
import { urlForImage } from '@/lib/sanity/client/image'
import Image from 'next/image'
import Link from 'next/link'

export function PostFeaturedCard(featuredPost: PostListSection['posts'][0]) {
  return (
    <Link
      className="group col-span-1 items-stretch rounded-xl"
      href={getDocumentLink({
        slug: featuredPost.slug,
        _type: 'post',
      })}
    >
      <Card className="group h-full rounded-none border-2 border-none bg-transparent p-0 shadow-none transition-all duration-300 ease-linear">
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="relative h-[20svh] overflow-hidden lg:h-[40svh]">
            <Image
              src={
                featuredPost.image ? urlForImage(featuredPost.image).url() : ''
              }
              alt={featuredPost.title}
              fill
              priority
              sizes="100vw"
              className="h-full w-full object-cover transition-transform duration-300 ease-linear group-hover:scale-120"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2 md:items-center md:gap-4">
              {featuredPost.date ? (
                <div className="flex">
                  <time className="text-foreground/50 text-xs">
                    {new Date(featuredPost.date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              ) : null}
              <div className="hidden md:flex">
                <span className="text-foreground/50 text-xs">&#10013;</span>
              </div>
              <div className="flex">
                <ReadTime wordCount={featuredPost.wordCount} />
              </div>
            </div>
            <h3 className="group-hover:text-primary font-serif text-3xl font-medium transition-all duration-300 md:line-clamp-2 lg:text-4xl">
              {featuredPost.title}
            </h3>
            <p className="text-foreground/80 group-hover:text-foreground font-serif text-sm leading-relaxed transition-all duration-300 md:line-clamp-3 lg:text-base">
              {featuredPost.excerpt}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
