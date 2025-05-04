import { CogIcon, HomeIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
      S.divider(),
      S.listItem()
        .title('Home')
        .child(S.document().schemaType('homePage').documentId('homePage'))
        .icon(HomeIcon),
      // Filter out "AI Assist Context" and "Settings" content from the list of content types
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return typeof id !== 'undefined'
          ? ![
              'settings',
              'homePage',
              'assist.instruction.context',
              'blogPage',
              'category',
              'people',
              'media.tag',
            ].includes(id)
          : false
      }),
    ])
