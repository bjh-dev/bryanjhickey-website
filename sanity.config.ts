'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import {
  defineDocuments,
  defineLocations,
  DocumentLocation,
  presentationTool,
} from 'sanity/presentation'
import { schema } from '@/studio/schema'
import { media } from 'sanity-plugin-media'

import { structure } from '@/studio/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { clientEnv } from '@/studio/env'

const basePlugins = [
  // Add an image asset source for Unsplash
  // https://www.sanity.io/plugins/sanity-plugin-asset-source-unsplash
  unsplashImageAsset(),

  // Customize and configure how you segment and navigate your content
  // https://www.sanity.io/docs/overview-structure-builder
  structureTool({
    title: 'Content Editor',
    structure,
  }),

  // Work with content directly through preview
  // https://www.sanity.io/docs/presentation
  presentationTool({
    previewUrl: {
      preview: '/',
      previewMode: {
        enable: '/api/draft-mode/enable',
      },
    },
    resolve: {
      mainDocuments: defineDocuments([
        {
          route: '/',
          filter: `_type == "home"`,
        },
        {
          route: '/:slug',
          filter: `_type == "page" && slug.current == $slug`,
        },
        {
          route: '/posts/:slug',
          filter: `_type == "post" && slug.current == $slug`,
        },
      ]),

      locations: {
        settings: defineLocations({
          message: 'This document is used on all pages',
          tone: 'caution',
        }),
        homePage: defineLocations({
          select: {
            title: 'title',
          },
          resolve: (doc) => ({
            locations: [
              {
                title: doc?.title ?? 'Untitled',
                href: '/',
              } satisfies DocumentLocation,
            ],
          }),
        }),
        page: defineLocations({
          select: {
            title: 'title',
            slug: 'slug.current',
          },
          resolve: (doc) => ({
            locations: [
              {
                title: doc?.title ?? 'Untitled',
                href: doc?.slug?.current,
              },
            ],
          }),
        }),
        post: defineLocations({
          select: {
            title: 'title',
            slug: 'slug.current',
          },
          resolve: (doc) => ({
            locations: [
              {
                title: doc?.title ?? 'Untitled',
                href: doc?.slug?.current,
              },
            ],
          }),
        }),
      },
    },
  }),

  // Browse, manage and select
  // https://www.sanity.io/plugins/sanity-plugin-media
  media(),
]
const developmentPlugins = [
  // Quickly test your GROQ queries
  // https://www.sanity.io/docs/the-vision-plugin
  visionTool({ defaultApiVersion: clientEnv.NEXT_PUBLIC_SANITY_API_VERSION }),
]

export default defineConfig({
  basePath: '/studio',
  projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: basePlugins.concat(
    process.env.NODE_ENV === 'development' ? developmentPlugins : [],
  ),
})
