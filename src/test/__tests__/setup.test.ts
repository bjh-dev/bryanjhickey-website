import { describe, it, expect } from 'vitest'

describe('Test Setup', () => {
  it('should run basic test', () => {
    expect(true).toBe(true)
  })

  it('should have access to expect', () => {
    expect(expect).toBeDefined()
  })
})
