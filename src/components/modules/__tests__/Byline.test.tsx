import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import { axe } from 'jest-axe'
import Byline from '../Byline'

vi.mock('@/lib/sanity/client/image', () => ({
  urlForImage: vi.fn(() => ({
    url: vi.fn(() => 'mock-image-url.jpg'),
  })),
}))

const mockPost = {
  _type: 'post' as const,
  _id: 'post-1',
  status: 'published' as const,
  title: 'Test Post',
  slug: 'test-post',
  excerpt: 'Test excerpt',
  isFeatured: false,
  _updatedAt: '2024-02-20T12:00:00.000Z',
  image: null,
  categories: [
    {
      _id: 'cat-1',
      _type: 'category' as const,
      title: 'Technology',
      slug: 'technology',
      description: 'Tech articles',
    },
    {
      _id: 'cat-2',
      _type: 'category' as const,
      title: 'Design',
      slug: 'design',
      description: 'Design articles',
    },
  ],
  date: '2024-01-15',
  author: null,
  wordCount: 360,
  content: [],
  seo: null,
  headings: [],
}

describe('Byline', () => {
  it('renders reading time', () => {
    render(<Byline post={mockPost as never} />)

    expect(screen.getByText(/2 mins/)).toBeInTheDocument()
  })

  it('renders publication date', () => {
    render(<Byline post={mockPost as never} />)

    expect(screen.getByText(/First Published:/)).toBeInTheDocument()
  })

  it('renders last edited date', () => {
    render(<Byline post={mockPost as never} />)

    expect(screen.getByText(/Last Edited:/)).toBeInTheDocument()
  })

  it('renders category badges', () => {
    render(<Byline post={mockPost as never} />)

    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('Design')).toBeInTheDocument()
  })

  it('links categories to correct URLs', () => {
    render(<Byline post={mockPost as never} />)

    const techLink = screen.getByText('Technology').closest('a')
    expect(techLink).toHaveAttribute('href', '/category/technology')

    const designLink = screen.getByText('Design').closest('a')
    expect(designLink).toHaveAttribute('href', '/category/design')
  })

  it('does not render categories section when empty', () => {
    const postWithoutCategories = {
      ...mockPost,
      categories: [],
    }

    render(<Byline post={postWithoutCategories as never} />)

    expect(screen.queryByText('Technology')).not.toBeInTheDocument()
  })

  it('does not render read time when wordCount is 0', () => {
    const postWithZeroWords = {
      ...mockPost,
      wordCount: 0,
    }

    render(<Byline post={postWithZeroWords as never} />)

    expect(screen.queryByText('reading time')).not.toBeInTheDocument()
  })

  it('should be accessible', async () => {
    const { container } = render(<Byline post={mockPost as never} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
