import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export default defineType({
  name: 'subscribe',
  title: 'Subscribe Section',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The heading displayed above the subscribe form.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      description: 'A short description encouraging visitors to subscribe.',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text on the subscribe button (e.g. "Subscribe").',
      initialValue: 'Subscribe',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: heading || 'Subscribe',
        subtitle: 'Subscribe Section',
        media: EnvelopeIcon,
      }
    },
  },
})
