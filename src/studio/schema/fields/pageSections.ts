import { defineArrayMember, defineField } from 'sanity'
import bibleQuoteOfTheDay from '@/studio/schema/objects/sections/bibleQuoteOfTheDay'
import bookReviews from '@/studio/schema/objects/sections/bookReviews'
import hero from '@/studio/schema/objects/sections/hero'
import postList from '@/studio/schema/objects/sections/postList'
import subscribe from '@/studio/schema/objects/sections/subscribe'
import scripturePassage from '@/studio/schema/objects/sections/scripturePassage'
import textColumn from '@/studio/schema/objects/sections/textColumn'

const pageSectionsObjects = [
  bibleQuoteOfTheDay,
  bookReviews,
  hero,
  postList,
  scripturePassage,
  subscribe,
  textColumn,
]

export default defineField({
  name: 'pageSections',
  title: 'Page Sections',
  description:
    'Build your page by adding, reordering, and configuring sections. Each section is a self-contained content block.',
  type: 'array',
  of: pageSectionsObjects.map(({ name }) => defineArrayMember({ type: name })),
  group: 'content',
  options: {
    insertMenu: {
      groups: [
        {
          name: 'content',
          title: 'Content',
          of: ['hero', 'textColumn', 'postList', 'bookReviews'],
        },
        {
          name: 'scripture',
          title: 'Scripture',
          of: ['bibleQuoteOfTheDay', 'scripturePassage'],
        },
        {
          name: 'engagement',
          title: 'Engagement',
          of: ['subscribe'],
        },
      ],
    },
  },
})
