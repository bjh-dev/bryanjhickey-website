import ReadTime from '@/components/modules/ReadTime'
import { PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'
import { formatDate } from '@/utils/strings'
import { Card, CardContent } from '@/components/ui/card'
import { getDocumentLink } from '@/lib/links'
import { urlForImage } from '@/lib/sanity/client/image'
import Image from 'next/image'
import Link from 'next/link'
import { FaCross, FaDivide } from 'react-icons/fa6'

export function PostFeaturedCard(featuredPost: PostCardFragmentType) {
  return (
    <Link
      className="group col-span-1 items-stretch rounded-xl border border-transparent"
      href={getDocumentLink({
        slug: featuredPost.slug,
        _type: 'post',
      })}
    >
      <Card className="group hover:bg-foreground/5 h-full rounded-none rounded-b-xl border-none bg-transparent p-0 shadow-none transition-all duration-300 ease-linear">
        <CardContent className="flex flex-col p-0">
          <div className="relative h-72 overflow-hidden rounded-t-xl md:h-64 lg:h-72">
            <Image
              src={
                featuredPost.image ? urlForImage(featuredPost.image).url() : ''
              }
              alt={featuredPost.title}
              fill
              priority
              sizes="100vw"
              className="h-full w-full overflow-hidden object-cover transition-transform duration-300 ease-linear group-hover:scale-120"
            />
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-center gap-4 text-sm">
              {featuredPost.date ? (
                <div className="flex">
                  <time className="text-foreground/50">
                    {formatDate('short', featuredPost.date)}
                  </time>
                </div>
              ) : null}
              <div className="flex">
                <ReadTime wordCount={featuredPost.wordCount} />
              </div>
            </div>
            <h3 className="group-hover:text-primary border-primary border-b pb-6 font-serif text-3xl font-medium transition-all duration-300 md:line-clamp-2 md:text-2xl lg:text-4xl">
              {featuredPost.title}
            </h3>
            {featuredPost.subtitle && (
              <p className="text-foreground font-serif text-2xl font-normal md:line-clamp-2 md:text-lg lg:text-xl">
                {featuredPost.subtitle}
              </p>
            )}
            <p className="text-foreground/60 group-hover:text-foreground font-serif text-sm leading-relaxed transition-all duration-300 md:line-clamp-3 lg:text-base">
              {featuredPost.excerpt}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
