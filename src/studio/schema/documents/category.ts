import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'
import { defaultFieldGroups } from '@/studio/config/fieldGroups'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of this category (e.g. "Technology", "Faith").',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The URL-friendly version of the title. Auto-generated from the title.',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description:
        'A short description of what this category covers. Shown on category archive pages.',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({ title, description }) {
      return {
        title: title || 'Untitled Category',
        subtitle: description,
        media: TagIcon,
      }
    },
  },
})
