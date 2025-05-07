import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'postList',
  title: 'List of Posts',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the blog posts section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle of the blog posts section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the blog posts section',
      validation: (Rule) => Rule.max(250),
    }),
    defineField({
      name: 'numberOfPosts',
      title: 'Number of Posts',
      type: 'number',
      description: 'Number of posts to display in the list',
      validation: (Rule) => Rule.min(1).max(8).required(),
    }),
  ],
})
