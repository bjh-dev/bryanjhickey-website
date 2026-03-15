import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'bookReviews',
  title: 'Notes on Reading',
  type: 'object',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The section heading, e.g. "From the Reading Pile".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'A short intro paragraph displayed below the heading.',
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      description:
        'Text for the "View all notes" link in the header, e.g. "All notes".',
      initialValue: 'All notes',
    }),
    defineField({
      name: 'numberOfReviews',
      title: 'Number of Notes',
      type: 'number',
      description: 'How many reading note cards to display (1–8).',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(8),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: heading || 'Notes on Reading',
        subtitle: 'Notes on Reading',
        media: BookIcon,
      }
    },
  },
})
