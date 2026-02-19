import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { axe } from 'jest-axe'
import ReadTime from '../ReadTime'

describe('ReadTime', () => {
  it('renders reading time for a given word count', () => {
    render(<ReadTime wordCount={360} />)

    expect(screen.getByText(/2 mins/)).toBeInTheDocument()
    expect(screen.getByText('reading time')).toBeInTheDocument()
  })

  it('renders singular "min" for 1 minute', () => {
    render(<ReadTime wordCount={180} />)

    expect(screen.getByText(/1 min/)).toBeInTheDocument()
    // Should NOT have "mins" (plural)
    expect(screen.queryByText(/mins/)).not.toBeInTheDocument()
  })

  it('rounds up reading time', () => {
    // 181 words / 180 wpm = 1.006 -> ceil = 2
    render(<ReadTime wordCount={181} />)

    expect(screen.getByText(/2 mins/)).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ReadTime wordCount={360} className="text-xs" />,
    )

    const readTimeElement = container.querySelector('.text-xs')
    expect(readTimeElement).toBeInTheDocument()
  })

  it('should be accessible', async () => {
    const { container } = render(<ReadTime wordCount={360} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
