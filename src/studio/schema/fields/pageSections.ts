import { defineArrayMember, defineField } from 'sanity'
import hero from '@/studio/schema/objects/sections/hero'

const pageSectionsObjects = [hero]

export default defineField({
  name: 'pageSections',
  title: 'Page Sections',
  type: 'array',
  of: pageSectionsObjects.map(({ name }) => defineArrayMember({ type: name })),
  group: 'content',
})
