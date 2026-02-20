'use client'

import { ElementType } from 'react'
import { useOptimistic } from 'next-sanity/hooks'
import { type SanityDocument } from 'next-sanity'
import { dataAttr } from '@/lib/sanity/client/utils'
import BookReviews from '@/components/sections/BookReviews'
import Hero from '@/components/sections/Hero'
import { Section, Sections } from '@/components/sections/types'
import PostList from '@/components/sections/PostList'
import Subscribe from '@/components/sections/Subscribe'
import TextColumn from '@/components/sections/TextColumn'

type PageSectionstype = Section['_type']

const SECTION_COMPONENTS: Record<PageSectionstype, ElementType> = {
  bookReviews: BookReviews,
  hero: Hero,
  postList: PostList,
  subscribe: Subscribe,
  textColumn: TextColumn,
} as const

type PageSectionsProps = {
  documentId: string
  documentType: string
  sections?: Sections
}

type PageData = SanityDocument<{
  pageSections?: Sections
}>

export default function PageSections({
  documentId,
  documentType,
  sections: initialSections = [],
}: PageSectionsProps) {
  const sections = useOptimistic<Sections, PageData>(
    initialSections ?? [],
    (currentSections, action) => {
      if (action.id !== documentId || !action?.document?.pageSections) {
        return currentSections
      }

      return action.document.pageSections.map(
        (section) =>
          currentSections?.find(
            (currentSection) => currentSection._key === section?._key,
          ) || section,
      )
    },
  )

  if (!sections?.length) {
    return null
  }

  return (
    <div
      data-sanity={dataAttr({
        id: documentId,
        type: documentType,
        path: 'pageSections',
      })}
    >
      {sections?.map((section) => {
        const { _key, _type, ...sectionProps } = section
        const SectionComponent = SECTION_COMPONENTS[_type]

        if (!SectionComponent) {
          return (
            <div
              key={_key}
              className="text-muted-foreground bg-muted my-8 flex items-center justify-center rounded-lg p-8 text-center"
            >
              Component not found for block type: <code>{_type}</code>
            </div>
          )
        }

        return (
          <div
            key={_key}
            data-sanity={dataAttr({
              id: documentId,
              type: documentType,
              path: `pageSections[_key=="${_key}"]`,
            })}
          >
            <SectionComponent section={sectionProps} />
          </div>
        )
      })}
    </div>
  )
}
