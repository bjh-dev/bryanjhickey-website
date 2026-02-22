import { defineType, defineArrayMember, defineField } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons'
import { baseDecorators } from '@/studio/schema/fields/decorators'
import {
  linkAnnotation,
  scriptureRefAnnotation,
} from '@/studio/schema/fields/annotations'

/**
 * Callout block for highlighting important information within rich text.
 * Supports info, question, and caution variants with simple nested content.
 */
export default defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  icon: InfoOutlineIcon,
  description: 'A callout block for highlighting important information.',
  fields: [
    defineField({
      name: 'calloutType',
      type: 'string',
      title: 'Callout Type',
      description: 'Choose the visual style of the callout.',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Question', value: 'question' },
          { title: 'Caution', value: 'caution' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The title of the callout block.',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Callout Text',
      description: 'The text content of the callout block.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [...baseDecorators],
            annotations: [linkAnnotation, scriptureRefAnnotation],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      calloutType: 'calloutType',
    },
    prepare({ title, calloutType }) {
      return {
        title: title || 'Callout',
        subtitle: calloutType
          ? calloutType.charAt(0).toUpperCase() + calloutType.slice(1)
          : 'Info',
      }
    },
  },
})
