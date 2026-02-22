import person from '@/studio/schema/documents/person'
import category from '@/studio/schema/documents/category'
import post from '@/studio/schema/documents/post'
import bookReview from '@/studio/schema/documents/bookReview'
import blockContent from '@/studio/schema/objects/blockContent'
import link from '@/studio/schema/objects/link'
import menu from '@/studio/schema/objects/menu'
import menuItem from '@/studio/schema/objects/menuItem'
import hero from '@/studio/schema/objects/sections/hero'
import seoTypes from '@/studio/schema/objects/seo'
import home from '@/studio/schema/singletons/home'
import settings from '@/studio/schema/singletons/settings'
import { SchemaTypeDefinition } from 'sanity'
import page from '@/studio/schema/documents/page'
import social from '@/studio/schema/objects/social'
import button from '@/studio/schema/objects/button'
import postList from '@/studio/schema/objects/sections/postList'
import subscribe from '@/studio/schema/objects/sections/subscribe'
import bookReviews from '@/studio/schema/objects/sections/bookReviews'
import scripturePassage from '@/studio/schema/objects/sections/scripturePassage'
import textColumn from '@/studio/schema/objects/sections/textColumn'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons
    home,
    settings,
    // Documents
    bookReview,
    category,
    post,
    person,
    page,
    // Sections
    bookReviews,
    hero,
    postList,
    scripturePassage,
    subscribe,
    textColumn,
    // Objects
    blockContent,
    button,
    social,
    link,
    menu,
    menuItem,
    ...seoTypes,
  ],
}
