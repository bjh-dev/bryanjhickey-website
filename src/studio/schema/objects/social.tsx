import { SocialIcon } from '@/components/modules/SocialMedia'
import { SocialMediaType } from '@/types/seo'
import { Users2Icon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'social',
  title: 'Social',
  type: 'object',
  icon: Users2Icon,
  fieldsets: [
    {
      name: 'social',
      title: 'Social Media',
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      fieldset: 'social',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Twitter/X', value: 'twitter' },
          { title: 'YouTube', value: 'youtube' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      fieldset: 'social',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'url',
    },
    prepare({ title, subtitle }) {
      const icon = (
        <SocialIcon
          platform={title as NonNullable<SocialMediaType>}
          className="h-5 w-5"
        />
      )
      return {
        title: `Social Media - ${title}`,
        subtitle: subtitle,
        media: icon,
      }
    },
  },
})
