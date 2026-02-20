import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'bookReviews',
  title: 'Book Reviews',
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
        'Text for the "View all reviews" link in the header, e.g. "All reviews".',
      initialValue: 'All reviews',
    }),
    defineField({
      name: 'numberOfReviews',
      title: 'Number of Reviews',
      type: 'number',
      description: 'How many book review cards to display (1–6).',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: heading || 'Book Reviews',
        subtitle: 'Book Reviews',
        media: BookIcon,
      }
    },
  },
})
