import { defineArrayMember, defineField, defineType } from 'sanity'
import { TextIcon } from '@sanity/icons'

export default defineType({
  name: 'textColumn',
  title: 'Text Column',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description:
        'A small label displayed above the text content, such as "About" or "Our Mission".',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'simpleText',
      description:
        'The main body text displayed in a centered, readable column.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttons',
      title: 'Call to Action',
      type: 'array',
      of: [defineArrayMember({ type: 'button' })],
      description: 'An optional link displayed below the text content.',
      validation: (Rule) => Rule.max(1),
    }),
  ],
  preview: {
    select: {
      eyebrow: 'eyebrow',
    },
    prepare({ eyebrow }) {
      return {
        title: eyebrow || 'Text Column',
        subtitle: 'Text Column',
        media: TextIcon,
      }
    },
  },
})
