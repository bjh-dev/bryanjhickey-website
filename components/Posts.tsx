// src/components/Posts.tsx

import { POSTS_QUERYResult } from '@/sanity.types'

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <section className="bg-gray-200 py-24 dark:bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold">Recent Posts</h2>
        <ul className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
          {posts.map((post) => (
            <li key={post._id}>
              <a
                className="block p-4 hover:bg-blue-50"
                href={`/posts/${post?.slug?.current}`}
              >
                {post?.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
