import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import DateComponent from '../Date'

describe('DateComponent', () => {
  it('renders formatted date when dateString is provided', () => {
    render(<DateComponent dateString="2024-01-15" />)
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
  })

  it('renders a time element with datetime attribute', () => {
    render(<DateComponent dateString="2024-06-01" />)
    const timeEl = screen.getByText('June 1, 2024')
    expect(timeEl.tagName).toBe('TIME')
    expect(timeEl).toHaveAttribute('datetime', '2024-06-01')
  })

  it('returns null when dateString is undefined', () => {
    const { container } = render(<DateComponent dateString={undefined} />)
    expect(container.innerHTML).toBe('')
  })
})
