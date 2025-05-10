import { PostListSection } from '@/components/sections/types'

import React from 'react'
import { Card } from '../ui/card'
import { CardContent } from '../ui/card'
import Link from 'next/link'
import ReadTime from '../modules/ReadTime'
import { getDocumentLink } from '@/lib/links'
import { urlForImage } from '@/lib/sanity/client/image'
import Image from 'next/image'

export default function PostList({ section }: { section: PostListSection }) {
  const featuredPost = section.posts
    .slice() // shallow copy to avoid mutating original
    .reverse() // reverse to get latest first
    .find((post) => post.isFeatured)
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="max-w-xl">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-primary font-medium tracking-wider uppercase">
                {section.title}
              </h2>
              <h3 className="font-serif text-4xl">{section.subtitle}</h3>
            </div>
            <div>
              <p>{section.description}</p>
            </div>
          </div>
        </div>
        <div className="py-12">
          {featuredPost && (
            <Link
              key={featuredPost._id}
              className="group col-span-1 overflow-hidden rounded-xl md:col-span-2 lg:col-span-4"
              href={getDocumentLink({
                slug: featuredPost.slug,
                _type: 'post',
              })}
            >
              <Card className="group-hover:bg-accent/30 group-hover:shadow-primary/30 group-hover:border-primary/30 relative p-0 transition-all">
                {featuredPost.isFeatured && (
                  <div className="bg-primary absolute top-0 right-0 rounded-tr-xl rounded-bl-xs p-2 text-xs font-bold text-black uppercase">
                    Featured
                  </div>
                )}
                <CardContent className="flex flex-col p-0 lg:grid lg:grid-cols-3">
                  <div className="relative col-span-1 h-[40svh] lg:h-auto">
                    <Image
                      src={
                        featuredPost.image
                          ? urlForImage(featuredPost.image).url()
                          : ''
                      }
                      alt={featuredPost.title}
                      fill
                      priority
                      sizes="100vw"
                      className="h-full w-full rounded-t-xl object-cover lg:rounded-t-none lg:rounded-l-xl"
                    />
                  </div>
                  <div className="col-span-2 flex flex-col gap-4 px-8 py-10">
                    <h3 className="font-serif text-xl lg:text-2xl">
                      {featuredPost.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {featuredPost.date ? (
                        <time className="text-sm text-gray-500">
                          {new Date(featuredPost.date).toLocaleDateString(
                            'en-AU',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            },
                          )}
                        </time>
                      ) : null}
                      <span className="text-sm text-gray-500">&#10013;</span>
                      <ReadTime wordCount={featuredPost.wordCount} />
                    </div>
                    <p className="text-foreground/80 font-serif lg:text-lg">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {section.posts.map((post) => {
            return (
              <Link
                key={post._id}
                className="group col-span-1 overflow-hidden rounded-xl md:col-span-2"
                href={getDocumentLink({
                  slug: post.slug,
                  _type: 'post',
                })}
              >
                <Card className="group-hover:bg-accent/30 group-hover:shadow-primary/30 group-hover:border-primary/30 relative p-0 transition-all">
                  <CardContent className="flex flex-col gap-4">
                    <div className="col-span-2 flex flex-col gap-2 px-2 py-10">
                      <div className="flex items-center gap-4">
                        {post.date ? (
                          <time className="text-xs text-gray-500">
                            {new Date(post.date).toLocaleDateString('en-AU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                        ) : null}
                        <span className="text-sm text-gray-500">&#10013;</span>
                        <ReadTime
                          wordCount={post.wordCount}
                          className="text-xs"
                        />
                      </div>
                      <h3 className="font-serif text-lg lg:font-bold">
                        {post.title}
                      </h3>
                      <p className="text-foreground/80 line-clamp-4 font-serif text-base">
                        {post.excerpt}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
