import type { PortableTextBlock } from 'next-sanity'
import React from 'react'
import Image from 'next/image'
import FadeYAnimation from '@/components/animations/FadeYAnimation'
import CustomPortableText from '@/components/modules/PortableText'
import Toc from '@/components/modules/Toc'
import { urlForImage } from '@/lib/sanity/client/image'
import { formatDate, readTime } from '@/utils/strings'
import { cn } from '@/lib/utils'
import type { BookReviewQueryResult } from '@/types/sanity.types'

type Props = {
  bookReview: NonNullable<BookReviewQueryResult>
}

const BookReview = ({ bookReview }: Props) => {
  const hasHeadings = bookReview.headings && bookReview.headings.length > 0
  return (
    <div className="py-24">
      {/* Cover image */}
      {bookReview.image?.asset?._ref && (
        <FadeYAnimation yStartValue={24} duration={0.8}>
          <div className="content feature mb-10">
            <div className="aspect-20/8 overflow-hidden">
              <Image
                src={urlForImage(bookReview.image).url()}
                alt={bookReview.title ?? ''}
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
            {bookReview.date && (
              <time>{formatDate('long', bookReview.date)}</time>
            )}
            <span className="bg-border inline-block h-px w-5" />
            <span>{readTime(bookReview.wordCount)} min read</span>
          </div>
          <h1 className="text-foreground mb-2 font-serif text-4xl leading-tight font-black tracking-tight md:text-5xl lg:text-6xl">
            {bookReview.title}
          </h1>
        </FadeYAnimation>

        {/* Book details card */}
        <FadeYAnimation yStartValue={20} duration={0.7} delay={0.15}>
          <div className="mb-8">
            <p className="text-primary mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
              Book Details
            </p>
            <div className="bg-muted/50 rounded-lg p-6">
              <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground font-medium">Book</dt>
                  <dd className="text-foreground font-serif text-lg">
                    {bookReview.bookTitle}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground font-medium">Author</dt>
                  <dd className="text-foreground font-serif text-lg">
                    {bookReview.bookAuthor}
                  </dd>
                </div>
                {bookReview.publisher && (
                  <div>
                    <dt className="text-muted-foreground font-medium">
                      Publisher
                    </dt>
                    <dd className="text-foreground">{bookReview.publisher}</dd>
                  </div>
                )}
                {bookReview.yearPublished && (
                  <div>
                    <dt className="text-muted-foreground font-medium">
                      Year Published
                    </dt>
                    <dd className="text-foreground">
                      {bookReview.yearPublished}
                    </dd>
                  </div>
                )}
              </dl>
              {bookReview.amazonLink && (
                <div className="mt-4">
                  <a
                    href={bookReview.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
                  >
                    View on Amazon &rarr;
                  </a>
                </div>
              )}
            </div>
          </div>
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
                {bookReview.excerpt}
              </p>
            </div>
            <div className="flex flex-col gap-12 lg:flex-row-reverse">
              {hasHeadings && (
                <aside className="col-span-1">
                  <nav className="bg-muted/50 sticky top-6 mb-6 rounded-lg p-5">
                    <Toc posts={bookReview} />
                  </nav>
                </aside>
              )}
              <div className="mr-auto ml-0 max-w-2xl">
                <CustomPortableText
                  value={bookReview.content as PortableTextBlock[]}
                />
              </div>
            </div>
          </FadeYAnimation>
        </article>
      </div>
    </div>
  )
}

export default BookReview
