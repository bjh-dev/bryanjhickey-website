import { describe, it, expect, vi } from 'vitest'

vi.mock('@/studio/env', () => ({
  clientEnv: {
    NEXT_PUBLIC_SITE_URL: 'https://bryanjhickey.com',
  },
}))

import { getBaseURL, getDocumentLink, getLinkByLinkObject } from '../links'

describe('getBaseURL', () => {
  it('returns the site URL from env', () => {
    expect(getBaseURL()).toBe('https://bryanjhickey.com')
  })
})

describe('getDocumentLink', () => {
  it('returns slug path for page type', () => {
    expect(getDocumentLink({ _type: 'page', slug: 'about' })).toBe('/about')
  })

  it('returns /posts/slug for post type', () => {
    expect(getDocumentLink({ _type: 'post', slug: 'my-post' })).toBe(
      '/posts/my-post',
    )
  })

  it('returns /category/slug for category type', () => {
    expect(getDocumentLink({ _type: 'category', slug: 'tech' })).toBe(
      '/category/tech',
    )
  })

  it('returns /author/slug for person type', () => {
    expect(getDocumentLink({ _type: 'person', slug: 'bryan' })).toBe(
      '/author/bryan',
    )
  })

  it('returns / for homePage type', () => {
    expect(getDocumentLink({ _type: 'homePage', slug: null })).toBe('/')
  })

  it('returns / for unknown type (default case)', () => {
    expect(getDocumentLink({ _type: 'unknown' as never, slug: 'test' })).toBe(
      '/',
    )
  })

  it('prepends base URL when absolute is true', () => {
    expect(getDocumentLink({ _type: 'post', slug: 'my-post' }, true)).toBe(
      'https://bryanjhickey.com/posts/my-post',
    )
  })

  it('does not prepend base URL when absolute is false', () => {
    expect(getDocumentLink({ _type: 'post', slug: 'my-post' }, false)).toBe(
      '/posts/my-post',
    )
  })
})

describe('getLinkByLinkObject', () => {
  it('returns external URL for external link type', () => {
    const result = getLinkByLinkObject({
      type: 'external',
      external: 'https://example.com',
      internal: null,
    })
    expect(result).toBe('https://example.com')
  })

  it('returns empty string when external URL is null', () => {
    const result = getLinkByLinkObject({
      type: 'external',
      external: null,
      internal: null,
    })
    expect(result).toBe('')
  })

  it('returns document link for internal link type', () => {
    const result = getLinkByLinkObject({
      type: 'internal',
      external: null,
      internal: {
        _type: 'post',
        slug: 'my-post',
      },
    })
    expect(result).toBe('/posts/my-post')
  })

  it('handles internal link with null slug', () => {
    const result = getLinkByLinkObject({
      type: 'internal',
      external: null,
      internal: {
        _type: 'page',
        slug: null,
      },
    })
    expect(result).toBe('/null')
  })

  it('handles internal link without slug property', () => {
    const result = getLinkByLinkObject({
      type: 'internal',
      external: null,
      internal: {
        _type: 'homePage',
      },
    })
    expect(result).toBe('/')
  })

  it('returns undefined when type is internal but internal is null', () => {
    const result = getLinkByLinkObject({
      type: 'internal',
      external: null,
      internal: null,
    })
    expect(result).toBeUndefined()
  })

  it('returns undefined when type is null', () => {
    const result = getLinkByLinkObject({
      type: null,
      external: null,
      internal: null,
    })
    expect(result).toBeUndefined()
  })
})
