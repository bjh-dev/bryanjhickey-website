import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { axe } from 'jest-axe'
import { PortableTextBlock } from 'next-sanity'
import CustomPortableText from '@/components/modules/PortableText'

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

const plainBlocks: PortableTextBlock[] = [
  {
    _key: 'block1',
    _type: 'block',
    style: 'normal',
    children: [
      { _key: 'span1', _type: 'span', text: 'Hello world.', marks: [] },
    ],
    markDefs: [],
  },
]

// ---------------------------------------------------------------------------
// CustomPortableText rendering tests
// ---------------------------------------------------------------------------

describe('CustomPortableText', () => {
  it('renders content without footnotes and no footer', () => {
    render(<CustomPortableText value={plainBlocks} />)

    expect(screen.getByText('Hello world.')).toBeInTheDocument()
    expect(screen.queryByRole('doc-endnotes')).not.toBeInTheDocument()
  })

  it('should be accessible', async () => {
    const { container } = render(<CustomPortableText value={plainBlocks} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
