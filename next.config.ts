import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source:
          '/posts/book-review-speaking-in-tongues-a-critical-historical-examination-by-philip-blosser',
        destination:
          '/book-reviews/book-review-speaking-in-tongues-a-critical-historical-examination-by-philip-blosser',
        permanent: true,
      },
      {
        source:
          '/posts/book-review-an-invitation-to-analytic-christian-theology-by-thomas-h-mccall',
        destination:
          '/book-reviews/book-review-an-invitation-to-analytic-christian-theology-by-thomas-h-mccall',
        permanent: true,
      },
      {
        source: '/posts/book-review-scripture-as-communication',
        destination: '/book-reviews/book-review-scripture-as-communication',
        permanent: true,
      },
      {
        source: '/category/book-review',
        destination: '/book-reviews',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    return [
      {
        // Security headers for all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Allow Sanity's live preview endpoint
        source: '/api/sanity/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: siteUrl,
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
      {
        // Handle external embeds like Cal.com if you're proxying them
        source: '/external/cal/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: siteUrl,
          },
        ],
      },
    ]
  },
}

export default nextConfig
