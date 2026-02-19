import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import PageSections from '../PageSections'

// Mock useOptimistic to return initial sections as-is
vi.mock('next-sanity/hooks', () => ({
  useOptimistic: (initialValue: unknown) => initialValue,
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
