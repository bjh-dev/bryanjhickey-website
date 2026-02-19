import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { axe } from 'jest-axe'
import { ArchivePagination } from '../ArchivePagination'

describe('ArchivePagination', () => {
  it('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <ArchivePagination totalPages={1} currentPage={1} linkBase="/posts" />,
    )
    expect(container.innerHTML).toBe('')
  })

  it('renders nothing when totalPages is 0', () => {
    const { container } = render(
      <ArchivePagination totalPages={0} currentPage={1} linkBase="/posts" />,
    )
    expect(container.innerHTML).toBe('')
  })

  it('renders pagination for multiple pages', () => {
    render(
      <ArchivePagination totalPages={5} currentPage={1} linkBase="/posts" />,
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('marks the current page as active', () => {
    render(
      <ArchivePagination totalPages={5} currentPage={3} linkBase="/posts" />,
    )

    const page3Link = screen.getByText('3').closest('a')
    expect(page3Link).toHaveAttribute('aria-current', 'page')
  })

  it('does not show previous button on first page', () => {
    render(
      <ArchivePagination totalPages={5} currentPage={1} linkBase="/posts" />,
    )

    expect(screen.queryByText('Previous')).not.toBeInTheDocument()
  })

  it('shows previous button on non-first page', () => {
    render(
      <ArchivePagination totalPages={5} currentPage={3} linkBase="/posts" />,
    )

    expect(screen.getByText('Previous')).toBeInTheDocument()
  })

  it('does not show next button on last page', () => {
    render(
      <ArchivePagination totalPages={5} currentPage={5} linkBase="/posts" />,
    )

    expect(screen.queryByText('Next')).not.toBeInTheDocument()
  })

  it('shows next button on non-last page', () => {
    render(
      <ArchivePagination totalPages={5} currentPage={1} linkBase="/posts" />,
    )

    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('generates correct link for page 1 (base URL)', () => {
    render(
      <ArchivePagination totalPages={5} currentPage={3} linkBase="/posts" />,
    )

    const page1Link = screen.getByText('1').closest('a')
    expect(page1Link).toHaveAttribute('href', '/posts')
  })

  it('generates correct link for other pages', () => {
    render(
      <ArchivePagination totalPages={5} currentPage={1} linkBase="/posts" />,
    )

    const page3Link = screen.getByText('3').closest('a')
    expect(page3Link).toHaveAttribute('href', '/posts/page/3')
  })

  it('does not show ellipsis when all pages are displayed', () => {
    render(
      <ArchivePagination
        totalPages={3}
        currentPage={1}
        linkBase="/posts"
        itemsToShow={5}
      />,
    )

    expect(screen.queryByText('More pages')).not.toBeInTheDocument()
  })

  it('shows ellipsis when not all pages are displayed', () => {
    render(
      <ArchivePagination
        totalPages={20}
        currentPage={1}
        linkBase="/posts"
        itemsToShow={5}
      />,
    )

    // The ellipsis component renders with sr-only "More pages" text
    expect(screen.getByText('More pages')).toBeInTheDocument()
  })

  it('handles currentPage=0 as page 1', () => {
    render(
      <ArchivePagination totalPages={5} currentPage={0} linkBase="/posts" />,
    )

    // Should not show previous button since effective page is 1
    expect(screen.queryByText('Previous')).not.toBeInTheDocument()
  })

  it('should be accessible', async () => {
    const { container } = render(
      <ArchivePagination totalPages={5} currentPage={3} linkBase="/posts" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
