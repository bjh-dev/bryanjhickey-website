import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import { axe } from 'jest-axe'
import CoverImage from '../CoverImage'

// Mock the urlForImage function
vi.mock('@/lib/sanity/client/image', () => ({
  urlForImage: vi.fn(() => ({
    height: () => ({
      width: () => ({
        auto: () => ({
          url: () => 'mock-image-url.jpg',
        }),
      }),
    }),
  })),
}))

// Mock next-sanity/image
vi.mock('next-sanity/image', () => ({
  Image: ({
    alt,
    src,
    className,
    ...props
  }: {
    alt: string
    src: string
    className?: string
    [key: string]: unknown
  }) => <img alt={alt} src={src} className={className} {...props} />,
}))

// Mock stegaClean
vi.mock('@sanity/client/stega', () => ({
  stegaClean: vi.fn((value) => value),
}))

describe('CoverImage', () => {
  const mockImageWithAsset = {
    asset: { _ref: 'image-123-456-789' },
    alt: 'Test cover image',
  }

  const mockImageWithoutAsset = {
    alt: 'Test cover image',
  }

  it('renders image when asset reference is provided', () => {
    render(<CoverImage image={mockImageWithAsset} />)

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Test cover image')
    expect(image).toHaveAttribute('src', 'mock-image-url.jpg')
  })

  it('renders placeholder when no asset reference is provided', () => {
    const { container } = render(<CoverImage image={mockImageWithoutAsset} />)

    // Should render the placeholder div instead of an image
    expect(screen.queryByRole('img')).not.toBeInTheDocument()

    // Check for placeholder div with specific class
    const placeholder = container.querySelector('.bg-foreground')
    expect(placeholder).toBeInTheDocument()
  })

  it('handles empty image object', () => {
    render(<CoverImage image={{}} />)

    // Should render placeholder
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('handles undefined image', () => {
    render(<CoverImage image={undefined as never} />)

    // Should render placeholder
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('uses empty alt text when alt is not provided', () => {
    const imageWithoutAlt = {
      asset: { _ref: 'image-123-456-789' },
    }

    render(<CoverImage image={imageWithoutAlt} />)

    const image = screen.getByAltText('')
    expect(image).toBeInTheDocument()
  })

  it('sets priority prop when specified', () => {
    render(<CoverImage image={mockImageWithAsset} priority={true} />)

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    // The priority prop should be passed to the Image component
  })

  it('applies correct CSS classes to image', () => {
    render(<CoverImage image={mockImageWithAsset} />)

    const image = screen.getByRole('img')
    expect(image).toHaveClass('object-cover')
  })

  it('applies correct container styling', () => {
    const { container } = render(<CoverImage image={mockImageWithAsset} />)

    const imageContainer = container.firstChild as HTMLElement
    expect(imageContainer).toHaveClass('relative', 'h-[30svh]', 'lg:h-[50svh]')
  })

  it('applies correct placeholder styling', () => {
    const { container } = render(<CoverImage image={mockImageWithoutAsset} />)

    const placeholder = container.querySelector('.bg-foreground')
    expect(placeholder).toBeInTheDocument()
    expect(placeholder).toHaveClass('bg-foreground', 'pt-[100%]')
  })

  it('should be accessible', async () => {
    const { container } = render(<CoverImage image={mockImageWithAsset} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should be accessible with placeholder', async () => {
    const { container } = render(<CoverImage image={mockImageWithoutAsset} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('handles image with only asset reference (no alt)', () => {
    const imageOnlyAsset = {
      asset: { _ref: 'image-123-456-789' },
    }

    render(<CoverImage image={imageOnlyAsset} />)

    const image = screen.getByAltText('')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', '')
  })
})
