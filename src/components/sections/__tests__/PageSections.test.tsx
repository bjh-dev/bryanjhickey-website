import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import PageSections from '../PageSections'

type OptimisticReducer<T> = (current: T, action: unknown) => T

// Capture the reducer so we can test it
let capturedReducer: OptimisticReducer<unknown> | null = null

vi.mock('next-sanity/hooks', () => ({
  useOptimistic: (
    initialValue: unknown,
    reducer: OptimisticReducer<unknown>,
  ) => {
    capturedReducer = reducer
    return initialValue
  },
}))

// Mock dataAttr utility
vi.mock('@/lib/sanity/client/utils', () => ({
  dataAttr: vi.fn(() => ''),
}))

// Mock section components
vi.mock('@/components/sections/Hero', () => ({
  default: ({ section }: { section: { title: string } }) => (
    <div data-testid="hero-section">{section.title}</div>
  ),
}))

vi.mock('@/components/sections/PostList', () => ({
  default: ({ section }: { section: { title: string } }) => (
    <div data-testid="postlist-section">{section.title}</div>
  ),
}))

describe('PageSections', () => {
  it('renders nothing when sections is empty', () => {
    const { container } = render(
      <PageSections documentId="doc-1" documentType="page" sections={[]} />,
    )

    expect(container.innerHTML).toBe('')
  })

  it('renders nothing when sections is undefined', () => {
    const { container } = render(
      <PageSections documentId="doc-1" documentType="page" />,
    )

    expect(container.innerHTML).toBe('')
  })

  it('renders a hero section', () => {
    const sections = [
      {
        _key: 'hero-1',
        _type: 'hero' as const,
        title: 'Welcome Hero',
      },
    ]

    render(
      <PageSections
        documentId="doc-1"
        documentType="page"
        sections={sections as never}
      />,
    )

    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByText('Welcome Hero')).toBeInTheDocument()
  })

  it('renders a postList section', () => {
    const sections = [
      {
        _key: 'postlist-1',
        _type: 'postList' as const,
        title: 'Latest Posts',
      },
    ]

    render(
      <PageSections
        documentId="doc-1"
        documentType="page"
        sections={sections as never}
      />,
    )

    expect(screen.getByTestId('postlist-section')).toBeInTheDocument()
    expect(screen.getByText('Latest Posts')).toBeInTheDocument()
  })

  it('renders multiple sections in order', () => {
    const sections = [
      {
        _key: 'hero-1',
        _type: 'hero' as const,
        title: 'Hero Title',
      },
      {
        _key: 'postlist-1',
        _type: 'postList' as const,
        title: 'Posts Title',
      },
    ]

    render(
      <PageSections
        documentId="doc-1"
        documentType="page"
        sections={sections as never}
      />,
    )

    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('postlist-section')).toBeInTheDocument()
  })

  it('renders fallback for unknown section type', () => {
    const sections = [
      {
        _key: 'unknown-1',
        _type: 'unknownType' as never,
        title: 'Unknown Section',
      },
    ]

    render(
      <PageSections
        documentId="doc-1"
        documentType="page"
        sections={sections as never}
      />,
    )

    expect(screen.getByText(/Component not found/)).toBeInTheDocument()
    expect(screen.getByText('unknownType')).toBeInTheDocument()
  })
})

describe('PageSections optimistic update reducer', () => {
  it('returns current sections when action.id does not match documentId', () => {
    const sections = [{ _key: 'hero-1', _type: 'hero' as const, title: 'Hero' }]

    render(
      <PageSections
        documentId="doc-1"
        documentType="page"
        sections={sections as never}
      />,
    )

    expect(capturedReducer).not.toBeNull()
    const result = capturedReducer!(sections, {
      id: 'different-doc',
      document: { pageSections: [] },
    })
    expect(result).toBe(sections)
  })

  it('returns current sections when action has no pageSections', () => {
    const sections = [{ _key: 'hero-1', _type: 'hero' as const, title: 'Hero' }]

    render(
      <PageSections
        documentId="doc-1"
        documentType="page"
        sections={sections as never}
      />,
    )

    const result = capturedReducer!(sections, {
      id: 'doc-1',
      document: {},
    })
    expect(result).toBe(sections)
  })

  it('merges existing sections with new action sections by _key', () => {
    const currentSections = [
      { _key: 'hero-1', _type: 'hero' as const, title: 'Old Hero' },
      { _key: 'postlist-1', _type: 'postList' as const, title: 'Old Posts' },
    ]

    render(
      <PageSections
        documentId="doc-1"
        documentType="page"
        sections={currentSections as never}
      />,
    )

    const newSections = [
      { _key: 'hero-1', _type: 'hero' as const, title: 'New Hero' },
      { _key: 'postlist-1', _type: 'postList' as const, title: 'New Posts' },
    ]

    const result = capturedReducer!(currentSections, {
      id: 'doc-1',
      document: { pageSections: newSections },
    }) as typeof currentSections

    // Existing sections matched by _key are preserved
    expect(result[0]).toBe(currentSections[0])
    expect(result[1]).toBe(currentSections[1])
  })

  it('uses new section when no matching _key exists in current', () => {
    const currentSections = [
      { _key: 'hero-1', _type: 'hero' as const, title: 'Hero' },
    ]

    render(
      <PageSections
        documentId="doc-1"
        documentType="page"
        sections={currentSections as never}
      />,
    )

    const newSection = {
      _key: 'new-section',
      _type: 'postList' as const,
      title: 'Brand New',
    }

    const result = capturedReducer!(currentSections, {
      id: 'doc-1',
      document: { pageSections: [newSection] },
    }) as typeof currentSections

    expect(result[0]).toBe(newSection)
  })
})
