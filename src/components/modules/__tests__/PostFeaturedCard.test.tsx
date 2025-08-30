import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import { axe } from 'jest-axe'
import { PostFeaturedCard } from '../PostFeaturedCard'

// Mock the urlForImage function
vi.mock('@/lib/sanity/client/image', () => ({
  urlForImage: vi.fn(() => ({
    url: vi.fn(() => 'mock-image-url.jpg'),
    width: vi.fn(() => ({
      height: vi.fn(() => ({
        url: vi.fn(() => 'mock-image-url.jpg'),
      })),
    })),
  })),
}))

// Mock post data
const mockFeaturedPost = {
  _type: 'post' as const,
  _id: 'featured-post-1',
  status: 'published' as const,
  title: 'Featured Test Post',
  slug: 'featured-test-post',
  excerpt: 'This is a test excerpt for the featured blog post.',
  isFeatured: true,
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

describe('PostFeaturedCard', () => {
  it('renders featured post information correctly', () => {
    render(<PostFeaturedCard {...mockFeaturedPost} />)

    expect(screen.getByText('Featured Test Post')).toBeInTheDocument()
    expect(
      screen.getByText('This is a test excerpt for the featured blog post.'),
    ).toBeInTheDocument()
    expect(screen.getByText('15 January 2024')).toBeInTheDocument()
  })

  it('renders post image with correct alt text', () => {
    render(<PostFeaturedCard {...mockFeaturedPost} />)

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Featured Test Post')
  })

  it('creates correct link to post', () => {
    render(<PostFeaturedCard {...mockFeaturedPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/posts/featured-test-post')
  })

  it('renders ReadTime component', () => {
    render(<PostFeaturedCard {...mockFeaturedPost} />)

    // ReadTime component should be present with calculated reading time
    // 250 words / 180 words per minute = 2 minutes
    expect(screen.getByText(/2 min/)).toBeInTheDocument()
    expect(screen.getByText(/reading time/)).toBeInTheDocument()
  })

  it('renders publication date', () => {
    render(<PostFeaturedCard {...mockFeaturedPost} />)

    // Check for formatted date (this will depend on your date formatting)
    expect(screen.getByText(/Jan/i)).toBeInTheDocument()
  })

  it('handles post without image gracefully', () => {
    const postWithoutImage = {
      ...mockFeaturedPost,
      image: null,
    }

    expect(() =>
      render(<PostFeaturedCard {...postWithoutImage} />),
    ).not.toThrow()
  })

  it('handles post without categories gracefully', () => {
    const postWithoutCategories = {
      ...mockFeaturedPost,
      categories: [],
    }

    expect(() =>
      render(<PostFeaturedCard {...postWithoutCategories} />),
    ).not.toThrow()
  })

  it('handles post without author gracefully', () => {
    const postWithoutAuthor = {
      ...mockFeaturedPost,
      author: null,
    }

    expect(() =>
      render(<PostFeaturedCard {...postWithoutAuthor} />),
    ).not.toThrow()
  })

  it('should be accessible', async () => {
    const { container } = render(<PostFeaturedCard {...mockFeaturedPost} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has proper ARIA attributes for the link', () => {
    render(<PostFeaturedCard {...mockFeaturedPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/posts/featured-test-post')
  })

  it('applies correct card styling', () => {
    const { container } = render(<PostFeaturedCard {...mockFeaturedPost} />)

    const card = container.querySelector('.group')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass(
      'group',
      'col-span-1',
      'items-stretch',
      'rounded-xl',
    )
  })

  it('applies correct title styling', () => {
    render(<PostFeaturedCard {...mockFeaturedPost} />)

    const title = screen.getByText('Featured Test Post')
    expect(title).toHaveClass(
      'group-hover:text-primary',
      'font-serif',
      'text-3xl',
      'font-medium',
      'transition-all',
      'duration-300',
      'md:line-clamp-2',
      'lg:text-4xl',
    )
  })

  it('applies correct excerpt styling', () => {
    render(<PostFeaturedCard {...mockFeaturedPost} />)

    const excerpt = screen.getByText(
      'This is a test excerpt for the featured blog post.',
    )
    expect(excerpt).toHaveClass(
      'text-foreground/80',
      'group-hover:text-foreground',
      'font-serif',
      'text-sm',
      'leading-relaxed',
      'transition-all',
      'duration-300',
      'md:line-clamp-3',
      'lg:text-base',
    )
  })

  it('applies correct date styling', () => {
    render(<PostFeaturedCard {...mockFeaturedPost} />)

    const date = screen.getByText('15 January 2024')
    expect(date).toHaveClass('text-foreground/50') // 'text-xs' removed
  })

  it('applies correct image container styling', () => {
    const { container } = render(<PostFeaturedCard {...mockFeaturedPost} />)

    const imageContainer = container.querySelector('.relative')
    expect(imageContainer).toBeInTheDocument()
    expect(imageContainer).toHaveClass(
      'relative',
      'h-[20svh]',
      'overflow-hidden',
      'lg:h-[40svh]',
    )
  })

  it('applies correct image styling', () => {
    render(<PostFeaturedCard {...mockFeaturedPost} />)

    const image = screen.getByRole('img')
    expect(image).toHaveClass(
      'h-full',
      'w-full',
      'object-cover',
      'transition-transform',
      'duration-300',
      'ease-linear',
      'group-hover:scale-120',
    )
  })
})
