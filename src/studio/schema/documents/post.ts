import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import { defaultFieldGroups } from '@/studio/config/fieldGroups'
import { FilePlus2 } from 'lucide-react'

/**
 * Post schema.  Define and edit the fields for the 'post' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export default defineType({
  name: 'post',
  title: 'Posts',
  icon: FilePlus2,
  type: 'document',
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'The headline for this post. Keep it clear and engaging — it appears on cards, in search results, and at the top of the page.',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description:
        'An optional secondary line that appears below the title. Use it to add context, a tagline, or a descriptive phrase.',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The URL-friendly version of the title (e.g. "my-post-title"). Auto-generated from the title — only edit if you need a custom URL.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Check this box to feature the post on the homepage.',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description:
        'The cover image displayed at the top of the post and on post cards. Use a high-quality, landscape-oriented image.',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if (
                (context.document?.coverImage as { asset?: { _ref?: string } })
                  ?.asset?._ref &&
                !alt
              ) {
                return 'Required'
              }
              return true
            })
          },
        },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description:
        'A short summary shown on post cards and in search results. Aim for 1–2 sentences that capture the core idea.',
      group: 'content',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description:
        'Tag this post with one or more categories so readers can find related content.',
      of: [{ type: 'reference', to: { type: 'category' } }],
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description:
        'The full body of the post. Use headings, lists, and links to structure your writing.',
      group: 'content',
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description:
        'The publication date shown to readers. Defaults to today — adjust for backdated or scheduled posts.',
      initialValue: () => new Date().toISOString(),
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      description:
        'The person who wrote this post. Their name and photo appear in the byline.',
      to: [{ type: 'person' }],
      group: 'content',
    }),
    defineField({
      title: 'SEO & Metadata',
      name: 'seo',
      type: 'seoMetaFields',
      group: 'seo',
    }),
  ],
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      title: 'title',
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      date: 'date',
      media: 'image',
      isFeatured: 'isFeatured',
    },
    prepare({
      title,
      media,
      authorFirstName,
      authorLastName,
      date,
      isFeatured,
    }) {
      const subtitles = [
        authorFirstName &&
          authorLastName &&
          `by ${authorFirstName} ${authorLastName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {
        title,
        media,
        subtitle: `${isFeatured ? '⭐️ ' : ''}${subtitles.join(' ')}`,
      }
    },
  },
})
