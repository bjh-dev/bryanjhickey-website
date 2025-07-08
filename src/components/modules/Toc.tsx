import { PostQueryResult } from '@/types/sanity.types'
import { slugify } from '@/utils/strings'
import React from 'react'

export default function Toc({
  posts,
}: {
  posts: NonNullable<PostQueryResult>
}) {
  return (
    <div>
      <h2 className="mb-5 text-xl font-bold">Contents</h2>
      <nav>
        <ul>
          {posts.headings &&
            posts.headings?.map((heading) => (
              <li key={heading?._key} className="mb-2 text-sm">
                <a
                  className="decoration-primary decoration-2 underline-offset-2 hover:underline"
                  href={
                    heading.children && heading.children[0]?.text
                      ? `#${slugify(heading.children[0].text)}`
                      : '#'
                  }
                >
                  {heading.children && heading.children[0]?.text
                    ? heading.children[0].text
                    : ''}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  )
}
