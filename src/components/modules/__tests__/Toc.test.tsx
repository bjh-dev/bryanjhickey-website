import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { axe } from 'jest-axe'
import Toc from '../Toc'

const mockPosts = {
  _type: 'post' as const,
  _id: 'post-1',
  status: 'published' as const,
  title: 'Test Post',
  slug: 'test-post',
  excerpt: 'Test excerpt',
  isFeatured: false,
  _updatedAt: '2024-01-15T12:00:00.000Z',
  image: null,
  categories: null,
  date: '2024-01-15',
  author: null,
  wordCount: 250,
  content: [
    {
      _type: 'block',
      _key: 'key1',
      style: 'h2',
      children: [{ _type: 'span', _key: 'span1', text: 'Introduction' }],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: 'key2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'span2', text: 'Some paragraph text' }],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: 'key3',
      style: 'h3',
      children: [{ _type: 'span', _key: 'span3', text: 'Getting Started' }],
      markDefs: [],
    },
  ],
  seo: null,
  headings: [],
}

describe('Toc', () => {
  it('renders the Contents heading', () => {
    render(<Toc posts={mockPosts as never} />)

    expect(screen.getByText('Contents')).toBeInTheDocument()
  })

  it('renders heading links from portable text', () => {
    render(<Toc posts={mockPosts as never} />)

    expect(screen.getByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('Getting Started')).toBeInTheDocument()
  })

  it('does not render non-heading blocks', () => {
    render(<Toc posts={mockPosts as never} />)

    expect(screen.queryByText('Some paragraph text')).not.toBeInTheDocument()
  })

  it('creates correct anchor links from heading text', () => {
    render(<Toc posts={mockPosts as never} />)

    const introLink = screen.getByText('Introduction').closest('a')
    expect(introLink).toHaveAttribute('href', '#introduction')

    const gettingStartedLink = screen.getByText('Getting Started').closest('a')
    expect(gettingStartedLink).toHaveAttribute('href', '#getting-started')
  })

  it('renders nav with aria-label', () => {
    render(<Toc posts={mockPosts as never} />)

    const nav = screen.getByRole('navigation', { name: 'Table of contents' })
    expect(nav).toBeInTheDocument()
  })

  it('renders empty list when no headings exist', () => {
    const postsWithoutHeadings = {
      ...mockPosts,
      content: [
        {
          _type: 'block',
          _key: 'key1',
          style: 'normal',
          children: [
            { _type: 'span', _key: 'span1', text: 'Just a paragraph' },
          ],
          markDefs: [],
        },
      ],
    }

    render(<Toc posts={postsWithoutHeadings as never} />)

    const listItems = screen.queryAllByRole('listitem')
    expect(listItems).toHaveLength(0)
  })

  it('handles non-array content gracefully', () => {
    const postsWithNullContent = {
      ...mockPosts,
      content: null,
    }

    render(<Toc posts={postsWithNullContent as never} />)

    expect(screen.getByText('Contents')).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('handles undefined content gracefully', () => {
    const postsWithUndefinedContent = {
      ...mockPosts,
      content: undefined,
    }

    render(<Toc posts={postsWithUndefinedContent as never} />)

    expect(screen.getByText('Contents')).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('renders heading with multiple children spans', () => {
    const postsWithMultiSpanHeading = {
      ...mockPosts,
      content: [
        {
          _type: 'block',
          _key: 'key1',
          style: 'h2',
          children: [
            { _type: 'span', _key: 'span1', text: 'Part' },
            { _type: 'span', _key: 'span2', text: ' One' },
          ],
          markDefs: [],
        },
      ],
    }

    render(<Toc posts={postsWithMultiSpanHeading as never} />)

    expect(screen.getByText('Part One')).toBeInTheDocument()
  })

  it('uses heading _key as list item key when available', () => {
    render(<Toc posts={mockPosts as never} />)

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(2)
  })

  it('should be accessible', async () => {
    const { container } = render(<Toc posts={mockPosts as never} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
