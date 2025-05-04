import { baseUrl, clientEnv } from '@/studio/env'
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: clientEnv.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    studioUrl: `${baseUrl}/studio`,
  },
})
