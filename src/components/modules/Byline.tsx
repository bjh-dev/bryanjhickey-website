import { Image } from 'next-sanity/image'

import DateComponent from '@/components/ui/Date'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import ReadTime from '@/components/modules/ReadTime'
import { PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'
import { urlForImage } from '@/lib/sanity/client/image'

export default function Byline({ post }: { post: PostCardFragmentType }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {post.author?.image?.asset?._ref ? (
          <div className="mr-4 h-20 w-20">
            <Image
              alt={post.author?.image?.alt || ''}
              className="h-full rounded-full object-cover"
              height={80}
              width={80}
              src={urlForImage(post.author?.image)
                ?.height(96)
                .width(96)
                .fit('crop')
                .url()}
            />
          </div>
        ) : (
          <div className="mr-1">By </div>
        )}
        <div className="flex flex-col">
          {post.author?.firstName && post.author?.lastName && (
            <div>
              {post.author.firstName} {post.author.lastName}
            </div>
          )}
          <div className="text-sm text-gray-500">
            <DateComponent dateString={post.date} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        {post.categories && post.categories?.length > 0 && (
          <div className="flex items-center gap-2">
            {post.categories.map((category) => (
              <Badge variant="default" asChild key={category._id}>
                <Link href={`/category/${category.slug}`}>
                  {category.title}
                </Link>
              </Badge>
            ))}
          </div>
        )}
        <ReadTime wordCount={post.wordCount} />
      </div>
    </div>
  )
}
