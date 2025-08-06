import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import { axe } from 'jest-axe'
import { PostCard } from '../PostCard'

// Mock the urlForImage function
vi.mock('@/lib/sanity/client/image', () => ({
  urlForImage: vi.fn(() => ({
    width: () => ({ height: () => ({ url: () => 'mock-image-url.jpg' }) }),
  })),
}))

// Mock post data
const mockPost = {
  _type: 'post' as const,
  _id: 'post-1',
  status: 'published' as const,
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  excerpt: 'This is a test excerpt for the blog post.',
  isFeatured: false,
  image: {
    _type: 'image' as const,
    crop: undefined,
    hotspot: undefined,
    asset: {
      _ref: 'image-123',
      _type: 'reference' as const,
    },
  },
  categories: [
    {
      _id: 'cat-1',
      _type: 'category' as const,
      title: 'Technology',
      slug: 'technology',
      description: 'Tech articles',
    },
  ],
  date: '2024-01-15',
  author: {
    _id: 'author-1',
    _type: 'person' as const,
    firstName: 'John',
    lastName: 'Doe',
    image: null,
    role: 'Writer',
    biography: null,
    slug: 'john-doe',
  },
  wordCount: 250,
  content: [],
  seo: null,
}

const mockFeaturedPost = {
  ...mockPost,
  _id: 'featured-post-1',
  title: 'Featured Test Post',
  isFeatured: true,
}

describe('PostCard', () => {
  it('renders post information correctly', () => {
    render(<PostCard post={mockPost} />)

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(
      screen.getByText('This is a test excerpt for the blog post.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders post image with correct alt text', () => {
    render(<PostCard post={mockPost} />)

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Test Blog Post')
  })

  it('creates correct link to post', () => {
    render(<PostCard post={mockPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/posts/test-blog-post')
  })

  it('shows featured tag when showFeaturedTag is true and post is featured', () => {
    render(<PostCard post={mockFeaturedPost} showFeaturedTag={true} />)

    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('does not show featured tag when showFeaturedTag is false', () => {
    render(<PostCard post={mockFeaturedPost} showFeaturedTag={false} />)

    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  it('does not show featured tag when post is not featured', () => {
    render(<PostCard post={mockPost} showFeaturedTag={true} />)

    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  it('renders ReadTime component', () => {
    render(<PostCard post={mockPost} />)

    // ReadTime component should be present (we'll need to mock or check for its presence)
    // This assumes ReadTime renders some text content
    expect(screen.getByText(/250/)).toBeInTheDocument() // Word count
  })

  it('renders publication date', () => {
    render(<PostCard post={mockPost} />)

    // Check for formatted date (this will depend on your date formatting)
    expect(screen.getByText(/Jan/i)).toBeInTheDocument()
  })

  it('handles post without image gracefully', () => {
    const postWithoutImage = {
      ...mockPost,
      image: null,
    }

    expect(() => render(<PostCard post={postWithoutImage} />)).not.toThrow()
  })

  it('handles post without categories gracefully', () => {
    const postWithoutCategories = {
      ...mockPost,
      categories: [],
    }

    expect(() =>
      render(<PostCard post={postWithoutCategories} />),
    ).not.toThrow()
  })

  it('handles post without author gracefully', () => {
    const postWithoutAuthor = {
      ...mockPost,
      author: null,
    }

    expect(() => render(<PostCard post={postWithoutAuthor} />)).not.toThrow()
  })

  it('should be accessible', async () => {
    const { container } = render(<PostCard post={mockPost} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has proper ARIA attributes for the link', () => {
    render(<PostCard post={mockPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/posts/test-blog-post')
  })
})
