import { sanityFetch } from '@/lib/sanity/client/live'
import { allBookReviewsQuery } from '@/lib/sanity/queries/queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import ReadTime from '@/components/modules/ReadTime'

const CARD_COLORS = [
  'bg-amber-50 dark:bg-amber-950/40',
  'bg-orange-50 dark:bg-orange-950/40',
  'bg-stone-100 dark:bg-stone-900/50',
  'bg-rose-50 dark:bg-rose-950/40',
] as const

export default async function BookReviewsPage() {
  const { data: reviews } = await sanityFetch({
    query: allBookReviewsQuery,
  })

  if (!reviews) {
    notFound()
  }

  return (
    <section className="py-24">
      <div className="content">
        <div className="py-16">
          <h1 className="text-4xl font-bold">Book Reviews</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
            Critical reviews and reflections on books covering theology,
            philosophy, and biblical studies.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => {
            const colorClass = CARD_COLORS[index % CARD_COLORS.length]

            return (
              <Link
                key={review._id}
                href={`/book-reviews/${review.slug}`}
                className={`${colorClass} group flex flex-col rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
              >
                <p className="text-muted-foreground text-xs font-semibold tracking-[0.15em] uppercase">
                  Book Review
                </p>

                <h3 className="text-foreground mt-3 text-lg leading-snug font-bold">
                  {review.bookTitle}
                </h3>

                {review.bookAuthor && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    by {review.bookAuthor}
                  </p>
                )}

                <hr className="border-border/60 my-4" />

                {review.excerpt && (
                  <p className="text-muted-foreground line-clamp-3 flex-1 text-sm leading-relaxed">
                    {review.excerpt}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-3 text-xs">
                  {review.date && (
                    <time className="text-muted-foreground">
                      {format(parseISO(review.date), 'MMMM d, yyyy')}
                    </time>
                  )}
                  {!!review.wordCount && (
                    <ReadTime
                      wordCount={review.wordCount}
                      className="text-xs"
                    />
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
