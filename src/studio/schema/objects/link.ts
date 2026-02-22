import { createRadioListLayout } from '@/utils/schema'
import { defineField, defineType } from 'sanity'
import { Link } from 'lucide-react'

const allLinkableTypes = [
  { type: 'post' },
  { type: 'page' },
  { type: 'bookReview' },
]

export default defineType({
  name: 'link',
  type: 'object',
  icon: Link,
  fields: [
    defineField({
      name: 'type',
      title: 'Link Type',
      type: 'string',
      description:
        'Choose "Internal" to link to a page on this site, or "External" for an outside URL.',
      options: createRadioListLayout(['internal', 'external']),
      initialValue: () => 'external',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      description: 'If checked, the link will open in a new tab.',
      initialValue: () => false,
    }),
    defineField({
      name: 'external',
      type: 'string',
      title: 'URL',
      description:
        'The full URL including https:// (e.g. "https://example.com").',
      hidden: ({ parent }) => parent?.type !== 'external',
    }),
    defineField({
      name: 'internal',
      title: 'Internal Page',
      type: 'reference',
      description: 'Select a page, post, or book review to link to.',
      options: { disableNew: true },
      hidden: ({ parent }) => parent?.type !== 'internal',
      to: allLinkableTypes,
    }),
  ],
  preview: {
    select: {
      externalUrl: 'external',
      urlType: 'type',
      internalUrl: 'internal.slug.current',
      openInNewTab: 'openInNewTab',
    },
    prepare({ externalUrl, urlType, internalUrl, openInNewTab }) {
      const url = urlType === 'external' ? externalUrl : `/${internalUrl}`
      const newTabIndicator = openInNewTab ? ' ↗' : ''
      const truncatedUrl = url?.length > 30 ? `${url.substring(0, 30)}...` : url

      return {
        title: `${urlType === 'external' ? 'External' : 'Internal'} Link`,
        subtitle: `${truncatedUrl}${newTabIndicator}`,
      }
    },
  },
})
