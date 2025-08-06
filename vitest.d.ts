/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
/// <reference types="@types/jest-axe" />
/* eslint-disable @typescript-eslint/no-empty-object-type */

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

interface CustomMatchers<R = unknown>
  extends TestingLibraryMatchers<typeof expect.stringContaining, R> {
  toHaveNoViolations(): R
}

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
