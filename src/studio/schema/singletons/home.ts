import { defineType, defineField } from 'sanity'
import pageSections from '@/studio/schema/fields/pageSections'
import { defaultFieldGroups } from '@/studio/config/fieldGroups'
import { Home } from 'lucide-react'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: Home,
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'name',
      hidden: true,
      readOnly: true,
      type: 'string',
      initialValue: 'Home Page',
      group: 'content',
    }),
    pageSections,
    defineField({
      title: 'SEO & Metadata',
      name: 'seo',
      type: 'seoMetaFields',
      group: 'seo',
    }),
  ],
})
