import ReadTime from '@/components/modules/ReadTime'
import { PostListSection } from '@/components/sections/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getDocumentLink } from '@/lib/links'
import { urlForImage } from '@/lib/sanity/client/image'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function PostList({ section }: { section: PostListSection }) {
  console.log('PostList section', section)
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
        <div className="grid grid-cols-1 gap-4 py-12 md:grid-cols-2 lg:grid-cols-4">
          {section.posts.map((post) => {
            if (post.isFeatured) {
              return (
                <div
                  key={post._id}
                  className="col-span-1 overflow-hidden rounded-xl md:col-span-2 lg:col-span-4"
                >
                  <Card className="p-0">
                    <CardContent className="flex flex-col p-0 lg:grid lg:grid-cols-3">
                      <div className="relative col-span-1 h-[40svh] lg:h-auto">
                        <Image
                          src={post.image ? urlForImage(post.image).url() : ''}
                          alt={post.title}
                          fill
                          priority
                          sizes="100vw"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="col-span-2 flex flex-col gap-4 p-6 lg:p-12">
                        <h3 className="font-serif text-3xl">{post.title}</h3>
                        <div className="flex gap-4">
                          {post.date ? (
                            <time className="text-sm text-gray-500">
                              {new Date(post.date).toLocaleDateString()}
                            </time>
                          ) : null}
                          <ReadTime wordCount={post.wordCount} />
                        </div>
                        <p className="text-foreground/80 font-serif text-lg">
                          {post.excerpt}
                        </p>
                        <div>
                          <Button asChild variant="outline">
                            <Link
                              href={getDocumentLink({
                                slug: post.slug,
                                _type: 'post',
                              })}
                            >
                              Read More
                              <ArrowRight className="text-primary" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            }
            return (
              <div key={post._id} className="rounded-lg border p-4">
                <h3>{post.title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
