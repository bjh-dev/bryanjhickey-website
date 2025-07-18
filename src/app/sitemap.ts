import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client/client'
import { getSitemapQuery } from '@/lib/sanity/queries/queries'
import { baseUrl } from '@/studio/env'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const paths = await client.fetch(getSitemapQuery)

    if (!paths) return []

    return paths.map((path) => ({
      url: new URL(path.href!, baseUrl).toString(),
      lastModified: new Date(path._updatedAt),
      changeFrequency: 'weekly',
      priority: 1,
    }))
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return []
  }
}
