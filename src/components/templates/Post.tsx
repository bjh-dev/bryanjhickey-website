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
    <div className="container mx-auto max-w-5xl pt-5 pb-12 md:pt-8">
      {post.image?.asset?._ref ? (
        <div className="mb-6 md:mb-14">
          <CoverImage image={post.image} priority />
        </div>
      ) : null}
      <h1 className="mb-6 text-3xl font-bold md:text-5xl">{post.title}</h1>
      {post.author ? (
        <div className="mb-6">
          <Byline post={post} />
        </div>
      ) : null}

      <CustomPortableText value={post.content as PortableTextBlock[]} />
    </div>
  )
}

export default Post
