import { defineType, defineArrayMember, defineField } from 'sanity'
import { BookIcon, ImageIcon, LinkIcon } from '@sanity/icons'
import {
  HeadingFour,
  HeadingOne,
  HeadingThree,
  HeadingTwo,
  LeadParagraph,
} from './blockContentComponents'

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Leading Paragraph', value: 'lead', component: LeadParagraph },
        { title: 'H1', value: 'h1', component: HeadingOne },
        { title: 'H2', value: 'h2', component: HeadingTwo },
        { title: 'H3', value: 'h3', component: HeadingThree },
        { title: 'H4', value: 'h4', component: HeadingFour },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          { title: 'Code', value: 'code' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Strike', value: 'strike-through' },
          { title: 'Strong', value: 'strong' },
          { title: 'Underline', value: 'underline' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          defineArrayMember({
            name: 'customLink',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'customLink',
                type: 'link',
              }),
            ],
          }),
          defineArrayMember({
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
          }),
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineArrayMember({
      name: 'callout',
      title: 'Callout',
      type: 'object',
      description: 'A callout block for highlighting important information.',
      fields: [
        defineField({
          name: 'calloutType',
          type: 'string',
          title: 'Callout Type',
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
              marks: {
                decorators: [
                  { title: 'Emphasis', value: 'em' },
                  { title: 'Strong', value: 'strong' },
                  { title: 'Strike', value: 'strike-through' },
                  { title: 'Underline', value: 'underline' },
                ],
                annotations: [
                  defineArrayMember({
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
                  }),
                ],
              },
            }),
          ],
        }),
      ],
    }),
  ],
})
