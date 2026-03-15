import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import { defaultFieldGroups } from '@/studio/config/fieldGroups'
import { BookOpen } from 'lucide-react'
import imageWithAlt from '@/studio/schema/fields/imageWithAlt'

/**
 * Reading Note schema. Define and edit the fields for the 'bookReview' content type.
 */

export default defineType({
  name: 'bookReview',
  title: 'Notes on Reading',
  icon: BookOpen,
  type: 'document',
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'title',
      title: 'Note Title',
      type: 'string',
      description:
        'Your note title — this is how it appears in listings and search results.',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The URL-friendly version of the title (e.g. "my-note-title"). Auto-generated from the title — only edit if you need a custom URL.',
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
        'The cover image displayed at the top of the note and on cards. Use a high-quality, landscape-oriented image.',
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description:
        'A short summary shown on cards and in search results. Aim for 1–2 sentences.',
      group: 'content',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'sourceType',
      title: 'Source Type',
      type: 'string',
      description:
        'The type of work being reviewed. Controls which metadata fields are shown below.',
      options: {
        list: [
          { title: 'Book', value: 'book' },
          { title: 'Edited Book', value: 'editedBook' },
          { title: 'Journal Article', value: 'journalArticle' },
          { title: 'Chapter in Edited Book', value: 'chapterInEditedBook' },
          { title: 'Thesis', value: 'thesis' },
          { title: 'Report', value: 'report' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'book',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'bookTitle',
      title: 'Title of Work',
      type: 'string',
      description:
        'The full title of the work being reviewed (book, article, thesis, report, etc.).',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'bookAuthor',
      title: 'Author of Work',
      type: 'string',
      description: "The name of the work's author or editor.",
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
      description: 'The publisher of the work.',
      hidden: ({ document }) =>
        ['journalArticle', 'thesis', 'report'].includes(
          document?.sourceType as string,
        ),
      group: 'content',
    }),
    defineField({
      name: 'yearPublished',
      title: 'Year Published',
      type: 'number',
      description: 'The year the work was published.',
      validation: (rule) => rule.min(1000).max(new Date().getFullYear() + 1),
      group: 'content',
    }),
    defineField({
      name: 'journalName',
      title: 'Journal Name',
      type: 'string',
      description:
        'The name of the journal (e.g. "Journal of Biblical Literature").',
      hidden: ({ document }) => document?.sourceType !== 'journalArticle',
      group: 'content',
    }),
    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'string',
      description: 'The volume number of the journal issue.',
      hidden: ({ document }) => document?.sourceType !== 'journalArticle',
      group: 'content',
    }),
    defineField({
      name: 'issue',
      title: 'Issue',
      type: 'string',
      description: 'The issue number of the journal.',
      hidden: ({ document }) => document?.sourceType !== 'journalArticle',
      group: 'content',
    }),
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'string',
      description: 'The page range (e.g. "23–45").',
      hidden: ({ document }) =>
        !['journalArticle', 'chapterInEditedBook'].includes(
          document?.sourceType as string,
        ),
      group: 'content',
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'The Digital Object Identifier (e.g. "10.1234/example").',
      hidden: ({ document }) =>
        !['journalArticle', 'chapterInEditedBook'].includes(
          document?.sourceType as string,
        ),
      group: 'content',
    }),
    defineField({
      name: 'editors',
      title: 'Editors',
      type: 'string',
      description:
        'The editor(s) of the parent book (e.g. "John Smith and Jane Doe").',
      hidden: ({ document }) => document?.sourceType !== 'chapterInEditedBook',
      group: 'content',
    }),
    defineField({
      name: 'parentBookTitle',
      title: 'Parent Book Title',
      type: 'string',
      description: 'The title of the edited book this chapter appears in.',
      hidden: ({ document }) => document?.sourceType !== 'chapterInEditedBook',
      group: 'content',
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      description: 'The university or organisation that produced the work.',
      hidden: ({ document }) =>
        !['thesis', 'report'].includes(document?.sourceType as string),
      group: 'content',
    }),
    defineField({
      name: 'thesisType',
      title: 'Thesis Type',
      type: 'string',
      description: 'The type of thesis (e.g. "PhD Dissertation", "MA Thesis").',
      hidden: ({ document }) => document?.sourceType !== 'thesis',
      group: 'content',
    }),
    defineField({
      name: 'reportNumber',
      title: 'Report Number',
      type: 'string',
      description: 'The report or working paper number, if applicable.',
      hidden: ({ document }) => document?.sourceType !== 'report',
      group: 'content',
    }),
    defineField({
      name: 'amazonLink',
      title: 'Purchase Link',
      type: 'url',
      description:
        'Link to purchase or access the work (e.g. Amazon, publisher site).',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
      description:
        'The full body of the note. Use headings, lists, and links to structure your writing.',
      group: 'content',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description:
        'The publication date shown to readers. Defaults to today — adjust for backdated or scheduled notes.',
      initialValue: () => new Date().toISOString(),
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      description:
        'The person who wrote this note. Their name and photo appear in the byline.',
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
