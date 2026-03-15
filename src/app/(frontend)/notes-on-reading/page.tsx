import { sanityFetch } from '@/lib/sanity/client/live'
import { readingNotesArchiveQuery } from '@/lib/sanity/queries/queries'
import { ReadingNoteCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'
import { getDocumentLink } from '@/lib/links'
import { formatDate, readTime } from '@/utils/strings'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import FadeYAnimation from '@/components/animations/FadeYAnimation'
import { cn } from '@/lib/utils'

const NOTES_PER_PAGE = 12

const SOURCE_TYPE_LABELS: Record<string, string> = {
  book: 'Book',
  editedBook: 'Edited Book',
  journalArticle: 'Journal Article',
  chapterInEditedBook: 'Chapter',
  thesis: 'Thesis',
  report: 'Report',
}

type NoteType = ReadingNoteCardFragmentType

type Props = {
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Notes on Reading',
    alternates: { canonical: '/notes-on-reading' },
  }
}

/* ─── Note card ───────────────────────────────── */

function NoteCard({ note, index }: { note: NoteType; index: number }) {
  return (
    <FadeYAnimation
      className="h-full"
      yStartValue={20}
      duration={0.7}
      delay={0.05 * index}
    >
      <Link
        href={getDocumentLink({ slug: note.slug, _type: 'bookReview' })}
        className="group block h-full"
      >
        <div className="text-muted-foreground flex items-center gap-4 text-xs font-medium tracking-wider uppercase">
          <span className="text-primary">
            {SOURCE_TYPE_LABELS[note.sourceType ?? 'book'] ?? 'Book'}
          </span>
          <span className="bg-border inline-block h-px w-5" />
          {note.date && <time>{formatDate('long', note.date)}</time>}
          <span className="bg-border inline-block h-px w-5" />
          <span>{readTime(note.wordCount)} min read</span>
        </div>
        <h3 className="text-foreground group-hover:text-primary mt-3 mb-1.5 font-serif text-xl leading-snug font-bold transition-colors duration-300">
          {note.bookTitle}
        </h3>
        {note.bookAuthor && (
          <p className="text-muted-foreground mb-2 text-sm font-medium">
            by {note.bookAuthor}
          </p>
        )}
        {note.excerpt && (
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed font-light">
            {note.excerpt}
          </p>
        )}
      </Link>
    </FadeYAnimation>
  )
}

/* ─── Pagination ───────────────────────────────── */

function NotesPagination({
  currentPage,
  totalPages,
  totalNotes,
  notesOnPage,
}: {
  currentPage: number
  totalPages: number
  totalNotes: number
  notesOnPage: number
}) {
  if (totalPages <= 1) return null

  const buildHref = (page: number) => {
    if (page > 1) return `/notes-on-reading?page=${page}`
    return '/notes-on-reading'
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
        Showing {notesOnPage} of {totalNotes} notes
      </p>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────── */

export default async function ReadingNotesPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)

  const from = (currentPage - 1) * NOTES_PER_PAGE
  const to = from + NOTES_PER_PAGE - 1

  const { data: archiveData } = await sanityFetch({
    query: readingNotesArchiveQuery,
    params: { from, to },
  })

  if (!archiveData) notFound()

  const notes = archiveData.results
  const totalPages = Math.ceil(archiveData.total / NOTES_PER_PAGE)

  if (notes.length === 0) {
    return (
      <section className="py-48">
        <div className="content feature">
          <div className="border-border mb-10 grid items-end gap-4 border-b pb-10 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
                Notes on Reading
              </p>
              <h1 className="text-foreground font-serif text-5xl leading-none font-black tracking-tight lg:text-7xl">
                Notes on reading{' '}
                <em className="text-primary font-normal italic">
                  and reflection
                </em>
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground py-24 text-center text-lg font-light">
            No reading notes found.
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
              Notes on Reading
            </p>
            <h1 className="text-foreground font-serif text-5xl leading-none font-black tracking-tight lg:text-7xl">
              Notes on reading{' '}
              <em className="text-primary font-normal italic">
                and reflection
              </em>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md self-end pb-1 text-lg leading-relaxed font-light">
            Reviews and reflections on books, journal articles, theses, and
            other works covering theology, philosophy, and biblical studies.
          </p>
        </div>

        {/* Note Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note, i) => (
            <NoteCard key={note._id} note={note} index={i} />
          ))}
        </div>

        {/* Pagination */}
        <NotesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalNotes={archiveData.total}
          notesOnPage={notes.length}
        />
      </div>
    </section>
  )
}
