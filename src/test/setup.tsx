import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll, vi, expect } from 'vitest'
import { toHaveNoViolations } from 'jest-axe'
import React from 'react'

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations)

// Mock CSS modules
vi.mock('*.css', () => ({}))
vi.mock('*.scss', () => ({}))

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string
    alt: string
    [key: string]: unknown
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  },
}))

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
    [key: string]: unknown
  }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

// Setup and teardown
beforeAll(() => {
  // Setup code that runs before all tests
})

afterEach(() => {
  // Cleanup after each test
  vi.clearAllMocks()
})

afterAll(() => {
  // Cleanup after all tests
})
