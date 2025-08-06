import { render as rtlRender } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

// Re-export everything from testing-library/react
export * from '@testing-library/react'

// Custom render function that can be extended in the future
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return rtlRender(ui, options)
}

// Override the default render export
export { customRender as render }
