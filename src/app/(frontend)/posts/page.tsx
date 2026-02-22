import { sanityFetch } from '@/lib/sanity/client/live'
import {
  postsArchiveQuery,
  allCategoriesQuery,
} from '@/lib/sanity/queries/queries'
import { AllCategoriesQueryResult } from '@/types/sanity.types'
import { PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'
import { getDocumentLink } from '@/lib/links'
import { urlForImage } from '@/lib/sanity/client/image'
import { formatDate, readTime } from '@/utils/strings'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FadeYAnimation from '@/components/animations/FadeYAnimation'
import { cn } from '@/lib/utils'

const EDITORIAL_POSTS_PER_PAGE = 10

type PostType = PostCardFragmentType

type Props = {
  searchParams: Promise<{ category?: string; page?: string }>
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { category: categorySlug } = await searchParams
  const title = categorySlug ? `Writing — ${categorySlug}` : 'Writing'
  return {
    title,
    alternates: { canonical: '/posts' },
  }
}

/* ─── Shared subcomponents ─────────────────────── */

function CardMeta({ post }: { post: PostType }) {
  return (
    <div className="text-muted-foreground flex items-center gap-4 text-xs font-medium tracking-wider uppercase">
      {post.date && <time>{formatDate('long', post.date)}</time>}
      <span className="bg-border inline-block h-px w-5" />
      <span>{readTime(post.wordCount)} min read</span>
    </div>
  )
}

function getCategoryLabel(post: PostType): string | null {
  if (post.categories && post.categories.length > 0) {
    return post.categories[0].title
  }
  return post.subtitle ?? null
}

/* ─── Category filter pills ────────────────────── */

function CategoryFilterPills({
  categories,
  activeSlug,
}: {
  categories: AllCategoriesQueryResult
  activeSlug: string | undefined
}) {
  const isAllActive = !activeSlug

  return (
    <div className="relative mb-16">
      <div className="from-background bg-gbg-linear-to-ltransparent pointer-events-none absolute inset-y-0 inset-e-0 z-10 w-12" />
      <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-2">
        <Link
          href="/posts"
          className={cn(
            'shrink-0 rounded-full border px-5 py-2 text-xs font-medium tracking-wide transition-colors',
            isAllActive
              ? 'bg-foreground text-background border-foreground'
              : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground',
          )}
        >
          All
        </Link>
        {categories.map((cat) => {
          const isActive = activeSlug === cat.slug
          return (
            <Link
              key={cat._id}
              href={`/posts?category=${cat.slug}`}
              className={cn(
                'shrink-0 rounded-full border px-5 py-2 text-xs font-medium tracking-wide transition-colors',
                isActive
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground',
              )}
            >
              {cat.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Hero post ────────────────────────────────── */

function HeroPost({ post }: { post: PostType }) {
  const categoryLabel = getCategoryLabel(post)

  return (
    <FadeYAnimation yStartValue={24} duration={0.8}>
      <Link
        href={getDocumentLink({ slug: post.slug, _type: 'post' })}
        className="group border-border mb-16 grid grid-cols-1 gap-8 pb-16 lg:grid-cols-[3fr_2fr] lg:gap-0"
      >
        {post.image && (
          <div className="aspect-video overflow-hidden">
            <Image
              src={urlForImage(post.image).url()}
              alt={post.title}
              width={1200}
              height={675}
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
              className="h-full w-full object-cover contrast-105 grayscale-15 transition-all duration-600 ease-out group-hover:scale-103 group-hover:contrast-110 group-hover:grayscale-0"
            />
          </div>
        )}
        <div className="border-border flex flex-col justify-center lg:border-s lg:ps-12">
          <CardMeta post={post} />
          <h2 className="text-foreground mt-4 mb-2 font-serif text-3xl leading-tight font-bold tracking-tight lg:text-4xl">
            {post.title}
          </h2>
          {categoryLabel && (
            <p className="text-primary mb-4 text-sm font-medium tracking-wide">
              {categoryLabel}
            </p>
          )}
          {post.excerpt && (
            <p className="text-muted-foreground mb-6 max-w-lg text-base leading-relaxed font-light">
              {post.excerpt}
            </p>
          )}
          <span className="text-primary text-sm font-medium">
            Read essay &rarr;
          </span>
        </div>
      </Link>
    </FadeYAnimation>
  )
}

/* ─── Row A: Image cards (2×2) ─────────────────── */

function ImageCard({ post, index }: { post: PostType; index: number }) {
  const categoryLabel = getCategoryLabel(post)
  const isSecondRow = index >= 2

  return (
    <FadeYAnimation yStartValue={20} duration={0.7} delay={0.05 * index}>
      <Link
        href={getDocumentLink({ slug: post.slug, _type: 'post' })}
        className={cn(
          'group block',
          isSecondRow && 'border-border border-t pt-8',
          index % 2 === 0 ? 'lg:pe-8' : 'border-border lg:border-s lg:ps-8',
        )}
      >
        {post.image && (
          <div className="mb-5 aspect-3/2 overflow-hidden">
            <Image
              src={urlForImage(post.image).url()}
              alt={post.title}
              width={640}
              height={426}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-full w-full object-cover contrast-105 grayscale-15 transition-all duration-500 ease-out group-hover:scale-103 group-hover:grayscale-0"
            />
          </div>
        )}
        <CardMeta post={post} />
        <h3 className="text-foreground group-hover:text-primary mt-3 mb-1.5 font-serif text-xl leading-snug font-bold transition-colors duration-300">
          {post.title}
        </h3>
        {categoryLabel && (
          <p className="text-primary mb-2 text-xs font-medium tracking-wide">
            {categoryLabel}
          </p>
        )}
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed font-light">
            {post.excerpt}
          </p>
        )}
      </Link>
    </FadeYAnimation>
  )
}

/* ─── Row B: Text-only cards (3-col) ───────────── */

function TextCard({
  post,
  index,
  isLast,
}: {
  post: PostType
  index: number
  isLast: boolean
}) {
  return (
    <FadeYAnimation yStartValue={20} duration={0.7} delay={0.1 * index}>
      <Link
        href={getDocumentLink({ slug: post.slug, _type: 'post' })}
        className={cn(
          'group block px-0 lg:px-8',
          index === 0 && 'lg:ps-0',
          isLast && 'lg:pe-0',
          !isLast &&
            'border-border border-b pb-8 lg:border-e lg:border-b-0 lg:pb-0',
        )}
      >
        <CardMeta post={post} />
        <h3 className="text-foreground group-hover:text-primary mt-3 mb-1.5 font-serif text-lg leading-snug font-bold transition-colors duration-300">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3 text-[15px] leading-relaxed font-light">
            {post.excerpt}
          </p>
        )}
      </Link>
    </FadeYAnimation>
  )
}

/* ─── Row C: Asymmetric cards (2-col) ──────────── */

function AsymmetricCard({ post, index }: { post: PostType; index: number }) {
  const categoryLabel = getCategoryLabel(post)

  return (
    <FadeYAnimation yStartValue={20} duration={0.7} delay={0.15 * index}>
      <Link
        href={getDocumentLink({ slug: post.slug, _type: 'post' })}
        className={cn(
          'group block',
          index === 0 && 'lg:pe-8',
          index === 1 &&
            'border-border border-t pt-8 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0',
        )}
      >
        <CardMeta post={post} />
        <h3 className="text-foreground group-hover:text-primary mt-3 mb-1.5 font-serif text-xl leading-snug font-bold transition-colors duration-300">
          {post.title}
        </h3>
        {categoryLabel && (
          <p className="text-primary mb-2 text-xs font-medium tracking-wide">
            {categoryLabel}
          </p>
        )}
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3 text-[15px] leading-relaxed font-light">
            {post.excerpt}
          </p>
        )}
      </Link>
    </FadeYAnimation>
  )
}

/* ─── Pagination ───────────────────────────────── */

function PostsPagination({
  currentPage,
  totalPages,
  totalPosts,
  postsOnPage,
  categorySlug,
}: {
  currentPage: number
  totalPages: number
  totalPosts: number
  postsOnPage: number
  categorySlug: string | undefined
}) {
  if (totalPages <= 1) return null

  const buildHref = (page: number) => {
    const params = new URLSearchParams()
    if (categorySlug) params.set('category', categorySlug)
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    return `/posts${qs ? `?${qs}` : ''}`
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
                ? 'bg-foreground text-background border-foreground'
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
        Showing {postsOnPage} of {totalPosts} posts
      </p>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────── */

export default async function PostsPage({ searchParams }: Props) {
  const { category: categorySlug, page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)

  const from = (currentPage - 1) * EDITORIAL_POSTS_PER_PAGE
  const to = from + EDITORIAL_POSTS_PER_PAGE - 1

  const [{ data: archiveData }, { data: categories }] = await Promise.all([
    sanityFetch({
      query: postsArchiveQuery,
      params: {
        from,
        to,
        filters: {
          categorySlug: categorySlug ?? null,
          personSlug: null,
        },
      },
    }),
    sanityFetch({ query: allCategoriesQuery }),
  ])

  if (!archiveData) notFound()

  const posts = archiveData.results
  const totalPages = Math.ceil(archiveData.total / EDITORIAL_POSTS_PER_PAGE)

  if (posts.length === 0) {
    return (
      <section className="py-12">
        <div className="content feature">
          <div className="border-border mb-10 grid items-end gap-4 border-b pb-10 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
                The Writing
              </p>
              <h1 className="text-foreground font-serif text-5xl leading-none font-black tracking-tight lg:text-7xl">
                Theology, culture,{' '}
                <em className="text-primary font-normal italic">
                  and the Christian life
                </em>
              </h1>
            </div>
          </div>
          <CategoryFilterPills
            categories={categories ?? []}
            activeSlug={categorySlug}
          />
          <p className="text-muted-foreground py-24 text-center text-lg font-light">
            No posts found{categorySlug ? ` in "${categorySlug}"` : ''}.
          </p>
        </div>
      </section>
    )
  }

  const heroPost = posts[0]
  const rowAPosts = posts.slice(1, 5)
  const rowBPosts = posts.slice(5, 8)
  const rowCPosts = posts.slice(8, 10)

  return (
    <section className="py-12">
      <div className="content feature">
        {/* Section Header */}
        <div className="border-border mb-10 grid items-end gap-4 border-b pb-10 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
              The Writing
            </p>
            <h1 className="text-foreground font-serif text-5xl leading-none font-black tracking-tight lg:text-7xl">
              Theology, culture,{' '}
              <em className="text-primary font-normal italic">
                and the Christian life
              </em>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md self-end pb-1 text-lg leading-relaxed font-light">
            Essays on Scripture, theology, and how faith intersects with
            contemporary culture.
          </p>
        </div>

        {/* Category Filter Pills */}
        <CategoryFilterPills
          categories={categories ?? []}
          activeSlug={categorySlug}
        />

        {/* Featured Hero Post */}
        {heroPost && <HeroPost post={heroPost} />}

        {/* Row A: Image Cards (2×2) */}
        {rowAPosts.length > 0 && (
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0">
            {rowAPosts.map((post, i) => (
              <ImageCard key={post._id} post={post} index={i} />
            ))}
          </div>
        )}

        {/* Row B: Text-Only (3-col) */}
        {rowBPosts.length > 0 && (
          <div className="border-border mb-16 grid grid-cols-1 gap-8 border-t pt-12 lg:grid-cols-3 lg:gap-0">
            {rowBPosts.map((post, i) => (
              <TextCard
                key={post._id}
                post={post}
                index={i}
                isLast={i === rowBPosts.length - 1}
              />
            ))}
          </div>
        )}

        {/* Row C: Asymmetric (2-col) */}
        {rowCPosts.length > 0 && (
          <div className="border-border mb-16 grid grid-cols-1 border-t pt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-0">
            {rowCPosts.map((post, i) => (
              <AsymmetricCard key={post._id} post={post} index={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <PostsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalPosts={archiveData.total}
          postsOnPage={posts.length}
          categorySlug={categorySlug}
        />
      </div>
    </section>
  )
}
