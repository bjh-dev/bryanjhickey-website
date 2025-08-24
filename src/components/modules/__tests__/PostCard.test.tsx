import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import { axe } from 'jest-axe'
import { PostCard } from '../PostCard'

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
  it('renders post information correctly without image', () => {
    render(<PostCard post={mockPost} />)

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(
      screen.getByText('This is a test excerpt for the blog post.'),
    ).toBeInTheDocument()
    expect(screen.getByText('15 January 2024')).toBeInTheDocument()
  })

  it('does not render image by default', () => {
    render(<PostCard post={mockPost} />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders post image when showImage is true', () => {
    render(<PostCard post={mockPost} showImage={true} />)

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Test Blog Post')
  })

  it('creates correct link to post', () => {
    render(<PostCard post={mockPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/posts/test-blog-post')
  })

  it('shows featured tag when showFeaturedTag and showImage are true and post is featured', () => {
    render(
      <PostCard
        post={mockFeaturedPost}
        showFeaturedTag={true}
        showImage={true}
      />,
    )

    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('does not show featured tag when showFeaturedTag is false', () => {
    render(
      <PostCard
        post={mockFeaturedPost}
        showFeaturedTag={false}
        showImage={true}
      />,
    )

    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  it('does not show featured tag when showImage is false', () => {
    render(
      <PostCard
        post={mockFeaturedPost}
        showFeaturedTag={true}
        showImage={false}
      />,
    )

    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  it('does not show featured tag when post is not featured', () => {
    render(<PostCard post={mockPost} showFeaturedTag={true} showImage={true} />)

    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  it('renders ReadTime component', () => {
    render(<PostCard post={mockPost} />)

    // ReadTime component should be present with calculated reading time
    // 250 words / 180 words per minute = 2 minutes
    expect(screen.getByText(/2 minute/)).toBeInTheDocument()
    expect(screen.getByText(/reading time/)).toBeInTheDocument()
  })

  it('renders publication date', () => {
    render(<PostCard post={mockPost} />)

    // Check for formatted date (this will depend on your date formatting)
    expect(screen.getByText(/Jan/i)).toBeInTheDocument()
  })

  it('shows date and read time when showImage is false', () => {
    render(<PostCard post={mockPost} showImage={false} />)

    expect(screen.getByText('15 January 2024')).toBeInTheDocument()
    expect(screen.getByText(/2 minute/)).toBeInTheDocument()
  })

  it('shows date and read time when showImage is true', () => {
    render(<PostCard post={mockPost} showImage={true} />)

    expect(screen.getByText('15 January 2024')).toBeInTheDocument()
    expect(screen.getByText(/2 minute/)).toBeInTheDocument()
  })

  it('handles post without image gracefully', () => {
    const postWithoutImage = {
      ...mockPost,
      image: null,
    }

    expect(() =>
      render(<PostCard post={postWithoutImage} showImage={true} />),
    ).not.toThrow()
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

  it('should be accessible with image', async () => {
    const { container } = render(<PostCard post={mockPost} showImage={true} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has proper ARIA attributes for the link', () => {
    render(<PostCard post={mockPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/posts/test-blog-post')
  })

  it('applies correct card styling', () => {
    const { container } = render(<PostCard post={mockPost} />)

    const card = container.querySelector('.group')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass(
      'group',
      'hover:bg-foreground/2',
      'relative',
      'h-full',
      'border-none',
      'bg-transparent',
      'p-6',
      'transition-all',
      'duration-300',
    )
  })

  it('applies correct title styling', () => {
    render(<PostCard post={mockPost} />)

    const title = screen.getByText('Test Blog Post')
    expect(title).toHaveClass(
      'group-hover:text-primary',
      'font-serif',
      'text-xl',
      'transition-all',
      'duration-300',
      'md:line-clamp-2',
      'lg:font-bold',
    )
  })

  it('applies correct excerpt styling', () => {
    render(<PostCard post={mockPost} />)

    const excerpt = screen.getByText(
      'This is a test excerpt for the blog post.',
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
    render(<PostCard post={mockPost} />)

    const date = screen.getByText('15 January 2024')
    expect(date).toHaveClass('text-foreground/50', 'text-xs')
  })

  it('applies correct featured tag styling when shown', () => {
    render(
      <PostCard
        post={mockFeaturedPost}
        showFeaturedTag={true}
        showImage={true}
      />,
    )

    const featuredTag = screen.getByText('Featured')
    expect(featuredTag).toHaveClass(
      'bg-primary',
      'absolute',
      'top-2',
      'right-2',
      'z-10',
      'rounded',
      'px-2',
      'py-1',
      'text-xs',
      'font-semibold',
      'text-white',
    )
  })
})
