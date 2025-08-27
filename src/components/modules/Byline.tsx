import DateComponent from '@/components/ui/Date'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import ReadTime from '@/components/modules/ReadTime'
import { PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'

export default function Byline({ post }: { post: PostCardFragmentType }) {
  return (
    <div>
      <div className="grid grid-cols-2 text-sm">
        <div className="col-span-1">
          {!!post.wordCount && <ReadTime wordCount={post.wordCount} />}
        </div>

        {post.date && (
          <div className="flex items-center justify-end gap-2">
            <div className="text-foreground/50 text-right">
              <DateComponent dateString={post.date} />
            </div>
          </div>
        )}
      </div>

      {post.categories && post.categories?.length > 0 && (
        <div className="flex gap-2 py-6">
          <div className="text-foreground/50 pr-2 text-sm">
            {post.categories?.length > 1 ? 'Categories:' : 'Category:'}
          </div>
          <div className="flex flex-wrap gap-1">
            {post.categories.map((category) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
