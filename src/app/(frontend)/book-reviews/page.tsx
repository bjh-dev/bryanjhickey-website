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

const REVIEWS_PER_PAGE = 10

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

/* ─── Shared subcomponents ─────────────────────── */

function ReviewMeta({ review }: { review: ReviewType }) {
  return (
    <div className="text-muted-foreground flex items-center gap-4 text-xs font-medium tracking-wider uppercase">
      {review.date && <time>{formatDate('long', review.date)}</time>}
      <span className="bg-border inline-block h-px w-5" />
      <span>{readTime(review.wordCount)} min read</span>
    </div>
  )
}

/* ─── Hero review ──────────────────────────────── */

function HeroReview({ review }: { review: ReviewType }) {
  return (
    <FadeYAnimation yStartValue={24} duration={0.8}>
      <Link
        href={getDocumentLink({ slug: review.slug, _type: 'bookReview' })}
        className="group border-border mb-16 block pb-16"
      >
        <ReviewMeta review={review} />
        <h2 className="text-foreground mt-4 mb-2 font-serif text-3xl leading-tight font-bold tracking-tight lg:text-4xl">
          {review.bookTitle}
        </h2>
        {review.bookAuthor && (
          <p className="text-muted-foreground mb-4 text-sm font-medium">
            by {review.bookAuthor}
          </p>
        )}
        {review.excerpt && (
          <p className="text-muted-foreground mb-6 max-w-2xl text-base leading-relaxed font-light">
            {review.excerpt}
          </p>
        )}
        <span className="text-primary text-sm font-medium">
          Read review &rarr;
        </span>
      </Link>
    </FadeYAnimation>
  )
}

/* ─── Row A: Grid cards (2×2) ──────────────────── */

function GridCard({ review, index }: { review: ReviewType; index: number }) {
  const isSecondRow = index >= 2

  return (
    <FadeYAnimation yStartValue={20} duration={0.7} delay={0.05 * index}>
      <Link
        href={getDocumentLink({ slug: review.slug, _type: 'bookReview' })}
        className={cn(
          'group block',
          isSecondRow ? 'border-border border-t pt-8' : 'pb-8',
          index % 2 === 0 ? 'lg:pe-8' : 'border-border lg:border-s lg:ps-8',
        )}
      >
        <ReviewMeta review={review} />
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

/* ─── Row B: Text-only cards (3-col) ───────────── */

function TextCard({
  review,
  index,
  isLast,
}: {
  review: ReviewType
  index: number
  isLast: boolean
}) {
  return (
    <FadeYAnimation yStartValue={20} duration={0.7} delay={0.1 * index}>
      <Link
        href={getDocumentLink({ slug: review.slug, _type: 'bookReview' })}
        className={cn(
          'group block px-0 lg:px-8',
          index === 0 && 'lg:ps-0',
          isLast && 'lg:pe-0',
          !isLast &&
            'border-border border-b pb-8 lg:border-e lg:border-b-0 lg:pb-0',
        )}
      >
        <ReviewMeta review={review} />
        <h3 className="text-foreground group-hover:text-primary mt-3 mb-1.5 font-serif text-lg leading-snug font-bold transition-colors duration-300">
          {review.bookTitle}
        </h3>
        {review.bookAuthor && (
          <p className="text-muted-foreground mb-2 text-sm font-medium">
            by {review.bookAuthor}
          </p>
        )}
        {review.excerpt && (
          <p className="text-muted-foreground line-clamp-3 text-[15px] leading-relaxed font-light">
            {review.excerpt}
          </p>
        )}
      </Link>
    </FadeYAnimation>
  )
}

/* ─── Row C: Asymmetric cards (2-col) ──────────── */

function AsymmetricCard({
  review,
  index,
}: {
  review: ReviewType
  index: number
}) {
  return (
    <FadeYAnimation yStartValue={20} duration={0.7} delay={0.15 * index}>
      <Link
        href={getDocumentLink({ slug: review.slug, _type: 'bookReview' })}
        className={cn(
          'group block',
          index === 0 && 'lg:pe-8',
          index === 1 &&
            'border-border border-t pt-8 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0',
        )}
      >
        <ReviewMeta review={review} />
        <h3 className="text-foreground group-hover:text-primary mt-3 mb-1.5 font-serif text-xl leading-snug font-bold transition-colors duration-300">
          {review.bookTitle}
        </h3>
        {review.bookAuthor && (
          <p className="text-muted-foreground mb-2 text-sm font-medium">
            by {review.bookAuthor}
          </p>
        )}
        {review.excerpt && (
          <p className="text-muted-foreground line-clamp-3 text-[15px] leading-relaxed font-light">
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

  const heroReview = reviews[0]
  const rowAReviews = reviews.slice(1, 5)
  const rowBReviews = reviews.slice(5, 8)
  const rowCReviews = reviews.slice(8, 10)

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

        {/* Featured Hero Review */}
        {heroReview && <HeroReview review={heroReview} />}

        {/* Row A: Grid Cards (2×2) */}
        {rowAReviews.length > 0 && (
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0">
            {rowAReviews.map((review, i) => (
              <GridCard key={review._id} review={review} index={i} />
            ))}
          </div>
        )}

        {/* Row B: Text-Only (3-col) */}
        {rowBReviews.length > 0 && (
          <div className="border-border mb-16 grid grid-cols-1 gap-8 border-t pt-12 lg:grid-cols-3 lg:gap-0">
            {rowBReviews.map((review, i) => (
              <TextCard
                key={review._id}
                review={review}
                index={i}
                isLast={i === rowBReviews.length - 1}
              />
            ))}
          </div>
        )}

        {/* Row C: Asymmetric (2-col) */}
        {rowCReviews.length > 0 && (
          <div className="border-border mb-16 grid grid-cols-1 border-t pt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-0">
            {rowCReviews.map((review, i) => (
              <AsymmetricCard key={review._id} review={review} index={i} />
            ))}
          </div>
        )}

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
