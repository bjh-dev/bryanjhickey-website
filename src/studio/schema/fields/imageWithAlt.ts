import { defineField, type ImageRule } from 'sanity'

interface ImageWithAltOptions {
  name?: string
  title?: string
  description?: string
  required?: boolean
  group?: string
}

export default function imageWithAlt(options: ImageWithAltOptions = {}) {
  const {
    name = 'image',
    title = 'Image',
    description,
    required = false,
    group,
  } = options

  return defineField({
    name,
    title,
    type: 'image',
    ...(description && { description }),
    ...(group && { group }),
    options: {
      hotspot: true,
    },
    ...(required && { validation: (rule: ImageRule) => rule.required() }),
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alternative text',
        description: 'Important for SEO and accessibility.',
        validation: (rule) =>
          rule.custom((alt, context) => {
            if (
              (context.document?.[name] as { asset?: { _ref?: string } })?.asset
                ?._ref &&
              !alt
            ) {
              return 'Required'
            }
            return true
          }),
      }),
    ],
  })
}
