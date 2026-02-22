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
      description:
        'The display name for this page. Shown in navigation and as the page heading.',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The URL-friendly version of the name (e.g. "about-us"). Auto-generated from the name.',
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
  preview: {
    select: {
      title: 'name',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled Page',
        subtitle: slug ? `/${slug}` : 'No slug',
      }
    },
  },
})
