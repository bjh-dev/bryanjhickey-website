import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import { defaultFieldGroups } from '@/studio/config/fieldGroups'
import { BookOpen } from 'lucide-react'
import imageWithAlt from '@/studio/schema/fields/imageWithAlt'

/**
 * Book Review schema. Define and edit the fields for the 'bookReview' content type.
 */

export default defineType({
  name: 'bookReview',
  title: 'Book Reviews',
  icon: BookOpen,
  type: 'document',
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
      description:
        'Your review title — this is how the review appears in listings and search results.',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The URL-friendly version of the title (e.g. "my-review-title"). Auto-generated from the title — only edit if you need a custom URL.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    imageWithAlt({
      title: 'Cover Image',
      description:
        'The cover image displayed at the top of the review and on review cards. Use a high-quality, landscape-oriented image.',
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description:
        'A short summary shown on review cards and in search results. Aim for 1–2 sentences.',
      group: 'content',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'bookTitle',
      title: 'Book Title',
      type: 'string',
      description: 'The full title of the book being reviewed.',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'bookAuthor',
      title: 'Book Author',
      type: 'string',
      description: "The book's author name.",
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
      description: "The book's publisher.",
      group: 'content',
    }),
    defineField({
      name: 'yearPublished',
      title: 'Year Published',
      type: 'number',
      description: 'The year the book was published.',
      validation: (rule) => rule.min(1000).max(new Date().getFullYear() + 1),
      group: 'content',
    }),
    defineField({
      name: 'amazonLink',
      title: 'Amazon Link',
      type: 'url',
      description: 'Amazon affiliate link for the book.',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
      description:
        'The full body of the review. Use headings, lists, and links to structure your writing.',
      group: 'content',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description:
        'The publication date shown to readers. Defaults to today — adjust for backdated or scheduled reviews.',
      initialValue: () => new Date().toISOString(),
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      description:
        'The person who wrote this review. Their name and photo appear in the byline.',
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
  preview: {
    select: {
      title: 'title',
      bookTitle: 'bookTitle',
      bookAuthor: 'bookAuthor',
      date: 'date',
      media: 'image',
    },
    prepare({ title, bookTitle, bookAuthor, date, media }) {
      const subtitles = [
        bookTitle,
        bookAuthor && `by ${bookAuthor}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {
        title,
        media,
        subtitle: subtitles.join(' '),
      }
    },
  },
})
