import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { BookReviewsSection } from '@/components/sections/types'

const CARD_COLORS = [
  'bg-amber-50 dark:bg-amber-950/40',
  'bg-orange-50 dark:bg-orange-950/40',
  'bg-stone-100 dark:bg-stone-900/50',
  'bg-rose-50 dark:bg-rose-950/40',
] as const

export default function BookReviews({
  section,
}: {
  section: BookReviewsSection
}) {
  const reviews = section.reviews ?? []
  const displayCount = section.numberOfReviews ?? 3
  const visibleReviews = reviews.slice(0, displayCount)

  return (
    <section>
      <div className="py-12">
        <div className="content">
          <div className="flex items-baseline justify-between">
            <h2 className="text-foreground border-foreground/60 my-8 mb-8 w-full border-b pb-8 text-5xl font-bold tracking-wider uppercase">
              {section.heading}
            </h2>
          </div>

          {section.subtitle && (
            <p className="text-foreground/50 font-bitter mb-8 max-w-lg pb-12 text-2xl leading-relaxed italic">
              {section.subtitle}
            </p>
          )}

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleReviews.map((review, index) => {
              return (
                <Link
                  key={review._id}
                  href={`/book-reviews/${review.slug}`}
                  className="bg-foreground/5 hover:bg-foreground/10 group hover:border-primary flex flex-col rounded-xl border border-transparent p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase">
                      Book Review
                    </p>

                    <h3 className="text-foreground line-clamp-2 text-lg leading-snug font-bold">
                      {review.bookTitle}
                    </h3>

                    {review.bookAuthor && (
                      <p className="text-foreground mt-1 text-sm">
                        by {review.bookAuthor}
                      </p>
                    )}

                    {review.excerpt && (
                      <p className="text-foreground/60 mt-2 line-clamp-3 flex-1 text-sm leading-relaxed">
                        {review.excerpt}
                      </p>
                    )}

                    {review.date && (
                      <p className="text-text-foreground/60 mt-4 text-xs">
                        {format(parseISO(review.date), 'MMMM d, yyyy')}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
          {section.linkText && (
            <div className="flex w-full justify-end-safe py-12">
              <Link
                href="/book-reviews"
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                {section.linkText} &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
