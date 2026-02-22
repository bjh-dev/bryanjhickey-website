import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test/utils'
import { axe } from 'jest-axe'
import BibleQuoteOfTheDay from '../BibleQuoteOfTheDay'

vi.mock('@/utils/dailyVerses', () => ({
  getDailyVerse: () => 'Psalm 23',
}))

vi.mock('@/components/modules/PortableText', () => ({
  default: ({ value }: { value: unknown[] }) => (
    <div data-testid="portable-text">{value.length} blocks</div>
  ),
}))

const mockPassageResponse = {
  passages: ['The LORD is my shepherd; I shall not want.'],
  canonical: 'Psalm 23',
}

function createSection(overrides = {}) {
  return {
    title: 'Bible Quote of the Day',
    ...overrides,
  } as never
}

describe('BibleQuoteOfTheDay', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders loading skeleton initially', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {})),
    )

    render(<BibleQuoteOfTheDay section={createSection()} />)

    const skeleton = document.querySelector('.animate-pulse')
    expect(skeleton).toBeInTheDocument()
  })

  it('renders verse after fetch resolves', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPassageResponse),
        }),
      ),
    )

    render(<BibleQuoteOfTheDay section={createSection()} />)

    await waitFor(() => {
      expect(
        screen.getByText('The LORD is my shepherd; I shall not want.'),
      ).toBeInTheDocument()
    })

    expect(screen.getByText(/Psalm 23 — ESV/)).toBeInTheDocument()
  })

  it('renders title', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPassageResponse),
        }),
      ),
    )

    render(
      <BibleQuoteOfTheDay
        section={createSection({ title: 'Verse of the Day' })}
      />,
    )

    await waitFor(() => {
      expect(screen.getByText('Verse of the Day')).toBeInTheDocument()
    })
  })

  it('renders eyebrow when provided', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPassageResponse),
        }),
      ),
    )

    render(
      <BibleQuoteOfTheDay
        section={createSection({ eyebrow: 'Daily Reading' })}
      />,
    )

    await waitFor(() => {
      expect(screen.getByText('Daily Reading')).toBeInTheDocument()
    })
  })

  it('does not render eyebrow when not provided', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPassageResponse),
        }),
      ),
    )

    render(<BibleQuoteOfTheDay section={createSection()} />)

    await waitFor(() => {
      expect(
        screen.getByText('The LORD is my shepherd; I shall not want.'),
      ).toBeInTheDocument()
    })

    expect(screen.queryByText('Daily Reading')).not.toBeInTheDocument()
  })

  it('renders optional content via PortableText', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPassageResponse),
        }),
      ),
    )

    const contentBlocks = [{ _type: 'block', children: [] }]

    render(
      <BibleQuoteOfTheDay
        section={createSection({ content: contentBlocks })}
      />,
    )

    await waitFor(() => {
      expect(screen.getByTestId('portable-text')).toBeInTheDocument()
    })
  })

  it('returns null on fetch error with no data', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Network error'))),
    )

    const { container } = render(
      <BibleQuoteOfTheDay section={createSection()} />,
    )

    await waitFor(() => {
      const skeleton = container.querySelector('.animate-pulse')
      expect(skeleton).not.toBeInTheDocument()
    })

    // Should render nothing since data.passages is undefined
    expect(container.querySelector('blockquote')).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPassageResponse),
        }),
      ),
    )

    const { container } = render(
      <BibleQuoteOfTheDay
        section={createSection({ eyebrow: 'Daily Reading' })}
      />,
    )

    await waitFor(() => {
      expect(
        screen.getByText('The LORD is my shepherd; I shall not want.'),
      ).toBeInTheDocument()
    })

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
