import { defineArrayMember, defineField } from 'sanity'
import { BookIcon, LinkIcon } from '@sanity/icons'

/**
 * External/internal link annotation wrapping the reusable `link` object type.
 * Used in both richText and simpleText.
 */
export const linkAnnotation = defineArrayMember({
  name: 'customLink',
  type: 'object',
  title: 'Link',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'customLink',
      type: 'link',
    }),
  ],
})

/**
 * Scripture reference annotation for inline Bible passage popovers.
 * Used in both richText and simpleText.
 */
export const scriptureRefAnnotation = defineArrayMember({
  name: 'scriptureRef',
  type: 'object',
  title: 'Scripture Reference',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'reference',
      type: 'string',
      title: 'Passage Reference',
      description:
        'The Bible passage as sent to the ESV API (e.g. "John 3:16", "Gen 3:1-7", "Psalm 23").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'Display Label Override',
      description:
        'Optional. If blank, the highlighted text is shown as-is. Use this to show a shortened label while the full API reference differs.',
    }),
  ],
})

/**
 * Standard set of annotations for all block content types.
 */
export const baseAnnotations = [linkAnnotation, scriptureRefAnnotation]
