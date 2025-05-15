import Byline from '@/components/modules/Byline'
import CoverImage from '@/components/modules/CoverImage'
import CustomPortableText from '@/components/modules/PortableText'
import { PostQueryResult } from '@/types/sanity.types'
import type { PortableTextBlock } from 'next-sanity'
import React from 'react'

type Props = {
  post: NonNullable<PostQueryResult>
}

const Post = ({ post }: Props) => {
  return (
    <div className="mx-auto mt-16 max-w-5xl px-4 py-16">
      {post.image?.asset?._ref ? (
        <div className="mb-6 md:mb-14">
          <CoverImage image={post.image} priority />
        </div>
      ) : null}
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-serif text-3xl leading-12 tracking-tight md:text-5xl lg:leading-16">
          {post.title}
        </h1>
        {post.author ? (
          <div className="mb-6">
            <Byline post={post} />
          </div>
        ) : null}

        <div className="text-foreground/70 my-12 border-y py-12 font-serif text-xl leading-normal lg:text-3xl">
          <p className="text-primary mb-2 font-mono text-xs">TL;DR</p>
          <p className="text-foreground/60 text-xl leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <CustomPortableText value={post.content as PortableTextBlock[]} />
      </div>
    </div>
  )
}

export default Post
