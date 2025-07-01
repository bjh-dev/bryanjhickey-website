import { ArchivePagination } from '@/components/modules/ArchivePagination'
import { PostFeaturedCard } from '@/components/modules/PostFeaturedCard'
import { PostsArchiveQueryResult } from '@/types/sanity.types'
import React from 'react'

type Props = {
  listingData: NonNullable<PostsArchiveQueryResult>
  currentPage?: number
  totalPages?: number
  title?: string
  paginationBase?: string
}

const PostRiver = ({
  listingData,
  currentPage = 1,
  paginationBase = '/blog',
  totalPages = 1,
}: Props) => {
  const { results } = listingData

  return (
    <>
      <div className="grid grid-cols-1 gap-10">
        {results.map((post) => {
          // @ts-expect-error Type mismatch, but this is a Post type
          return <PostFeaturedCard key={post._id} {...post} />
        })}
      </div>
      <ArchivePagination
        currentPage={currentPage}
        linkBase={paginationBase}
        totalPages={totalPages}
      />
    </>
  )
}

export default PostRiver
