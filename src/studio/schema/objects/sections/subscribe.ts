import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'subscribe',
  title: 'Subscribe Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The heading displayed above the subscribe form',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      description: 'A short description encouraging visitors to subscribe',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text on the subscribe button (e.g. "Subscribe")',
      initialValue: 'Subscribe',
    }),
  ],
})
