// src/components/Post.tsx

import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/client/image'
import { POST_QUERYResult } from '@/types/sanity.types'
import { CustomPortableTextComponents } from '@/studio/schema/objects/blockContentComponents'
import { RelatedPosts } from '@/components/RelatedPosts'

export function Post({ post }: { post: NonNullable<POST_QUERYResult> }) {
  const { _id, _type, title, mainImage, body, relatedPosts } = post

  return (
    <main className="prose prose-lg container mx-auto p-4">
      {title ? (
        <h1 className="my-8 font-serif text-6xl font-medium">{title}</h1>
      ) : null}
      {mainImage?.asset?._ref ? (
        <Image
          className="float-left m-0 mr-4 w-1/3 rounded-lg"
          src={urlFor(mainImage?.asset?._ref).width(300).height(300).url()}
          width={300}
          height={300}
          alt={title ?? ''}
        />
      ) : null}
      {body ? (
        <PortableText value={body} components={CustomPortableTextComponents} />
      ) : null}
      {relatedPosts ? (
        <RelatedPosts
          relatedPosts={relatedPosts}
          documentId={_id}
          documentType={_type}
        />
      ) : null}
      <hr />
      <Link href="/">&larr; Return home</Link>
    </main>
  )
}
