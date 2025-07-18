import { PostQueryResult } from '@/types/sanity.types'
import { slugify, getHeadingsFromPortableText } from '@/utils/strings'
import React from 'react'
import type { PortableTextBlock } from 'next-sanity'
import { FaArrowRight } from 'react-icons/fa6'

// Portable Text heading block type
interface PortableTextSpan {
  text: string
}

export default function Toc({
  posts,
}: {
  posts: NonNullable<PostQueryResult>
}) {
  // If posts.content is PortableText, extract headings
  const blocks = Array.isArray(posts.content) ? posts.content : []
  const headings = getHeadingsFromPortableText(blocks as PortableTextBlock[])

  return (
    <div>
      <h2 className="mb-5 text-xl font-bold">Contents</h2>
      <nav>
        <ul className="flex flex-col gap-5">
          {headings.map((heading, idx) => {
            // Join all child text for the heading
            const headingText = (heading.children as PortableTextSpan[])
              .map((c) => c.text)
              .join(' ')
            return (
              <li key={heading._key ?? idx} className="text-sm">
                <a
                  className="decoration-primary flex items-center gap-4 decoration-2 underline-offset-2 hover:underline"
                  href={`#${slugify(headingText)}`}
                >
                  <div>
                    <FaArrowRight className="text-primary" />
                  </div>
                  <div>{headingText}</div>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
