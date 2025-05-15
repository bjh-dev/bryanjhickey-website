import { PostListSection } from '@/components/sections/types'

import React from 'react'
import { Card, CardContent } from '../ui/card'
import Link from 'next/link'
import ReadTime from '../modules/ReadTime'
import { getDocumentLink } from '@/lib/links'
import { urlForImage } from '@/lib/sanity/client/image'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'

export default function PostList({ section }: { section: PostListSection }) {
  const featuredPost = section.posts
    .slice() // shallow copy to avoid mutating original
    .reverse() // reverse to get latest first
    .find((post) => post.isFeatured)

  const isShowMore = section.numberOfPosts
    ? section.posts.length > section.numberOfPosts + 1 &&
      (section.numberOfPosts ?? 4)
    : false

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
              <p className="text-foreground/60 font-serif">
                {section.description}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 py-8">
          {featuredPost && (
            <Link
              key={featuredPost._id}
              className="group col-span-1 items-stretch rounded-xl md:col-span-2 lg:col-span-4"
              href={getDocumentLink({
                slug: featuredPost.slug,
                _type: 'post',
              })}
            >
              <Card className="group-hover:bg-accent/60 group-hover:border-primary border-border relative h-full border p-0 shadow-none transition-all">
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
                    <h3 className="font-serif text-xl font-bold lg:text-2xl">
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
                    <p className="text-foreground/60 font-serif lg:text-lg">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-4">
          {section.posts
            .filter((post) => !post.isFeatured) // Exclude posts with isFeatured === true
            .slice(0, section.numberOfPosts ?? 4) // Limit the array to the numberOfPosts
            .map((post) => {
              return (
                <Link
                  key={post._id}
                  className="group border-border hover:border-primary col-span-1 items-stretch overflow-hidden rounded-xl border md:col-span-2"
                  href={getDocumentLink({
                    slug: post.slug,
                    _type: 'post',
                  })}
                >
                  <Card className="group-hover:bg-accent/60 relative h-full border-none p-0 transition-all">
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
                          <span className="text-sm text-gray-500">
                            &#10013;
                          </span>
                          <ReadTime
                            wordCount={post.wordCount}
                            className="text-xs"
                          />
                        </div>
                        <h3 className="font-serif text-lg lg:font-bold">
                          {post.title}
                        </h3>
                        <p className="text-foreground/60 line-clamp-4 font-serif text-sm leading-relaxed lg:text-base">
                          {post.excerpt}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
        </div>
        {isShowMore && (
          <div className="flex w-full justify-end py-12">
            <Button asChild variant="link">
              <Link
                className="text-primary flex items-center gap-4"
                href="/posts"
              >
                More Posts
                <FaArrowRight />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
