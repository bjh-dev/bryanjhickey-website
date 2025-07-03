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
      className="group col-span-1 items-stretch rounded-xl md:col-span-2 lg:col-span-4"
      href={getDocumentLink({
        slug: featuredPost.slug,
        _type: 'post',
      })}
    >
      <Card className="group-hover:bg-accent/60 bg-accent/30 group-hover:border-primary border-border h-full border-2 p-0 shadow-none transition-all">
        <CardContent className="flex flex-col p-0 lg:grid lg:grid-cols-3">
          <div className="relative col-span-1 h-[20svh] lg:h-auto">
            <Image
              src={
                featuredPost.image ? urlForImage(featuredPost.image).url() : ''
              }
              alt={featuredPost.title}
              fill
              priority
              sizes="100vw"
              className="h-full w-full rounded-t-xl object-cover lg:rounded-t-none lg:rounded-l-xl"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-4 p-6 lg:p-10">
            {featuredPost.isFeatured && (
              <div className="text-primary text-xs font-bold uppercase">
                Featured Post
              </div>
            )}
            <h3 className="font-serif text-xl font-bold lg:text-2xl">
              {featuredPost.title}
            </h3>
            <p className="text-foreground/60 font-serif lg:text-lg">
              {featuredPost.excerpt}
            </p>
            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
              {featuredPost.date ? (
                <div className="flex">
                  <time className="text-xs text-gray-500">
                    {new Date(featuredPost.date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              ) : null}
              <div className="hidden md:flex">
                <span className="text-foreground/70 text-xs">&#10013;</span>
              </div>
              <div className="flex">
                <ReadTime wordCount={featuredPost.wordCount} />
              </div>
              {featuredPost?.categories && (
                <div className="flex items-center gap-2">
                  {featuredPost.categories.map((category) => (
                    <span
                      className="border-primary bg-primary rounded-full border px-3 py-0.5 text-xs text-gray-950"
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
