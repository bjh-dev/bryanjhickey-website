import type { PortableTextBlock } from 'next-sanity'
import React from 'react'
import FadeXAnimation from '@/components/animations/FadeXAnimation'
import CoverImage from '@/components/modules/CoverImage'
import CustomPortableText from '@/components/modules/PortableText'
import Toc from '@/components/modules/Toc'
import ReadTime from '@/components/modules/ReadTime'
import DateComponent from '@/components/ui/Date'
import { cn } from '@/lib/utils'
import type { BookReviewQueryResult } from '@/types/sanity.types'

type Props = {
  bookReview: NonNullable<BookReviewQueryResult>
}

const BookReview = ({ bookReview }: Props) => {
  const hasHeadings = bookReview.headings && bookReview.headings.length > 0
  return (
    <div className="content mt-12 py-16">
      {bookReview.image?.asset?._ref ? (
        <FadeXAnimation>
          <div className="mb-6 md:mb-14">
            <CoverImage image={bookReview.image} priority />
          </div>
        </FadeXAnimation>
      ) : null}
      <div className="flex gap-12">
        <article
          className={cn(
            hasHeadings ? '' : 'mx-auto flex max-w-3xl flex-col gap-12',
          )}
        >
          <section className="col-span-3">
            <FadeXAnimation delay={0.5}>
              <h1 className="mb-6 font-serif text-4xl leading-10 font-medium tracking-tight md:text-6xl md:leading-20">
                {bookReview.title}
              </h1>
            </FadeXAnimation>

            <FadeXAnimation delay={1}>
              <div className="mb-6">
                <div className="bg-muted/50 rounded-lg p-6">
                  <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-muted-foreground font-medium">
                        Book
                      </dt>
                      <dd className="text-foreground font-serif text-lg">
                        {bookReview.bookTitle}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">
                        Author
                      </dt>
                      <dd className="text-foreground font-serif text-lg">
                        {bookReview.bookAuthor}
                      </dd>
                    </div>
                    {bookReview.publisher && (
                      <div>
                        <dt className="text-muted-foreground font-medium">
                          Publisher
                        </dt>
                        <dd className="text-foreground">
                          {bookReview.publisher}
                        </dd>
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
            </FadeXAnimation>

            <FadeXAnimation delay={1}>
              <div className="grid grid-cols-1 items-start justify-between gap-4 text-sm md:grid-cols-2">
                <div className="flex flex-col items-start justify-start gap-2">
                  {!!bookReview.wordCount && (
                    <ReadTime wordCount={bookReview.wordCount} />
                  )}
                  {bookReview.date && (
                    <div className="text-foreground/50">
                      First Published:{' '}
                      <DateComponent dateString={bookReview.date} />
                    </div>
                  )}
                  {bookReview._updatedAt && (
                    <div className="text-foreground/50">
                      Last Edited:{' '}
                      <DateComponent dateString={bookReview._updatedAt} />
                    </div>
                  )}
                </div>
              </div>
            </FadeXAnimation>

            <FadeXAnimation delay={1.5}>
              <div className="my-10 border-y py-12 font-serif text-xl leading-normal md:my-12 md:py-12 lg:text-3xl">
                <p className="text-primary mb-2 font-mono">TL;DR</p>
                <p className="text-foreground/60 text-xl leading-relaxed lg:text-2xl">
                  {bookReview.excerpt}
                </p>
              </div>
              <div className="flex flex-col gap-12 lg:flex-row-reverse">
                {hasHeadings && (
                  <aside className="col-span-1">
                    <nav className="bg-foreground/5 sticky top-6 mb-6 rounded-lg p-5">
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
            </FadeXAnimation>
          </section>
        </article>
      </div>
    </div>
  )
}

export default BookReview
