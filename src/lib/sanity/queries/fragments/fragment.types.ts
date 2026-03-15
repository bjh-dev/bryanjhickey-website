import {
  GetPageQueryResult,
  PostQueryResult,
  PostsArchiveQueryResult,
  ReadingNoteQueryResult,
  ReadingNotesArchiveQueryResult,
  AllCategoriesQueryResult,
} from '@/types/sanity.types'

export type PostCardFragmentType = NonNullable<
  PostsArchiveQueryResult['results'][number]
>
export type PostFragmentType = NonNullable<PostQueryResult>
export type PersonFragmentType = NonNullable<PostFragmentType['author']>

export type ReadingNoteCardFragmentType = NonNullable<
  ReadingNotesArchiveQueryResult['results'][number]
>
export type ReadingNoteFragmentType = NonNullable<ReadingNoteQueryResult>
export type CategoryFragmentType = NonNullable<
  PostFragmentType['categories']
>[number]

export type CategoryListItemType = NonNullable<AllCategoriesQueryResult[number]>

export type PageFragmentType = NonNullable<GetPageQueryResult>
export type SeoFragmentType = NonNullable<PageFragmentType['seo']>
export type SectionsType = NonNullable<PageFragmentType['pageSections']>[number]

export type HeroSectionFragmentType = Extract<
  NonNullable<SectionsType>,
  { _type: 'hero' }
>
export type PostListSectionFragmentType = Extract<
  NonNullable<SectionsType>,
  { _type: 'postList' }
>
export type SubscribeSectionFragmentType = Extract<
  NonNullable<SectionsType>,
  { _type: 'subscribe' }
>
export type TextColumnSectionFragmentType = Extract<
  NonNullable<SectionsType>,
  { _type: 'textColumn' }
>

export type ButtonFragmentType = NonNullable<
  HeroSectionFragmentType['buttons']
>[number]
export type LinkFragmentType = NonNullable<ButtonFragmentType['link']>
