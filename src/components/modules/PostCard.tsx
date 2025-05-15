import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Image } from 'next-sanity/image'
import { ArrowRight } from 'lucide-react'
import ReadTime from '@/components/modules/ReadTime'
import { PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'
import { getDocumentLink } from '@/lib/links'
import { urlForImage } from '@/lib/sanity/client/image'

export default function PostCard({ post }: { post: PostCardFragmentType }) {
  const { title, excerpt, date, author, image, categories } = post

  const featuredCategory = categories?.[0]

  return (
    <article className="relative h-full overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative h-64 md:h-full">
          {image ? (
            <Image
              src={urlForImage(image)?.width(1000).height(667).url()}
              alt={image?.alt ?? 'Blog Post Image'}
              style={{
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              width={1000}
              height={667}
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <div className="mb-2 flex items-center space-x-4">
            {featuredCategory && (
              <Badge variant="default" asChild>
                <Link href={getDocumentLink(featuredCategory)}>
                  {featuredCategory.title}
                </Link>
              </Badge>
            )}
            <ReadTime wordCount={post.wordCount} />
          </div>
          {date ? (
            <time className="mb-4 text-sm text-gray-500">
              {new Date(date).toLocaleDateString()}
            </time>
          ) : null}
          <h3 className="mb- text-2xl font-bold">
            <Link
              href={`/blog/${post.slug}`}
              className="transition-colors hover:text-pink-600"
            >
              {title}
            </Link>
          </h3>
          {excerpt ? (
            <p className="text-foreground/60 mb-4">{excerpt}</p>
          ) : null}
          <div className="mb-4">
            {author ? (
              <span className="text-sm font-medium text-gray-700">
                By {author?.firstName} {author?.lastName}
              </span>
            ) : null}
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center font-medium text-pink-600 transition-colors hover:text-pink-700"
          >
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
