import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { axe } from 'jest-axe'
import { PortableTextBlock } from 'next-sanity'
import CustomPortableText, {
  extractFootnotes,
} from '@/components/modules/PortableText'

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

const singleFootnoteBlocks: PortableTextBlock[] = [
  {
    _key: 'block1',
    _type: 'block',
    style: 'normal',
    children: [
      { _key: 'span1', _type: 'span', text: 'Some text', marks: ['fn1'] },
      { _key: 'span2', _type: 'span', text: ' and more.', marks: [] },
    ],
    markDefs: [
      {
        _key: 'fn1',
        _type: 'footnote',
        note: [
          {
            _key: 'note1',
            _type: 'block',
            style: 'normal',
            children: [
              {
                _key: 'notespan1',
                _type: 'span',
                text: 'This is the footnote.',
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
      },
    ],
  },
]

const multiFootnoteBlocks: PortableTextBlock[] = [
  {
    _key: 'block1',
    _type: 'block',
    style: 'normal',
    children: [
      { _key: 'span1', _type: 'span', text: 'First ref', marks: ['fn1'] },
      { _key: 'span2', _type: 'span', text: ' middle ', marks: [] },
      { _key: 'span3', _type: 'span', text: 'second ref', marks: ['fn2'] },
    ],
    markDefs: [
      {
        _key: 'fn1',
        _type: 'footnote',
        note: [
          {
            _key: 'n1',
            _type: 'block',
            style: 'normal',
            children: [
              { _key: 's1', _type: 'span', text: 'Footnote one.', marks: [] },
            ],
            markDefs: [],
          },
        ],
      },
      {
        _key: 'fn2',
        _type: 'footnote',
        note: [
          {
            _key: 'n2',
            _type: 'block',
            style: 'normal',
            children: [
              { _key: 's2', _type: 'span', text: 'Footnote two.', marks: [] },
            ],
            markDefs: [],
          },
        ],
      },
    ],
  },
]

const formattedFootnoteBlocks: PortableTextBlock[] = [
  {
    _key: 'block1',
    _type: 'block',
    style: 'normal',
    children: [
      { _key: 'span1', _type: 'span', text: 'Annotated', marks: ['fn1'] },
    ],
    markDefs: [
      {
        _key: 'fn1',
        _type: 'footnote',
        note: [
          {
            _key: 'n1',
            _type: 'block',
            style: 'normal',
            children: [
              {
                _key: 's1',
                _type: 'span',
                text: 'Bold text',
                marks: ['strong'],
              },
              { _key: 's2', _type: 'span', text: ' and ', marks: [] },
              {
                _key: 's3',
                _type: 'span',
                text: 'italic text',
                marks: ['em'],
              },
            ],
            markDefs: [],
          },
        ],
      },
    ],
  },
]

const unreferencedFootnoteBlocks: PortableTextBlock[] = [
  {
    _key: 'block1',
    _type: 'block',
    style: 'normal',
    children: [
      { _key: 'span1', _type: 'span', text: 'No footnote here.', marks: [] },
    ],
    markDefs: [
      {
        _key: 'fn1',
        _type: 'footnote',
        note: [
          {
            _key: 'n1',
            _type: 'block',
            style: 'normal',
            children: [
              {
                _key: 's1',
                _type: 'span',
                text: 'Orphaned footnote.',
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// extractFootnotes unit tests
// ---------------------------------------------------------------------------

describe('extractFootnotes', () => {
  it('returns empty array for content without footnotes', () => {
    expect(extractFootnotes(plainBlocks)).toEqual([])
  })

  it('extracts a single footnote with index 1', () => {
    const result = extractFootnotes(singleFootnoteBlocks)
    expect(result).toHaveLength(1)
    expect(result[0].index).toBe(1)
    expect(result[0]._key).toBe('fn1')
  })

  it('extracts multiple footnotes in document order', () => {
    const result = extractFootnotes(multiFootnoteBlocks)
    expect(result).toHaveLength(2)
    expect(result[0].index).toBe(1)
    expect(result[0]._key).toBe('fn1')
    expect(result[1].index).toBe(2)
    expect(result[1]._key).toBe('fn2')
  })

  it('excludes unreferenced footnote markDefs', () => {
    const result = extractFootnotes(unreferencedFootnoteBlocks)
    expect(result).toEqual([])
  })

  it('skips non-block types (images, code, etc.)', () => {
    const blocks: PortableTextBlock[] = [
      {
        _key: 'img1',
        _type: 'image',
        asset: {},
      } as unknown as PortableTextBlock,
      ...singleFootnoteBlocks,
    ]
    const result = extractFootnotes(blocks)
    expect(result).toHaveLength(1)
    expect(result[0]._key).toBe('fn1')
  })
})

// ---------------------------------------------------------------------------
// CustomPortableText rendering tests
// ---------------------------------------------------------------------------

describe('CustomPortableText', () => {
  it('renders content without footnotes and no footer', () => {
    render(<CustomPortableText value={plainBlocks} />)

    expect(screen.getByText('Hello world.')).toBeInTheDocument()
    expect(screen.queryByRole('doc-endnotes')).not.toBeInTheDocument()
  })

  it('renders superscript footnote reference inline', () => {
    render(<CustomPortableText value={singleFootnoteBlocks} />)

    const ref = screen.getByRole('doc-noteref')
    expect(ref).toBeInTheDocument()
    expect(ref).toHaveTextContent('[1]')
    expect(ref.tagName).toBe('A')
    expect(ref.closest('sup')).not.toBeNull()
  })

  it('renders footnote reference with correct anchor IDs and hrefs', () => {
    render(<CustomPortableText value={singleFootnoteBlocks} />)

    const ref = screen.getByRole('doc-noteref')
    expect(ref).toHaveAttribute('id', 'fnref-1')
    expect(ref).toHaveAttribute('href', '#fn-1')
  })

  it('renders footnotes section with correct structure', () => {
    render(<CustomPortableText value={singleFootnoteBlocks} />)

    const footer = screen.getByRole('doc-endnotes')
    expect(footer).toBeInTheDocument()
    expect(footer.tagName).toBe('SECTION')

    expect(screen.getByText('Footnotes')).toBeInTheDocument()
    expect(screen.getByText('This is the footnote.')).toBeInTheDocument()
  })

  it('renders footnote list item with correct ID', () => {
    render(<CustomPortableText value={singleFootnoteBlocks} />)

    const listItem = screen.getByRole('doc-endnotes').querySelector('#fn-1')
    expect(listItem).not.toBeNull()
    expect(listItem?.tagName).toBe('LI')
  })

  it('renders back-link with correct href and role', () => {
    render(<CustomPortableText value={singleFootnoteBlocks} />)

    const backLink = screen.getByRole('doc-backlink')
    expect(backLink).toHaveAttribute('href', '#fnref-1')
    expect(backLink).toHaveTextContent('↩')
  })

  it('renders multiple footnotes with sequential numbering', () => {
    render(<CustomPortableText value={multiFootnoteBlocks} />)

    const refs = screen.getAllByRole('doc-noteref')
    expect(refs).toHaveLength(2)
    expect(refs[0]).toHaveTextContent('[1]')
    expect(refs[1]).toHaveTextContent('[2]')

    const backLinks = screen.getAllByRole('doc-backlink')
    expect(backLinks).toHaveLength(2)
    expect(backLinks[0]).toHaveAttribute('href', '#fnref-1')
    expect(backLinks[1]).toHaveAttribute('href', '#fnref-2')
  })

  it('renders formatted footnote content (bold, italic)', () => {
    render(<CustomPortableText value={formattedFootnoteBlocks} />)

    const footer = screen.getByRole('doc-endnotes')
    const bold = footer.querySelector('strong')
    expect(bold).not.toBeNull()
    expect(bold).toHaveTextContent('Bold text')

    const italic = footer.querySelector('em')
    expect(italic).not.toBeNull()
    expect(italic).toHaveTextContent('italic text')
  })

  it('does not render unreferenced footnotes', () => {
    render(<CustomPortableText value={unreferencedFootnoteBlocks} />)

    expect(screen.queryByRole('doc-endnotes')).not.toBeInTheDocument()
    expect(screen.queryByText('Orphaned footnote.')).not.toBeInTheDocument()
  })

  it('has correct ARIA attributes', () => {
    render(<CustomPortableText value={singleFootnoteBlocks} />)

    const footer = screen.getByRole('doc-endnotes')
    expect(footer).toHaveAttribute('aria-label', 'Footnotes')

    const ref = screen.getByRole('doc-noteref')
    expect(ref).toHaveAttribute('aria-label', 'Footnote 1')

    const backLink = screen.getByRole('doc-backlink')
    expect(backLink).toHaveAttribute('aria-label', 'Back to reference 1')
  })

  it('should be accessible', async () => {
    const { container } = render(
      <CustomPortableText value={singleFootnoteBlocks} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
