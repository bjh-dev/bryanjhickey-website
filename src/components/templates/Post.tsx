import Byline from '@/components/modules/Byline'
import CoverImage from '@/components/modules/CoverImage'
import CustomPortableText from '@/components/modules/PortableText'
import Toc from '@/components/modules/Toc'
import { cn } from '@/lib/utils'
import { PostQueryResult } from '@/types/sanity.types'
import type { PortableTextBlock } from 'next-sanity'
import React from 'react'

type Props = {
  post: NonNullable<PostQueryResult>
}

const Post = ({ post }: Props) => {
  const hasHeadings = post.headings && post.headings.length > 0
  return (
    <div className="content mt-16 py-16">
      {post.image?.asset?._ref ? (
        <div className="feature mb-6 md:mb-14">
          <CoverImage image={post.image} priority />
        </div>
      ) : null}
      <div className="flex gap-12">
        <article
          className={cn(
            hasHeadings ? 'content' : 'mx-auto flex max-w-3xl flex-col gap-12',
          )}
        >
          <section className="col-span-3">
            <h1 className="mb-6 font-serif text-3xl leading-12 font-medium tracking-tight md:text-6xl md:leading-20">
              {post.title}
            </h1>
            {post.author ? (
              <div className="mb-6">
                <Byline post={post} />
              </div>
            ) : null}

            <div className="my-12 border-y py-12 font-serif text-xl leading-normal lg:text-3xl">
              <p className="text-primary mb-2 font-mono">TL;DR</p>
              <p className="text-foreground/60 text-xl leading-relaxed lg:text-2xl">
                {post.excerpt}
              </p>
            </div>
            <div className="flex flex-col gap-12 lg:flex-row-reverse">
              {hasHeadings && (
                <aside className="col-span-1">
                  <nav className="bg-foreground/5 sticky top-6 mb-6 rounded-lg p-5">
                    <Toc posts={post} />
                  </nav>
                </aside>
              )}
              <div className="max-w-prose">
                <CustomPortableText
                  value={post.content as PortableTextBlock[]}
                />
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  )
}

export default Post
