import { clientEnv } from '@/studio/env'
import { LinkFragmentType } from './sanity/queries/fragments/fragment.types'

export const getBaseURL = () => {
  return clientEnv.NEXT_PUBLIC_SITE_URL ?? ''
}

type SupportedDocumentType =
  | 'page'
  | 'post'
  | 'category'
  | 'homePage'
  | 'person'

/**
 * Generic function to generate a link to a document based on its type and slug
 */
export const getDocumentLink = (
  { _type, slug }: { _type: SupportedDocumentType; slug: string | null },
  absolute: boolean = false,
) => {
  const linkBase = absolute ? getBaseURL() : ''

  switch (_type) {
    case 'page':
      return `${linkBase}/${slug}`
    case 'post':
      return `${linkBase}/posts/${slug}`
    case 'category':
      return `${linkBase}/category/${slug}`
    case 'person':
      return `${linkBase}/author/${slug}`
    case 'homePage':
      return `${linkBase}/`
    default:
      return `${linkBase}/`
  }
}

export const getLinkByLinkObject = (
  link:
    | Pick<LinkFragmentType, 'type' | 'external' | 'internal'>
    | {
        type: 'internal' | 'external' | null
        external: string | null
        internal: {
          _type: string
          slug?: string | null
        } | null
      },
) => {
  const { type, external, internal } = link

  if (type === 'external') {
    return external ?? ''
  }

  if (type === 'internal' && internal) {
    return getDocumentLink(
      {
        _type: internal._type as SupportedDocumentType,
        slug: 'slug' in internal ? (internal.slug ?? null) : null,
      },
      false,
    )
  }
}
