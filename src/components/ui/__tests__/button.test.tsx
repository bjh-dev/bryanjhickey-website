import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Button } from '../button'

describe('Button', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders as a slot when asChild is true', () => {
    render(
      <Button asChild>
        <span data-testid="child-slot">Slot Child</span>
      </Button>,
    )
    const child = screen.getByTestId('child-slot')
    expect(child).toBeInTheDocument()
    expect(child.tagName).toBe('SPAN')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Styled</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('passes through native button props', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
