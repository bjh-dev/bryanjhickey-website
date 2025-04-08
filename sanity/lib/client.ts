import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: { studioUrl: 'http://localhost:3000/studio' },
})
