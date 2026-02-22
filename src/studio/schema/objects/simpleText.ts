import { defineType, defineArrayMember } from 'sanity'
import { baseDecorators } from '@/studio/schema/fields/decorators'
import { baseAnnotations } from '@/studio/schema/fields/annotations'

/**
 * Stripped-down block text for page builder sections (hero, textColumn, etc.).
 *
 * Normal paragraphs only — no headings, no lists, no custom blocks.
 * Supports basic inline formatting and link/scripture annotations.
 */
export default defineType({
  title: 'Simple Text',
  name: 'simpleText',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: baseDecorators,
        annotations: baseAnnotations,
      },
    }),
  ],
})
