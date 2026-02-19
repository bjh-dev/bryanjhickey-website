import { urlForImage } from '@/lib/sanity/client/image'
import { baseUrl, clientEnv } from '@/studio/env'
import type { SanityImageSource } from '@sanity/image-url'
import { createDataAttribute, CreateDataAttributeProps } from 'next-sanity'

export function resolveOpenGraphImage(
  image: SanityImageSource | undefined,
  width = 1200,
  height = 627,
) {
  if (!image) return
  const url = urlForImage(image)?.width(width).height(height).fit('crop').url()
  if (!url) return
  return { url, width, height }
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
    baseUrl: baseUrl,
  })
    .combine(config)
    .toString()
}
