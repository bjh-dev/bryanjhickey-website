import { clientEnv } from '@/studio/env'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
})

export const urlForImage = (source: SanityImageSource) => {
  return builder.image(source)
}
