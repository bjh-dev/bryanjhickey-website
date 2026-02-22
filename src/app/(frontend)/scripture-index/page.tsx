import { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client/live'
import { scriptureIndexQuery } from '@/lib/sanity/queries/queries'
import {
  extractBookFromReference,
  sortByBibleOrder,
  formatDate,
} from '@/utils/strings'

export const metadata: Metadata = {
  title: 'Scripture Index',
  description:
    'All Bible passages referenced across my writing, organised by book.',
  alternates: { canonical: '/scripture-index' },
}

type Ref = { reference: string | null; label: string | null }

type PostWithRefs = {
  title: string | null
  slug: string | null
  date: string | null
  refs: Ref[]
}

type BookGroup = {
  book: string
  entries: Array<{
    reference: string
    posts: Array<{ title: string; slug: string; date: string | null }>
  }>
}

function groupRefsByBook(posts: PostWithRefs[]): BookGroup[] {
  const map = new Map<string, Map<string, PostWithRefs[]>>()

  for (const post of posts) {
    for (const ref of post.refs) {
      if (!ref.reference || !post.slug || !post.title) continue
      const book = extractBookFromReference(ref.reference)
      if (!map.has(book)) map.set(book, new Map())
      const refMap = map.get(book)!
      if (!refMap.has(ref.reference)) refMap.set(ref.reference, [])
      refMap.get(ref.reference)!.push(post)
    }
  }

  const books = Array.from(map.keys()).sort(sortByBibleOrder)

  return books.map((book) => {
    const refMap = map.get(book)!
    const entries = Array.from(refMap.entries()).map(([reference, posts]) => ({
      reference,
      posts: posts.map((p) => ({
        title: p.title!,
        slug: p.slug!,
        date: p.date,
      })),
    }))
    return { book, entries }
  })
}

export default async function ScriptureIndexPage() {
  const { data: posts } = await sanityFetch({ query: scriptureIndexQuery })

  const grouped = posts ? groupRefsByBook(posts as PostWithRefs[]) : []

  return (
    <section className="py-24">
      <div className="content feature">
        <div className="border-border mb-16 border-b pb-10">
          <p className="text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
            Reference
          </p>
          <h1 className="text-foreground font-serif text-5xl font-black tracking-tight lg:text-7xl">
            Scripture Index
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-lg leading-relaxed font-light">
            All Bible passages referenced across my writing, organised by book.
          </p>
        </div>

        {grouped.length === 0 && (
          <p className="text-muted-foreground py-12 text-center text-lg">
            No scripture references found yet.
          </p>
        )}

        <div className="space-y-16">
          {grouped.map(({ book, entries }) => (
            <div key={book}>
              <h2 className="text-foreground border-border mb-6 border-b pb-3 font-serif text-2xl font-bold">
                {book}
              </h2>
              <div className="space-y-6">
                {entries.map(({ reference, posts }) => (
                  <div
                    key={reference}
                    className="grid gap-2 lg:grid-cols-[240px_1fr]"
                  >
                    <p className="text-primary text-sm font-semibold">
                      {reference}
                    </p>
                    <ul className="space-y-1">
                      {posts.map((post) => (
                        <li key={post.slug}>
                          <Link
                            href={`/posts/${post.slug}`}
                            className="text-foreground hover:text-primary text-sm underline-offset-2 transition-colors hover:underline"
                          >
                            {post.title}
                          </Link>
                          {post.date && (
                            <span className="text-muted-foreground ms-2 text-xs">
                              {formatDate('short', post.date)}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
