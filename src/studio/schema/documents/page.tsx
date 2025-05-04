import { defineField, defineType } from 'sanity'
import pageSections from '@/studio/schema/fields/pageSections'
import { defaultFieldGroups } from '@/studio/config/fieldGroups'
import { FilePlus2 } from 'lucide-react'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */
export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: FilePlus2,
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
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
