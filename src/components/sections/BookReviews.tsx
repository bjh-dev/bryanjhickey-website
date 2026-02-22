import Link from 'next/link'
import { BookReviewsSection } from '@/components/sections/types'
import { formatDate } from '@/utils/strings'
import FadeYAnimation from '@/components/animations/FadeYAnimation'

export default function BookReviews({
  section,
}: {
  section: BookReviewsSection
}) {
  const reviews = section.reviews ?? []
  const displayCount = section.numberOfReviews ?? 3
  const visibleReviews = reviews.slice(0, displayCount)

  return (
    <section className="py-12">
      <div className="content feature">
        {/* Section Header — editorial style matching PostList */}
        <div className="border-border mb-16 grid items-end gap-4 border-b pb-10 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
              Book Reviews
            </p>
            <h2 className="text-foreground font-serif text-5xl leading-none font-black tracking-tight lg:text-7xl">
              {section.heading}
            </h2>
          </div>
          {section.subtitle && (
            <p className="text-muted-foreground max-w-md self-end pb-1 text-lg leading-relaxed font-light">
              {section.subtitle}
            </p>
          )}
        </div>

        {/* Review cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleReviews.map((review, index) => (
            <FadeYAnimation
              key={review._id}
              yStartValue={24}
              duration={0.8}
              delay={0.1 * index}
            >
              <Link
                href={`/book-reviews/${review.slug}`}
                className="bg-foreground/5 hover:bg-foreground/10 group hover:border-primary flex flex-col rounded-xl border border-transparent p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase">
                    Book Review
                  </p>

                  <h3 className="text-foreground group-hover:text-primary line-clamp-2 font-serif text-lg leading-snug font-bold transition-colors duration-300">
                    {review.bookTitle}
                  </h3>

                  {review.bookAuthor && (
                    <p className="text-muted-foreground mt-1 text-sm font-light">
                      by {review.bookAuthor}
                    </p>
                  )}

                  {review.excerpt && (
                    <p className="text-muted-foreground mt-2 line-clamp-3 flex-1 text-sm leading-relaxed font-light">
                      {review.excerpt}
                    </p>
                  )}

                  {review.date && (
                    <p className="text-muted-foreground mt-4 text-xs font-medium tracking-wider uppercase">
                      {formatDate('long', review.date)}
                    </p>
                  )}
                </div>
              </Link>
            </FadeYAnimation>
          ))}
        </div>

        {/* View all link */}
        {section.linkText && (
          <div className="flex w-full justify-end py-12">
            <Link
              href="/book-reviews"
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              {section.linkText} &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
