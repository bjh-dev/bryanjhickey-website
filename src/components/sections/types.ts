import { GetPageQueryResult } from '@/types/sanity.types'

export type Sections = NonNullable<GetPageQueryResult>['pageSections']

export type Section = NonNullable<Sections>[number]

export type BibleQuoteOfTheDaySection = Extract<
  Section,
  { _type: 'bibleQuoteOfTheDay' }
>
export type BookReviewsSection = Extract<Section, { _type: 'bookReviews' }>
export type HeroSection = Extract<Section, { _type: 'hero' }>
export type PostListSection = Extract<Section, { _type: 'postList' }>
export type ScripturePassageSection = Extract<
  Section,
  { _type: 'scripturePassage' }
>
export type SubscribeSection = Extract<Section, { _type: 'subscribe' }>
export type TextColumnSection = Extract<Section, { _type: 'textColumn' }>
