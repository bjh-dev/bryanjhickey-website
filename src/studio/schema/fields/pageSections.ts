import { defineArrayMember, defineField } from 'sanity'
import hero from '@/studio/schema/objects/sections/hero'
import postList from '@/studio/schema/objects/sections/postList'

const pageSectionsObjects = [hero, postList]

export default defineField({
  name: 'pageSections',
  title: 'Page Sections',
  type: 'array',
  of: pageSectionsObjects.map(({ name }) => defineArrayMember({ type: name })),
  group: 'content',
})
