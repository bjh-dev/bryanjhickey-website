'use client'

import { PostListSection } from '@/components/sections/types'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa6'
import { getDocumentLink } from '@/lib/links'
import { urlForImage } from '@/lib/sanity/client/image'
import { formatDate, readTime } from '@/utils/strings'
import Image from 'next/image'
import FadeYAnimation from '@/components/animations/FadeYAnimation'
import { useRef, useState, useEffect } from 'react'

const MAX_SIDE_POSTS = 6

type PostType = NonNullable<PostListSection['posts']>[number]

function getCategoryLabel(post: PostType): string | null {
  if (post.categories && post.categories.length > 0) {
    return post.categories[0].title
  }
  return post.subtitle ?? null
}

function CardMeta({ post }: { post: PostType }) {
  return (
    <div className="text-muted-foreground flex items-center gap-4 text-xs font-medium tracking-wider uppercase">
      {post.date && <time>{formatDate('long', post.date)}</time>}
      <span className="bg-border inline-block h-px w-5" />
      <span>{readTime(post.wordCount)} min read</span>
    </div>
  )
}

function HeroCard({ post }: { post: PostType }) {
  const categoryLabel = getCategoryLabel(post)

  return (
    <FadeYAnimation yStartValue={24} duration={0.8}>
      <Link
        href={getDocumentLink({ slug: post.slug, _type: 'post' })}
        className="group border-border block cursor-pointer pb-10 lg:border-r lg:pe-12 lg:pb-0"
      >
        {post.image && (
          <div className="mb-7 aspect-4/3 overflow-hidden">
            <Image
              src={urlForImage(post.image).url()}
              alt={post.title}
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="h-full w-full object-cover contrast-105 grayscale-15 transition-all duration-600 ease-out group-hover:scale-103 group-hover:contrast-110 group-hover:grayscale-0"
            />
          </div>
        )}
        <CardMeta post={post} />
        <h3 className="text-foreground mt-4 mb-2 font-serif text-3xl leading-snug font-bold tracking-tight">
          {post.title}
        </h3>
        {categoryLabel && (
          <p className="text-primary mb-4 text-sm font-medium tracking-wide">
            {categoryLabel}
          </p>
        )}
        {post.excerpt && (
          <p className="text-muted-foreground max-w-xl text-base leading-relaxed font-light">
            {post.excerpt}
          </p>
        )}
      </Link>
    </FadeYAnimation>
  )
}

function SideCard({
  post,
  index,
  showBorder,
}: {
  post: PostType
  index: number
  showBorder: boolean
}) {
  const categoryLabel = getCategoryLabel(post)
  const number = String(index + 1).padStart(2, '0')

  return (
    <FadeYAnimation yStartValue={24} duration={0.8} delay={0.1 * (index + 1)}>
      <Link
        href={getDocumentLink({ slug: post.slug, _type: 'post' })}
        className={`group relative grid cursor-pointer grid-cols-[1fr_140px] items-start gap-6 py-8 ${
          index === 0 ? 'pt-0' : ''
        } border-border ${showBorder ? 'border-b' : ''}`}
      >
        <div>
          <CardMeta post={post} />
          <h3 className="text-foreground group-hover:text-primary mt-4 mb-1.5 font-serif text-xl leading-snug font-bold transition-colors duration-300">
            {post.title}
          </h3>
          {categoryLabel && (
            <p className="text-primary mb-2.5 text-xs font-medium tracking-wide">
              {categoryLabel}
            </p>
          )}
          {post.excerpt && (
            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed font-light">
              {post.excerpt}
            </p>
          )}
        </div>
        {post.image && (
          <div className="aspect-square w-35 overflow-hidden">
            <Image
              src={urlForImage(post.image).url()}
              alt={post.title}
              width={300}
              height={300}
              sizes="140px"
              className="h-full w-full object-cover grayscale-20 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
        )}
      </Link>
    </FadeYAnimation>
  )
}

function ReadMoreCard({ index }: { index: number }) {
  return (
    <FadeYAnimation yStartValue={24} duration={0.8} delay={0.1 * (index + 1)}>
      <Link
        href="/posts"
        className="group border-border flex items-center gap-3 border-t py-8"
      >
        <span className="text-foreground group-hover:text-primary font-serif text-lg font-bold transition-colors duration-300">
          Read more posts
        </span>
        <FaArrowRight className="text-primary h-3.5 w-3.5" />
      </Link>
    </FadeYAnimation>
  )
}

function BottomCard({
  post,
  index,
  isLast,
}: {
  post: PostType
  index: number
  isLast: boolean
}) {
  const categoryLabel = getCategoryLabel(post)

  return (
    <FadeYAnimation yStartValue={24} duration={0.8} delay={0.3 + 0.1 * index}>
      <Link
        href={getDocumentLink({ slug: post.slug, _type: 'post' })}
        className={`group block cursor-pointer px-0 lg:px-8 ${
          index === 0 ? 'lg:ps-0' : ''
        } ${!isLast ? 'border-border border-b pb-8 lg:border-r lg:border-b-0 lg:pb-0' : ''}`}
      >
        <CardMeta post={post} />
        <h3 className="text-foreground group-hover:text-primary mt-4 mb-1.5 font-serif text-xl leading-snug font-bold transition-colors duration-300">
          {post.title}
        </h3>
        {categoryLabel && (
          <p className="text-primary mb-3 text-xs font-medium tracking-wide">
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

export default function PostList({ section }: { section: PostListSection }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollMetrics, setScrollMetrics] = useState({
    progress: 0,
    thumbPercent: 30,
    canScroll: false,
  })

  const featuredPosts = section.posts.filter((post) => post.isFeatured)
  const recentPosts = section.posts.filter((post) => !post.isFeatured)
  const allPosts = [...featuredPosts, ...recentPosts].slice(
    0,
    section.numberOfPosts ?? 7,
  )

  const heroPost = allPosts[0]
  const sidePosts = allPosts.slice(1, 1 + MAX_SIDE_POSTS)
  const bottomPosts = allPosts.slice(1 + MAX_SIDE_POSTS)
  const hasMoreSidePosts = section.posts.length > 1 + MAX_SIDE_POSTS
  const visibleSidePosts = hasMoreSidePosts
    ? sidePosts.slice(0, MAX_SIDE_POSTS - 1)
    : sidePosts

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const isScrollable = scrollHeight > clientHeight
      const maxScroll = scrollHeight - clientHeight
      setScrollMetrics({
        progress: maxScroll > 0 ? scrollTop / maxScroll : 0,
        thumbPercent: isScrollable
          ? Math.max(20, (clientHeight / scrollHeight) * 100)
          : 30,
        canScroll: isScrollable,
      })
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(el)

    return () => {
      el.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  if (!heroPost) return null

  const thumbOffset =
    scrollMetrics.progress * (100 - scrollMetrics.thumbPercent)

  return (
    <section className="py-12">
      <div className="content feature">
        {/* Section Header */}
        <div className="border-border mb-16 flex flex-col items-start justify-between gap-6 border-b pb-10 md:flex-row">
          <div>
            {section.subtitle && (
              <p className="text-primary mb-4 max-w-lg text-xs font-semibold tracking-[0.2em] uppercase">
                {section.subtitle}
              </p>
            )}
            <h2 className="text-foreground font-serif text-5xl leading-none font-black tracking-tight lg:text-7xl">
              {section.title || 'Featured Posts'}
            </h2>
          </div>
          <div>
            {section.description && (
              <p className="text-muted-foreground max-w-md self-end pb-1 text-lg leading-relaxed font-light">
                {section.description}
              </p>
            )}
          </div>
        </div>

        {/* Main Grid: Hero + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
          <HeroCard post={heroPost} />

          {visibleSidePosts.length > 0 && (
            <div className="relative pt-4 lg:pt-0">
              <div className="flex lg:absolute lg:inset-0">
                <div
                  ref={scrollRef}
                  className="scrollbar-hide flex min-h-0 flex-1 flex-col lg:overflow-y-auto lg:ps-12"
                >
                  {visibleSidePosts.map((post, index) => (
                    <SideCard
                      key={post._id}
                      post={post}
                      index={index}
                      showBorder={
                        hasMoreSidePosts || index < visibleSidePosts.length - 1
                      }
                    />
                  ))}
                  {hasMoreSidePosts && (
                    <ReadMoreCard index={visibleSidePosts.length} />
                  )}
                </div>

                {/* Vertical progress bar */}
                {scrollMetrics.canScroll && (
                  <div className="hidden lg:ms-3 lg:block lg:w-1 lg:self-stretch">
                    <div className="bg-border/40 relative h-full w-full rounded-full">
                      <div
                        className="bg-primary/60 absolute top-0 w-full rounded-full transition-transform duration-150 ease-out"
                        style={{
                          height: `${scrollMetrics.thumbPercent}%`,
                          transform: `translateY(${thumbOffset}%)`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Row */}
        {bottomPosts.length > 0 && (
          <div className="border-border mt-12 grid grid-cols-1 gap-8 border-t pt-12 lg:grid-cols-3 lg:gap-0">
            {bottomPosts.map((post, index) => (
              <BottomCard
                key={post._id}
                post={post}
                index={index}
                isLast={index === bottomPosts.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
