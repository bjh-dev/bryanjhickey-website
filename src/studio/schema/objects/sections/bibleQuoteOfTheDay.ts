import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'bibleQuoteOfTheDay',
  title: 'Bible Quote of the Day',
  type: 'object',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description:
        'A small label displayed above the title, such as "Daily Reading" or "Today\'s Verse".',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'The main heading for this section (e.g. "Bible Quote of the Day").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description:
        'Optional introductory text displayed above the daily verse.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
    },
    prepare({ title, eyebrow }) {
      return {
        title: title || 'Bible Quote of the Day',
        subtitle: eyebrow || 'Bible Quote of the Day',
        media: BookIcon,
      }
    },
  },
})
