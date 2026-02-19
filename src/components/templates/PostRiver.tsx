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
      {results.map((post) => {
        return <PostFeaturedCard key={post._id} {...post} />
      })}

      <ArchivePagination
        currentPage={currentPage}
        linkBase={paginationBase}
        totalPages={totalPages}
      />
    </>
  )
}

export default PostRiver
