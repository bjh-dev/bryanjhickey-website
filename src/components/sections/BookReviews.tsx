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
    <section className="border-border border-b">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            {section.heading}
          </h2>
          {section.linkText && (
            <Link
              href="/book-reviews"
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              {section.linkText} &rarr;
            </Link>
          )}
        </div>

        {section.subtitle && (
          <p className="text-muted-foreground mt-4 max-w-2xl text-[1.0625rem] leading-relaxed">
            {section.subtitle}
          </p>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleReviews.map((review, index) => {
            const colorClass = CARD_COLORS[index % CARD_COLORS.length]

            return (
              <Link
                key={review._id}
                href={`/book-reviews/${review.slug}`}
                className={`bg-primary/10 group flex flex-col rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
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

                {review.date && (
                  <p className="text-muted-foreground mt-4 text-xs">
                    {format(parseISO(review.date), 'MMMM d, yyyy')}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
