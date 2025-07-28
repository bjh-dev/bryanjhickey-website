import { PostQueryResult } from '@/types/sanity.types'
import { slugify } from '@/utils/strings'
import React, { ReactNode } from 'react'

export default function Toc({
  posts,
}: {
  posts: NonNullable<PostQueryResult>
}) {
  function getHeadingText(children: ReactNode): string {
    if (typeof children === 'string') return children
    if (Array.isArray(children)) return children.join(' ')
    return ''
  }

  return (
    <div>
      <h2 className="mb-5 text-xl font-bold">Contents</h2>
      <nav>
        <ul>
          {posts.headings &&
            posts.headings?.map((heading) => {
              const headingText = getHeadingText(heading.children)
              return (
                <li key={heading?._key} className="mb-2 text-sm">
                  <a
                    className="decoration-primary decoration-2 underline-offset-2 hover:underline"
                    href={slugify(headingText)}
                  >
                    {headingText}
                  </a>
                </li>
              )
            })}
        </ul>
      </nav>
    </div>
  )
}
