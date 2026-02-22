'use client'

import Link from 'next/link'
import { useRef, useCallback } from 'react'
import { BookReviewsSection } from '@/components/sections/types'
import { formatDate } from '@/utils/strings'
import FadeYAnimation from '@/components/animations/FadeYAnimation'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

type ReviewType = NonNullable<BookReviewsSection['reviews']>[number]

function ReviewCard({ review, index }: { review: ReviewType; index: number }) {
  return (
    <FadeYAnimation yStartValue={24} duration={0.8} delay={0.1 * index}>
      <Link
        href={`/book-reviews/${review.slug}`}
        className="bg-foreground/5 hover:bg-foreground/10 group hover:border-primary flex h-full flex-col rounded-xl border border-transparent p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
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
  )
}

export default function BookReviews({
  section,
}: {
  section: BookReviewsSection
}) {
  const reviews = section.reviews ?? []
  const scrollRef = useRef<HTMLDivElement>(null)

  const hasOverflow = reviews.length > 8
  const maxCards = 8
  const cardsToShow = hasOverflow
    ? maxCards - 1
    : Math.min(reviews.length, maxCards)
  const visibleReviews = reviews.slice(0, cardsToShow)
  const useCarousel = visibleReviews.length > 3

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const cardWidth = container.firstElementChild?.clientWidth ?? 0
    const gap = 24
    container.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth',
    })
  }, [])

  return (
    <section className="py-12">
      <div className="content feature">
        {/* Section Header */}
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

        {useCarousel ? (
          /* Carousel layout for > 3 reviews */
          <div className="relative">
            {/* Navigation arrows — desktop only */}
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="bg-background/80 text-foreground hover:bg-background border-border absolute top-1/2 -left-4 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition-colors lg:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="bg-background/80 text-foreground hover:bg-background border-border absolute top-1/2 -right-4 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition-colors lg:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Scroll container */}
            <div
              ref={scrollRef}
              className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4"
            >
              {visibleReviews.map((review, index) => (
                <div
                  key={review._id}
                  className="w-[85vw] shrink-0 snap-start sm:w-[45%] lg:w-[calc(33.333%-16px)]"
                >
                  <ReviewCard review={review} index={index} />
                </div>
              ))}

              {/* "Show more" card when 8-card limit reached */}
              {hasOverflow && (
                <div className="w-[85vw] shrink-0 snap-start sm:w-[45%] lg:w-[calc(33.333%-16px)]">
                  <FadeYAnimation
                    yStartValue={24}
                    duration={0.8}
                    delay={0.1 * cardsToShow}
                  >
                    <Link
                      href="/book-reviews"
                      className="bg-foreground/5 hover:bg-foreground/10 group hover:border-primary flex h-full min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-transparent p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <span className="text-foreground group-hover:text-primary font-serif text-lg font-bold transition-colors duration-300">
                        Show more
                      </span>
                      <ArrowRight className="text-primary h-5 w-5" />
                    </Link>
                  </FadeYAnimation>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Grid layout for <= 3 reviews */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleReviews.map((review, index) => (
              <ReviewCard key={review._id} review={review} index={index} />
            ))}
          </div>
        )}

        {/* View all link — only shown when not in carousel overflow mode */}
        {section.linkText && !hasOverflow && (
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
