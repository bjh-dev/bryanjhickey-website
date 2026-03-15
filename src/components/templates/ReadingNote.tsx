import type { PortableTextBlock } from 'next-sanity'
import React from 'react'
import Image from 'next/image'
import FadeYAnimation from '@/components/animations/FadeYAnimation'
import CustomPortableText from '@/components/modules/PortableText'
import Toc from '@/components/modules/Toc'
import { urlForImage } from '@/lib/sanity/client/image'
import { formatDate, readTime } from '@/utils/strings'
import { cn } from '@/lib/utils'
import type { ReadingNoteQueryResult } from '@/types/sanity.types'

const SOURCE_TYPE_LABELS: Record<string, string> = {
  book: 'Book',
  editedBook: 'Edited Book',
  journalArticle: 'Journal Article',
  chapterInEditedBook: 'Chapter in Edited Book',
  thesis: 'Thesis',
  report: 'Report',
}

type Props = {
  readingNote: NonNullable<ReadingNoteQueryResult>
}

const ReadingNote = ({ readingNote }: Props) => {
  const hasHeadings = readingNote.headings && readingNote.headings.length > 0
  const sourceType = readingNote.sourceType ?? 'book'
  return (
    <div className="py-24">
      {/* Cover image */}
      {readingNote.image?.asset?._ref && (
        <FadeYAnimation yStartValue={24} duration={0.8}>
          <div className="content feature mb-10">
            <div className="aspect-20/8 overflow-hidden">
              <Image
                src={urlForImage(readingNote.image).url()}
                alt={readingNote.title ?? ''}
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
            {readingNote.date && (
              <time>{formatDate('long', readingNote.date)}</time>
            )}
            <span className="bg-border inline-block h-px w-5" />
            <span>{readTime(readingNote.wordCount)} min read</span>
          </div>
          <h1 className="text-foreground mb-2 font-serif text-4xl leading-tight font-black tracking-tight md:text-5xl lg:text-6xl">
            {readingNote.title}
          </h1>
        </FadeYAnimation>

        {/* Publication details card */}
        <FadeYAnimation yStartValue={20} duration={0.7} delay={0.15}>
          <div className="mb-8">
            <p className="text-primary mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
              {SOURCE_TYPE_LABELS[sourceType] ?? 'Publication Details'}
            </p>
            <div className="bg-muted/50 rounded-lg p-6">
              <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground font-medium">Title</dt>
                  <dd className="text-foreground font-serif text-lg">
                    {readingNote.bookTitle}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground font-medium">
                    {sourceType === 'editedBook' ? 'Editor' : 'Author'}
                  </dt>
                  <dd className="text-foreground font-serif text-lg">
                    {readingNote.bookAuthor}
                  </dd>
                </div>
                {readingNote.publisher && (
                  <div>
                    <dt className="text-muted-foreground font-medium">
                      Publisher
                    </dt>
                    <dd className="text-foreground">{readingNote.publisher}</dd>
                  </div>
                )}
                {readingNote.yearPublished && (
                  <div>
                    <dt className="text-muted-foreground font-medium">
                      Year Published
                    </dt>
                    <dd className="text-foreground">
                      {readingNote.yearPublished}
                    </dd>
                  </div>
                )}
                {/* Journal Article fields */}
                {readingNote.journalName && (
                  <div>
                    <dt className="text-muted-foreground font-medium">
                      Journal
                    </dt>
                    <dd className="text-foreground">
                      {readingNote.journalName}
                    </dd>
                  </div>
                )}
                {(readingNote.volume || readingNote.issue) && (
                  <div>
                    <dt className="text-muted-foreground font-medium">
                      Volume / Issue
                    </dt>
                    <dd className="text-foreground">
                      {[readingNote.volume, readingNote.issue]
                        .filter(Boolean)
                        .join(', ')}
                    </dd>
                  </div>
                )}
                {/* Chapter in Edited Book fields */}
                {readingNote.parentBookTitle && (
                  <div>
                    <dt className="text-muted-foreground font-medium">In</dt>
                    <dd className="text-foreground italic">
                      {readingNote.parentBookTitle}
                    </dd>
                  </div>
                )}
                {readingNote.editors && (
                  <div>
                    <dt className="text-muted-foreground font-medium">
                      Edited by
                    </dt>
                    <dd className="text-foreground">{readingNote.editors}</dd>
                  </div>
                )}
                {/* Shared: pages, DOI */}
                {readingNote.pages && (
                  <div>
                    <dt className="text-muted-foreground font-medium">Pages</dt>
                    <dd className="text-foreground">{readingNote.pages}</dd>
                  </div>
                )}
                {readingNote.doi && (
                  <div>
                    <dt className="text-muted-foreground font-medium">DOI</dt>
                    <dd className="text-foreground">
                      <a
                        href={`https://doi.org/${readingNote.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {readingNote.doi}
                      </a>
                    </dd>
                  </div>
                )}
                {/* Thesis / Report fields */}
                {readingNote.institution && (
                  <div>
                    <dt className="text-muted-foreground font-medium">
                      Institution
                    </dt>
                    <dd className="text-foreground">
                      {readingNote.institution}
                    </dd>
                  </div>
                )}
                {readingNote.thesisType && (
                  <div>
                    <dt className="text-muted-foreground font-medium">Type</dt>
                    <dd className="text-foreground">
                      {readingNote.thesisType}
                    </dd>
                  </div>
                )}
                {readingNote.reportNumber && (
                  <div>
                    <dt className="text-muted-foreground font-medium">
                      Report No.
                    </dt>
                    <dd className="text-foreground">
                      {readingNote.reportNumber}
                    </dd>
                  </div>
                )}
              </dl>
              {readingNote.amazonLink && (
                <div className="mt-4">
                  <a
                    href={readingNote.amazonLink}
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
                {readingNote.excerpt}
              </p>
            </div>
            <div className="flex flex-col gap-12 lg:flex-row-reverse">
              {hasHeadings && (
                <aside className="col-span-1">
                  <nav className="bg-muted/50 sticky top-6 mb-6 rounded-lg p-5">
                    <Toc posts={readingNote} />
                  </nav>
                </aside>
              )}

              <div className="max-w-prose-lg mr-auto ml-0 flex-1">
                <CustomPortableText
                  value={readingNote.content as PortableTextBlock[]}
                  paragraphStyles="prose !text-xl leading-relaxed text-foreground lg:!text-xl"
                />
              </div>
            </div>
          </FadeYAnimation>
        </article>
      </div>
    </div>
  )
}

export default ReadingNote
