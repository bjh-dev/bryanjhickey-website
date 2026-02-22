import { sanityFetch } from '@/lib/sanity/client/live'
import { bookReviewsArchiveQuery } from '@/lib/sanity/queries/queries'
import { BookReviewCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'
import { getDocumentLink } from '@/lib/links'
import { formatDate, readTime } from '@/utils/strings'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import FadeYAnimation from '@/components/animations/FadeYAnimation'
import { cn } from '@/lib/utils'

const REVIEWS_PER_PAGE = 12

type ReviewType = BookReviewCardFragmentType

type Props = {
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Book Reviews',
    alternates: { canonical: '/book-reviews' },
  }
}

/* ─── Review card ──────────────────────────────── */

function ReviewCard({ review, index }: { review: ReviewType; index: number }) {
  return (
    <FadeYAnimation yStartValue={20} duration={0.7} delay={0.05 * index}>
      <Link
        href={getDocumentLink({ slug: review.slug, _type: 'bookReview' })}
        className="group block h-full"
      >
        <div className="text-muted-foreground flex items-center gap-4 text-xs font-medium tracking-wider uppercase">
          {review.date && <time>{formatDate('long', review.date)}</time>}
          <span className="bg-border inline-block h-px w-5" />
          <span>{readTime(review.wordCount)} min read</span>
        </div>
        <h3 className="text-foreground group-hover:text-primary mt-3 mb-1.5 font-serif text-xl leading-snug font-bold transition-colors duration-300">
          {review.bookTitle}
        </h3>
        {review.bookAuthor && (
          <p className="text-muted-foreground mb-2 text-sm font-medium">
            by {review.bookAuthor}
          </p>
        )}
        {review.excerpt && (
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed font-light">
            {review.excerpt}
          </p>
        )}
      </Link>
    </FadeYAnimation>
  )
}

/* ─── Pagination ───────────────────────────────── */

function ReviewsPagination({
  currentPage,
  totalPages,
  totalReviews,
  reviewsOnPage,
}: {
  currentPage: number
  totalPages: number
  totalReviews: number
  reviewsOnPage: number
}) {
  if (totalPages <= 1) return null

  const buildHref = (page: number) => {
    if (page > 1) return `/book-reviews?page=${page}`
    return '/book-reviews'
  }

  return (
    <div className="border-border mt-16 border-t pt-12 text-center">
      <div className="mb-6 flex items-center justify-center gap-2">
        {currentPage > 1 && (
          <Link
            href={buildHref(currentPage - 1)}
            className="text-muted-foreground hover:text-foreground border-border rounded-sm border px-4 py-2 text-sm font-medium transition-colors"
          >
            Previous
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={buildHref(page)}
            className={cn(
              'rounded-sm border px-3 py-2 text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground',
            )}
          >
            {page}
          </Link>
        ))}
        {currentPage < totalPages && (
          <Link
            href={buildHref(currentPage + 1)}
            className="text-muted-foreground hover:text-foreground border-border rounded-sm border px-4 py-2 text-sm font-medium transition-colors"
          >
            Next
          </Link>
        )}
      </div>
      <p className="text-muted-foreground text-sm">
        Showing {reviewsOnPage} of {totalReviews} reviews
      </p>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────── */

export default async function BookReviewsPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)

  const from = (currentPage - 1) * REVIEWS_PER_PAGE
  const to = from + REVIEWS_PER_PAGE - 1

  const { data: archiveData } = await sanityFetch({
    query: bookReviewsArchiveQuery,
    params: { from, to },
  })

  if (!archiveData) notFound()

  const reviews = archiveData.results
  const totalPages = Math.ceil(archiveData.total / REVIEWS_PER_PAGE)

  if (reviews.length === 0) {
    return (
      <section className="py-48">
        <div className="content feature">
          <div className="border-border mb-10 grid items-end gap-4 border-b pb-10 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
                Book Reviews
              </p>
              <h1 className="text-foreground font-serif text-5xl leading-none font-black tracking-tight lg:text-7xl">
                Critical reviews{' '}
                <em className="text-primary font-normal italic">
                  and reflections
                </em>
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground py-24 text-center text-lg font-light">
            No book reviews found.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-48">
      <div className="content feature">
        {/* Section Header */}
        <div className="border-border mb-10 grid items-end gap-4 border-b pb-10 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
              Book Reviews
            </p>
            <h1 className="text-foreground font-serif text-5xl leading-none font-black tracking-tight lg:text-7xl">
              Critical reviews{' '}
              <em className="text-primary font-normal italic">
                and reflections
              </em>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md self-end pb-1 text-lg leading-relaxed font-light">
            Reviews and reflections on books covering theology, philosophy, and
            biblical studies.
          </p>
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <ReviewCard key={review._id} review={review} index={i} />
          ))}
        </div>

        {/* Pagination */}
        <ReviewsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalReviews={archiveData.total}
          reviewsOnPage={reviews.length}
        />
      </div>
    </section>
  )
}
