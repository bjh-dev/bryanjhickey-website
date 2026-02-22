import { defineType, defineField } from 'sanity'
import { PlayIcon } from '@sanity/icons'

/**
 * YouTube video embed block for rich text content.
 * Validates that the URL is a valid YouTube link.
 */
export default defineType({
  name: 'youtubeEmbed',
  title: 'YouTube Video',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube URL',
      description: 'Paste the full YouTube video URL.',
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ['https'] })
          .custom((url) => {
            if (url && !url.match(/youtube\.com|youtu\.be/)) {
              return 'Must be a YouTube URL'
            }
            return true
          }),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Optional caption displayed below the video.',
    }),
  ],
  preview: {
    select: { url: 'url', caption: 'caption' },
    prepare({ url, caption }) {
      return {
        title: caption || 'YouTube Video',
        subtitle: url,
      }
    },
  },
})
