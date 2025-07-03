import DateComponent from '@/components/ui/Date'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import ReadTime from '@/components/modules/ReadTime'
import { PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'

export default function Byline({ post }: { post: PostCardFragmentType }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2 text-xs">
        <h4 className="text-foreground/50 flex">
          <span className="mr-1">By </span>
          {post.author?.firstName && post.author?.lastName && (
            <span>
              {post.author.firstName} {post.author.lastName}
            </span>
          )}
        </h4>
        {post.date && (
          <div className="text-foreground/50">
            <DateComponent dateString={post.date} />
          </div>
        )}
      </div>
      <div className="flex flex-col items-end gap-2">
        {post.categories && post.categories?.length > 0 && (
          <div className="flex items-center gap-2">
            {post.categories.map((category) => (
              <Badge
                variant="default"
                className="hover:bg-primary! transition-all ease-linear hover:scale-110"
                asChild
                key={category._id}
              >
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
