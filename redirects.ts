import type { Redirect } from 'next/dist/lib/load-custom-routes'

const redirects: Redirect[] = [
  // Legacy /posts/ URLs → /notes-on-reading/
  {
    source:
      '/posts/book-review-speaking-in-tongues-a-critical-historical-examination-by-philip-blosser',
    destination:
      '/notes-on-reading/book-review-speaking-in-tongues-a-critical-historical-examination-by-philip-blosser',
    permanent: true,
  },
  {
    source:
      '/posts/book-review-an-invitation-to-analytic-christian-theology-by-thomas-h-mccall',
    destination:
      '/notes-on-reading/book-review-an-invitation-to-analytic-christian-theology-by-thomas-h-mccall',
    permanent: true,
  },
  {
    source: '/posts/book-review-scripture-as-communication',
    destination: '/notes-on-reading/book-review-scripture-as-communication',
    permanent: true,
  },

  // Legacy category URL
  {
    source: '/category/book-review',
    destination: '/notes-on-reading',
    permanent: true,
  },

  // Old /book-reviews/ segment → /notes-on-reading/
  {
    source: '/book-reviews',
    destination: '/notes-on-reading',
    permanent: true,
  },
  {
    source: '/book-reviews/:slug',
    destination: '/notes-on-reading/:slug',
    permanent: true,
  },
]

export default redirects
