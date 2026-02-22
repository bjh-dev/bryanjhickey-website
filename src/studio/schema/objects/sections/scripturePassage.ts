import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'scripturePassage',
  title: 'Scripture Passage',
  type: 'object',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Section Heading',
      description:
        'An optional label displayed above the passage (e.g. "Verse of the Week", "Today\'s Reading").',
    }),
    defineField({
      name: 'passageReference',
      type: 'string',
      title: 'Passage Reference',
      description:
        'The Bible passage to display, exactly as you would type it into the ESV website (e.g. "Psalm 23", "Romans 8:28-39", "John 1:1-14").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showVerseNumbers',
      type: 'boolean',
      title: 'Show Verse Numbers',
      description:
        'When enabled, verse numbers appear inline with the passage text.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      passageReference: 'passageReference',
      heading: 'heading',
    },
    prepare({ passageReference, heading }) {
      return {
        title: passageReference || 'Scripture Passage',
        subtitle: heading || 'Scripture Passage',
        media: BookIcon,
      }
    },
  },
})
