import { resolveOpenGraphImage } from '@/lib/sanity/client/utils'
import type { SeoFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'
import { Metadata } from 'next'

function parseAdditionalMetaTags(
  additionalMetaTags: SeoFragmentType['additionalMetaTags'],
) {
  if (!additionalMetaTags) {
    return undefined
  }

  const otherTags: Record<string, string> = {}
  additionalMetaTags.forEach((metaTag) => {
    metaTag?.metaAttributes?.forEach((metaAttribute) => {
      if (metaAttribute?.attributeKey) {
        if (
          metaAttribute?.attributeType === 'string' &&
          metaAttribute?.attributeValueString
        ) {
          otherTags[metaAttribute.attributeKey] =
            metaAttribute.attributeValueString
        }

        if (
          metaAttribute?.attributeType === 'image' &&
          metaAttribute?.attributeValueImage?.asset?.url
        ) {
          otherTags[metaAttribute.attributeKey] =
            metaAttribute.attributeValueImage.asset.url
        }
      }
    })
  })

  return otherTags
}

export const formatMetaData = (
  seo: SeoFragmentType,
  defaultTitle: string,
): Metadata => {
  const metaImage = resolveOpenGraphImage(seo.metaImage ?? undefined)

  return {
    title: seo?.metaTitle ?? defaultTitle,
    description: seo?.metaDescription,
    keywords: seo?.seoKeywords,
    robots: seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: seo?.openGraph
      ? {
          title: seo.openGraph.title ?? undefined,
          description: seo.openGraph.description ?? undefined,
          siteName: seo.openGraph.siteName ?? undefined,
          url: seo.openGraph.url ?? undefined,
          images: seo.openGraph.image
            ? resolveOpenGraphImage(seo.openGraph.image ?? undefined)
            : metaImage,
        }
      : undefined,
    twitter: seo?.twitter
      ? {
          site: seo.twitter.site ?? undefined,
          description:
            seo.openGraph?.description ?? seo.metaDescription ?? undefined,
          title: seo.openGraph?.title ?? seo.metaTitle ?? undefined,
          images: metaImage,
        }
      : undefined,
    other: parseAdditionalMetaTags(seo?.additionalMetaTags),
  }
}
