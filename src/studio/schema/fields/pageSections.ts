import { defineArrayMember, defineField } from 'sanity'
import hero from '@/studio/schema/objects/sections/hero'
import postList from '@/studio/schema/objects/sections/postList'
import textColumn from '@/studio/schema/objects/sections/textColumn'

const pageSectionsObjects = [hero, postList, textColumn]

export default defineField({
  name: 'pageSections',
  title: 'Page Sections',
  type: 'array',
  of: pageSectionsObjects.map(({ name }) => defineArrayMember({ type: name })),
  group: 'content',
})
