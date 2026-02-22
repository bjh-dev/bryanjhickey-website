import { defineArrayMember, defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import imageWithAlt from '@/studio/schema/fields/imageWithAlt'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The main heading displayed prominently in the hero banner.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      description: 'A secondary line displayed below the title.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'simpleText',
      description: 'Optional body text displayed below the subtitle.',
    }),
    imageWithAlt({
      description:
        'A full-width background image for the hero banner. Use a high-quality, landscape-oriented image.',
      required: true,
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      description: 'Up to 2 call-to-action buttons displayed in the hero.',
      of: [defineArrayMember({ type: 'button' })],
      validation: (Rule) => Rule.min(1).max(2),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Hero Section',
        media: media ?? HomeIcon,
      }
    },
  },
})
