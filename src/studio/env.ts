function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

const vercelUrl =
  process.env.VERCEL_ENV === 'preview'
    ? `http://${process.env.VERCEL_BRANCH_URL}`
    : `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `${vercelUrl}`

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-04-17'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? baseUrl
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const clientEnv = {
  NEXT_PUBLIC_SANITY_API_VERSION: apiVersion,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SITE_URL: siteUrl,
} as const
