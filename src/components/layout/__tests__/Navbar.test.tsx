import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@/test/utils'
import { axe } from 'jest-axe'
import Navbar from '../Navbar'

// Mock menu items data
const mockMenuItems = [
  {
    _key: 'item1',
    _type: 'menuItem' as const,
    text: 'Home',
    type: 'link' as const,
    link: {
      _type: 'link' as const,
      type: 'internal' as const,
      openInNewTab: false,
      external: null,
      href: null,
      internal: {
        _id: 'home',
        _type: 'page' as const,
        _createdAt: '2024-01-01',
        _updatedAt: '2024-01-01',
        _rev: '1',
        slug: null,
      },
    },
    childMenu: null,
  },
  {
    _key: 'item2',
    _type: 'menuItem' as const,
    text: 'About',
    type: 'child-menu' as const,
    link: null,
    childMenu: [
      {
        _key: 'child1',
        _type: 'menuItem' as const,
        text: 'Our Story',
        type: 'link' as const,
        link: {
          _type: 'link' as const,
          type: 'internal' as const,
          openInNewTab: false,
          external: null,
          href: null,
          internal: {
            _id: 'about',
            _type: 'page' as const,
            _createdAt: '2024-01-01',
            _updatedAt: '2024-01-01',
            _rev: '1',
            slug: 'about',
          },
        },
      },
    ],
  },
]

describe('Navbar', () => {
  it('renders navigation items correctly', () => {
    render(<Navbar menuItems={mockMenuItems} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders mobile menu toggle button', () => {
    render(<Navbar menuItems={mockMenuItems} />)

    const mobileToggle = screen.getByRole('button', { name: /navbar icon/i })
    expect(mobileToggle).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Navbar menuItems={mockMenuItems} />)

    const mobileToggle = screen.getByRole('button', { name: /navbar icon/i })

    // Mobile menu should be hidden initially (scale-y-0)
    const mobileMenu = screen.getByText('Home').closest('.absolute')
    expect(mobileMenu).toHaveClass('scale-y-0')

    // Click to open mobile menu
    fireEvent.click(mobileToggle)
    expect(mobileMenu).toHaveClass('scale-y-100')

    // Click to close mobile menu
    fireEvent.click(mobileToggle)
    expect(mobileMenu).toHaveClass('scale-y-0')
  })

  it('renders dropdown menu for items with children', () => {
    render(<Navbar menuItems={mockMenuItems} />)

    // Should render the parent item with dropdown trigger
    const aboutTrigger = screen.getByRole('button', { name: 'About' })
    expect(aboutTrigger).toBeInTheDocument()
  })

  it('renders child menu items in mobile view', () => {
    render(<Navbar menuItems={mockMenuItems} />)

    // In mobile view, child items should be visible
    expect(screen.getByText('Our Story')).toBeInTheDocument()
  })

  it('closes mobile menu when a menu item is clicked', () => {
    render(<Navbar menuItems={mockMenuItems} />)

    const mobileToggle = screen.getByRole('button', { name: /navbar icon/i })
    const mobileMenu = screen.getByText('Home').closest('.absolute')

    // Open mobile menu
    fireEvent.click(mobileToggle)
    expect(mobileMenu).toHaveClass('scale-y-100')

    // Click a menu item
    const homeLink = screen.getAllByText('Home')[1] // Get the one in mobile menu
    fireEvent.click(homeLink)

    // Mobile menu should close
    expect(mobileMenu).toHaveClass('scale-y-0')
  })

  it('should be accessible', async () => {
    const { container } = render(<Navbar menuItems={mockMenuItems} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('handles empty menu items gracefully', () => {
    render(<Navbar menuItems={[]} />)

    // Should still render the mobile toggle button
    const mobileToggle = screen.getByRole('button', { name: /navbar icon/i })
    expect(mobileToggle).toBeInTheDocument()
  })
})
