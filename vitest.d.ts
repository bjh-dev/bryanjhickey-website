/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
/// <reference types="@types/jest-axe" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

interface CustomMatchers<R = unknown> extends TestingLibraryMatchers<
  typeof expect.stringContaining,
  R
> {
  toHaveNoViolations(): R
}

declare module 'vitest' {
  interface Assertion<T = unknown> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
