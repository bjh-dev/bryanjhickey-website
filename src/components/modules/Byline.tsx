import DateComponent from '@/components/ui/Date'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import ReadTime from '@/components/modules/ReadTime'
import { PostQueryResult } from '@/types/sanity.types'

export default function Byline({
  post,
}: {
  post: NonNullable<PostQueryResult>
}) {
  return (
    <div className="grid grid-cols-1 items-start justify-between gap-4 md:grid-cols-2">
      <div className="flex flex-col items-start justify-start gap-2 text-sm">
        <div>{!!post.wordCount && <ReadTime wordCount={post.wordCount} />}</div>

        {post.date && (
          <div className="text-foreground/50 text-right">
            First Published: <DateComponent dateString={post.date} />
          </div>
        )}
        {post._updatedAt && (
          <div className="text-foreground/50 text-right">
            Last Edited: <DateComponent dateString={post._updatedAt} />
          </div>
        )}
      </div>

      {post.categories && post.categories?.length > 0 && (
        <div className="flex gap-2">
          <div className="flex flex-wrap gap-1">
            {post.categories.map(
              (category: {
                _id: string
                _type: 'category'
                title: string | null
                slug: string | null
                description?: string | null
              }) => (
                <Badge
                  variant="default"
                  className="px-3 py-1 text-xs transition-all ease-linear hover:scale-110"
                  asChild
                  key={category._id}
                >
                  <Link href={`/category/${category.slug}`}>
                    {category.title}
                  </Link>
                </Badge>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
