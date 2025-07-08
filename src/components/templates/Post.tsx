import Byline from '@/components/modules/Byline'
import CoverImage from '@/components/modules/CoverImage'
import CustomPortableText from '@/components/modules/PortableText'
import Toc from '@/components/modules/Toc'
import { PostQueryResult } from '@/types/sanity.types'
import type { PortableTextBlock } from 'next-sanity'
import React from 'react'

type Props = {
  post: NonNullable<PostQueryResult>
}

const Post = ({ post }: Props) => {
  // Map headings to the expected type for Toc, ensuring children is always an array of objects with a text property (no undefined)
  const safeHeadings = Array.isArray(post.headings)
    ? post.headings
        .filter((h) => h && Array.isArray(h.children) && h.children[0]?.text)
        .map((h) => ({
          _key: h._key,
          children: (h.children ?? [])
            .filter((c) => typeof c.text === 'string')
            .map((c) => ({ text: c.text as string })),
        }))
    : []
  return (
    <div className="content mt-16 px-4 py-16">
      {post.image?.asset?._ref ? (
        <div className="mb-6 md:mb-14">
          <CoverImage image={post.image} priority />
        </div>
      ) : null}
      <div className="">
        <article className="grid grid-cols-4 gap-12">
          <aside className="col-span-1">
            <nav className="bg-foreground/5 sticky top-6 mb-6 rounded-lg p-5">
              <Toc headings={safeHeadings} />
            </nav>
          </aside>
          <section className="col-span-3">
            <h1 className="mb-6 font-serif text-3xl leading-12 tracking-tight md:text-5xl lg:leading-16">
              {post.title}
            </h1>
            {post.author ? (
              <div className="mb-6">
                <Byline post={post} />
              </div>
            ) : null}

            <div className="my-12 border-y py-12 font-serif text-xl leading-normal lg:text-3xl">
              <p className="text-primary mb-2 font-mono text-xs">TL;DR</p>
              <p className="text-foreground/50 text-xl leading-relaxed lg:text-2xl">
                {post.excerpt}
              </p>
            </div>

            <CustomPortableText value={post.content as PortableTextBlock[]} />
          </section>
        </article>
      </div>
    </div>
  )
}

export default Post
