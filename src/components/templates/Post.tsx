import type { PortableTextBlock } from 'next-sanity'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FadeYAnimation from '@/components/animations/FadeYAnimation'
import CustomPortableText from '@/components/modules/PortableText'
import Toc from '@/components/modules/Toc'
import { urlForImage } from '@/lib/sanity/client/image'
import { formatDate, readTime } from '@/utils/strings'
import { cn } from '@/lib/utils'
import type { PostQueryResult } from '@/types/sanity.types'

type Props = {
  post: NonNullable<PostQueryResult>
}

const Post = ({ post }: Props) => {
  const hasHeadings = post.headings && post.headings.length > 0
  return (
    <div className="py-24">
      {/* Cover image */}
      {post.image?.asset?._ref && (
        <FadeYAnimation yStartValue={24} duration={0.8}>
          <div className="content feature mb-10">
            <div className="aspect-20/10 overflow-hidden">
              <Image
                src={urlForImage(post.image).url()}
                alt={post.title ?? ''}
                width={1400}
                height={788}
                sizes="100vw"
                priority
                className="h-full w-full object-cover contrast-105 grayscale-15"
              />
            </div>
          </div>
        </FadeYAnimation>
      )}

      {/* Header */}
      <div className="content feature">
        <FadeYAnimation yStartValue={20} duration={0.7} delay={0.1}>
          <div className="text-muted-foreground mb-6 flex items-center gap-4 text-xs font-medium tracking-wider uppercase">
            {post.date && <time>{formatDate('long', post.date)}</time>}
            <span className="bg-border inline-block h-px w-5" />
            <span>{readTime(post.wordCount)} min read</span>
          </div>
          <h1 className="text-foreground mb-2 font-serif text-4xl leading-tight font-black tracking-tight md:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-muted-foreground mb-6 font-serif text-xl leading-snug font-normal tracking-tight md:text-2xl">
              {post.subtitle}
            </p>
          )}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug}`}
                  className="bg-primary text-primary-foreground border-primary shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-opacity hover:opacity-80"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}
        </FadeYAnimation>
      </div>

      {/* Body */}
      <div className="content">
        <article className={cn(hasHeadings ? '' : 'mx-auto max-w-3xl')}>
          <FadeYAnimation yStartValue={20} duration={0.7} delay={0.2}>
            <div className="border-border my-10 border-y py-12 font-serif text-xl leading-normal md:my-12 md:py-12 lg:text-3xl">
              <p className="text-primary mb-2 text-xs font-semibold tracking-[0.2em] uppercase">
                TL;DR
              </p>
              <p className="text-muted-foreground text-xl leading-relaxed lg:text-2xl">
                {post.excerpt}
              </p>
            </div>
            <div className="flex flex-col gap-12 lg:flex-row-reverse">
              {hasHeadings && (
                <aside className="col-span-1">
                  <nav className="bg-muted/50 sticky top-6 mb-6 rounded-lg p-5">
                    <Toc posts={post} />
                  </nav>
                </aside>
              )}
              <div className="mr-auto ml-0 max-w-2xl">
                <CustomPortableText
                  value={post.content as PortableTextBlock[]}
                />
              </div>
            </div>
          </FadeYAnimation>
        </article>
      </div>
    </div>
  )
}

export default Post
