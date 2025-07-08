import DateComponent from '@/components/ui/Date'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import ReadTime from '@/components/modules/ReadTime'
import { FaStar } from 'react-icons/fa6'
import { PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'

export default function Byline({ post }: { post: PostCardFragmentType }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2 text-xs">
        <div className="flex gap-2">
          <div className="flex gap-2">
            {post.author?.firstName && post.author?.lastName && (
              <div className="flex items-center gap-2">
                <h4 className="text-foreground/50">
                  <span>By&nbsp;</span>
                  <span>
                    {post.author.firstName} {post.author.lastName}
                  </span>
                </h4>
                <div className="text-primary">
                  <FaStar />
                </div>
              </div>
            )}
            {post.date && (
              <div className="flex items-center gap-2">
                <div className="text-foreground/50">
                  <DateComponent dateString={post.date} />
                </div>
                <div className="text-primary">
                  <FaStar />
                </div>
              </div>
            )}
            {!!post.wordCount && <ReadTime wordCount={post.wordCount} />}
          </div>
        </div>

        <div className="flex gap-2">
          {post.categories && post.categories?.length > 0 && (
            <div className="flex items-center gap-2 py-6">
              <span className="text-foreground/50 pr-2">
                {post.categories?.length > 1 ? 'Categories:' : 'Category:'}
              </span>
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
          )}
        </div>
      </div>
    </div>
  )
}
