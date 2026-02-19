import { defineArrayMember, defineField } from 'sanity'
import hero from '@/studio/schema/objects/sections/hero'
import postList from '@/studio/schema/objects/sections/postList'
import subscribe from '@/studio/schema/objects/sections/subscribe'
import textColumn from '@/studio/schema/objects/sections/textColumn'

const pageSectionsObjects = [hero, postList, subscribe, textColumn]

export default defineField({
  name: 'pageSections',
  title: 'Page Sections',
  type: 'array',
  of: pageSectionsObjects.map(({ name }) => defineArrayMember({ type: name })),
  group: 'content',
})
