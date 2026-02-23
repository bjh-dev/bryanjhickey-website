import { Command } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { capitalize } from '@/utils/strings'
import { createRadioListLayout } from '@/utils/schema'

const buttonVariants = [
  'default',
  'secondary',
  'outline',
  'outlineDark',
  'link',
]

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: Command,
  fields: [
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      description:
        'The visual style of the button. "Default" is the primary style, "Link" renders as a text link.',
      initialValue: () => 'default',
      options: createRadioListLayout(buttonVariants, {
        direction: 'horizontal',
      }),
    }),
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      description: 'The label shown on the button.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      description: 'Where the button navigates to when clicked.',
    }),
  ],
  preview: {
    select: {
      title: 'text',
      variant: 'variant',
      externalUrl: 'url.external',
      urlType: 'url.type',
      internalUrl: 'url.internal.slug.current',
      openInNewTab: 'url.openInNewTab',
    },
    prepare: ({
      title,
      variant,
      externalUrl,
      urlType,
      internalUrl,
      openInNewTab,
    }) => {
      const url = urlType === 'external' ? externalUrl : internalUrl
      const newTabIndicator = openInNewTab ? ' ↗' : ''
      const truncatedUrl = url?.length > 30 ? `${url.substring(0, 30)}...` : url

      return {
        title: title ?? 'Untitled Button',
        subtitle: `${capitalize(variant ?? 'default')} • ${truncatedUrl}${newTabIndicator}`,
      }
    },
  },
})
