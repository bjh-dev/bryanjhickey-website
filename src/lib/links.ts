import { clientEnv } from '@/studio/env'
import { LinkFragmentType } from './sanity/queries/fragments/fragment.types'

export const getBaseURL = () => {
  return clientEnv.NEXT_PUBLIC_SITE_URL ?? ''
}

/**
 * Generic function to generate a link to a document based on its type and slug
 */
export const getDocumentLink = (
  { _type, slug }: { _type: string; slug: string | null },
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
    case 'homePage':
      return `${linkBase}/`
    default:
      return `${linkBase}/`
  }
}

export const getLinkByLinkObject = (
  link: Pick<LinkFragmentType, 'type' | 'external' | 'internal'>,
) => {
  const { type, external, internal } = link

  if (type === 'external') {
    return external ?? ''
  }

  if (type === 'internal' && internal) {
    // Only attempt to access slug if it exists on internal
    return getDocumentLink(
      {
        _type: internal._type,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        slug: 'slug' in internal ? ((internal as any).slug ?? null) : null,
      },
      false,
    )
  }
}
