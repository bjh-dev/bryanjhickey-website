import { defineType, defineArrayMember, defineField } from 'sanity'
import { ImageIcon, RemoveIcon } from '@sanity/icons'
import { extendedDecorators } from '@/studio/schema/fields/decorators'
import { richTextAnnotations } from '@/studio/schema/fields/annotations'
import {
  HeadingFour,
  HeadingThree,
  HeadingTwo,
  LeadParagraph,
} from './blockContentComponents'

/**
 * Full-featured rich text for longform content: posts, book reviews, biographies.
 *
 * Includes headings h2–h4, lead paragraph, blockquote, extended decorators
 * (highlight, superscript, subscript), link + scripture annotations, and
 * custom blocks (image, callout, code, YouTube embed, horizontal rule).
 */
export default defineType({
  title: 'Rich Text',
  name: 'richText',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Leading Paragraph', value: 'lead', component: LeadParagraph },
        { title: 'H2', value: 'h2', component: HeadingTwo },
        { title: 'H3', value: 'h3', component: HeadingThree },
        { title: 'H4', value: 'h4', component: HeadingFour },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: extendedDecorators,
        annotations: richTextAnnotations,
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed below the image.',
        }),
      ],
    }),
    defineArrayMember({
      type: 'callout',
    }),
    defineArrayMember({
      type: 'code',
      title: 'Code Block',
    }),
    defineArrayMember({
      type: 'youtubeEmbed',
    }),
    defineArrayMember({
      name: 'hr',
      type: 'object',
      title: 'Horizontal Rule',
      icon: RemoveIcon,
      description: 'A visual separator between content sections.',
      fields: [
        defineField({
          name: 'style',
          type: 'string',
          title: 'Style',
          initialValue: 'default',
          hidden: true,
        }),
      ],
      preview: {
        prepare() {
          return { title: '── Horizontal Rule ──' }
        },
      },
    }),
  ],
})
