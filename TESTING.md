# Testing Guide

This project uses **Vitest** with **React Testing Library** for comprehensive testing coverage.

## Setup

### Dependencies

- **Vitest**: Fast unit test framework
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM testing
- **jsdom**: DOM environment for testing
- **jest-axe**: Accessibility testing
- **@axe-core/react**: Accessibility violation detection

### Configuration

- **vitest.config.ts**: Main test configuration
- **src/test/setup.tsx**: Global test setup and mocks
- **src/test/utils.tsx**: Custom render utilities

## Running Tests

```bash
# Run tests in watch mode
bun test

# Run tests once
bun run test:run

# Run tests with UI
bun run test:ui

# Run tests with coverage
bun run test:coverage
```

## Test Structure

```
src/
├── components/
│   ├── layout/
│   │   └── __tests__/
│   │       └── Navbar.test.tsx
│   └── modules/
│       └── __tests__/
│           ├── PostCard.test.tsx
│           └── CoverImage.test.tsx
├── app/api/
│   └── draft-mode/
│       └── __tests__/
│           └── draft-mode.test.ts
└── test/
    ├── setup.tsx          # Global test setup
    ├── utils.tsx          # Custom render utilities
    └── __tests__/
        └── setup.test.ts  # Basic setup verification
```

## Test Categories

### 1. Unit Tests - Components

**Navbar Component Tests**

- Navigation menu rendering
- Mobile menu toggle functionality
- Dropdown menu behavior
- Menu item interactions
- Accessibility compliance

**PostCard Component Tests**

- Post information display
- Featured post badges
- Link generation
- Image handling
- Graceful error handling

**CoverImage Component Tests**

- Image rendering with asset references
- Placeholder fallbacks
- Alt text handling
- Priority loading
- Responsive behavior

### 2. Integration Tests - API Routes

**Draft Mode API Tests**

- Draft mode enable/disable functionality
- Sanity client integration
- Environment variable requirements
- Response handling

### 3. Accessibility Tests

All component tests include automated accessibility testing using `jest-axe`:

```typescript
it('should be accessible', async () => {
  const { container } = render(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## Mocking Strategy

### Next.js Components

```typescript
// Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

// Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))
```

### Next.js Hooks

```typescript
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    // ... other router methods
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));
```

### Sanity Integration

```typescript
vi.mock("@/lib/sanity/client/image", () => ({
  urlForImage: vi.fn(() => ({
    width: () => ({ height: () => ({ url: () => "mock-image-url.jpg" }) }),
  })),
}));
```

## Environment Variables

Tests require the following environment variables (automatically set in vitest.config.ts):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=test-project
NEXT_PUBLIC_SANITY_DATASET=test
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_API_READ_TOKEN=test-token
```

## Writing Tests

### Component Test Template

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import { axe } from 'jest-axe'
import ComponentName from '../ComponentName'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />)

    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('should be accessible', async () => {
    const { container } = render(<ComponentName />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

### Best Practices

1. **Test Behavior, Not Implementation**

   - Focus on what users see and interact with
   - Avoid testing internal component state

2. **Use Semantic Queries**

   ```typescript
   // Good
   screen.getByRole("button", { name: /submit/i });
   screen.getByLabelText("Email address");

   // Avoid
   container.querySelector(".submit-button");
   ```

3. **Test Accessibility**

   - Include axe testing for all components
   - Verify proper ARIA attributes
   - Test keyboard navigation

4. **Mock External Dependencies**

   - Mock API calls and external services
   - Mock Next.js components that don't affect testing logic
   - Keep mocks simple and focused

5. **Test Error States**
   - Test components with missing props
   - Test error boundaries
   - Test network failures

## Coverage Goals

- **Components**: 90%+ coverage for critical user-facing components
- **API Routes**: 100% coverage for all endpoints
- **Utilities**: 95%+ coverage for shared utility functions
- **Accessibility**: 100% compliance for all interactive components

## Continuous Integration

Tests automatically run on:

- Pre-commit hooks (lint-staged)
- Pull request creation
- Main branch pushes

## Troubleshooting

### Common Issues

1. **JSX Transform Errors**

   - Ensure setup.tsx imports React
   - Check vitest.config.ts has @vitejs/plugin-react

2. **Environment Variable Errors**

   - Verify all required env vars are set in vitest.config.ts
   - Check src/studio/env.ts for required variables

3. **Mock Issues**

   - Clear mocks between tests with vi.clearAllMocks()
   - Check mock implementations match actual API

4. **Accessibility Test Failures**
   - Run axe-core browser extension for detailed violations
   - Check ARIA attributes and semantic HTML usage

---

For more information on testing patterns, see the [Testing Library documentation](https://testing-library.com/docs/react-testing-library/intro/).
