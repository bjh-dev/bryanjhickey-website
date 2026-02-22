import { User } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { defaultFieldGroups } from '@/studio/config/fieldGroups'
import imageWithAlt from '@/studio/schema/fields/imageWithAlt'

/**
 * Person schema.  Define and edit the fields for the 'person' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export default defineType({
  name: 'person',
  title: 'People',
  icon: User,
  type: 'document',
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      description: "The person's first name.",
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      description: "The person's last name or surname.",
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The URL-friendly identifier for this person. Auto-generated from their name.',
      validation: (Rule) => Rule.required(),
      options: {
        source: (doc) => `${doc?.firstName}-${doc?.lastName}`.toLowerCase(),
        maxLength: 96,
      },
      group: 'content',
    }),
    imageWithAlt({
      title: 'Picture',
      description:
        'A profile photo or headshot. Displayed in bylines and author pages.',
      group: 'content',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description:
        'Their job title or role (e.g. "Senior Developer", "Editor").',
      group: 'content',
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'richText',
      description:
        'A short bio for the author page. Supports full rich text formatting.',
      group: 'content',
    }),
  ],

  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      image: 'image',
    },
    prepare(selection) {
      return {
        title: `${selection.firstName} ${selection.lastName}`,
        subtitle: 'Person',
        media: selection.image,
      }
    },
  },
})
