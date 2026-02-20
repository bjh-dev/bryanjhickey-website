import {
  GetPageQueryResult,
  PostQueryResult,
  PostsArchiveQueryResult,
  BookReviewQueryResult,
  BookReviewsArchiveQueryResult,
} from '@/types/sanity.types'

export type PostCardFragmentType = NonNullable<
  PostsArchiveQueryResult['results'][number]
>
export type PostFragmentType = NonNullable<PostQueryResult>
export type PersonFragmentType = NonNullable<PostFragmentType['author']>

export type BookReviewCardFragmentType = NonNullable<
  BookReviewsArchiveQueryResult['results'][number]
>
export type BookReviewFragmentType = NonNullable<BookReviewQueryResult>
export type CategoryFragmentType = NonNullable<
  PostFragmentType['categories']
>[number]

export type PageFragmentType = NonNullable<GetPageQueryResult>
export type SeoFragmentType = NonNullable<PageFragmentType['seo']>
export type SectionsType = NonNullable<PageFragmentType['pageSections']>[number]

export type CardGridsSectionFragmentType = Extract<
  NonNullable<SectionsType>,
  { _type: 'cardGrid' }
>
export type CtaSectionFragmentType = Extract<
  NonNullable<SectionsType>,
  { _type: 'cta' }
>
export type DividerSectionFragmentType = Extract<
  NonNullable<SectionsType>,
  { _type: 'divider' }
>
export type HeroSectionFragmentType = Extract<
  NonNullable<SectionsType>,
  { _type: 'hero' }
>
export type MediaTextSectionFragmentType = Extract<
  NonNullable<SectionsType>,
  { _type: 'mediaText' }
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
