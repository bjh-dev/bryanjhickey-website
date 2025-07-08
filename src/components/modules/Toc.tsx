import { slugify } from '@/utils/strings'
import React from 'react'

export default function Toc({
  headings,
}: {
  headings: { _key: string; children: { text: string }[] }[]
}) {
  return (
    <div>
      <h2 className="mb-5 text-xl font-bold">Contents</h2>
      <nav>
        <ul>
          {headings?.map(
            (heading: { _key: string; children: { text: string }[] }) => (
              <li key={heading?._key} className="mb-2 text-sm">
                <a
                  className="decoration-primary decoration-2 underline-offset-2 hover:underline"
                  href={`#${slugify(heading.children[0].text)}`}
                >
                  {heading.children[0].text}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>
    </div>
  )
}
