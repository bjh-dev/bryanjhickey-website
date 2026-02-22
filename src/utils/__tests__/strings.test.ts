import { describe, it, expect } from 'vitest'
import {
  slugify,
  slugifyRegex,
  parseChildrenToSlug,
  capitalize,
  upperCaseWords,
  wordCount,
  readTime,
  formatDate,
  getHeadingTextFromPortable,
  getTextFromReactNode,
  getHeadingsFromPortableText,
} from '../strings'
import type { PortableTextBlock } from 'next-sanity'

describe('slugify', () => {
  it('converts text to lowercase kebab-case', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world')
  })

  it('handles accented characters via NFD normalization', () => {
    expect(slugify('café')).toBe('cafe')
  })

  it('trims whitespace', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world')
  })

  it('replaces multiple spaces with single hyphen', () => {
    expect(slugify('Hello   World')).toBe('hello-world')
  })

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('')
  })

  it('returns empty string for falsy input', () => {
    expect(slugify(undefined as unknown as string)).toBe('')
  })
})

describe('slugifyRegex', () => {
  it('matches valid slugs', () => {
    expect(slugifyRegex.test('hello-world')).toBe(true)
    expect(slugifyRegex.test('hello123')).toBe(true)
  })

  it('rejects slugs with special characters', () => {
    expect(slugifyRegex.test('hello world')).toBe(false)
    expect(slugifyRegex.test('hello!')).toBe(false)
  })
})

describe('parseChildrenToSlug', () => {
  it('joins children text and slugifies', () => {
    const children = [
      { text: 'Hello ' },
      { text: 'World' },
    ] as PortableTextBlock['children']
    expect(parseChildrenToSlug(children)).toBe('hello-world')
  })

  it('returns empty string for undefined children', () => {
    expect(
      parseChildrenToSlug(
        undefined as unknown as PortableTextBlock['children'],
      ),
    ).toBe('')
  })
})

describe('capitalize', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('handles single character', () => {
    expect(capitalize('h')).toBe('H')
  })

  it('handles empty string', () => {
    expect(capitalize('')).toBe('')
  })
})

describe('upperCaseWords', () => {
  it('capitalizes first letter of each word', () => {
    expect(upperCaseWords('hello world')).toBe('Hello World')
  })

  it('handles single word', () => {
    expect(upperCaseWords('hello')).toBe('Hello')
  })
})

describe('wordCount', () => {
  it('counts words in a string', () => {
    expect(wordCount('hello world foo')).toBe(3)
  })

  it('handles extra whitespace', () => {
    expect(wordCount('  hello   world  ')).toBe(2)
  })

  it('returns 0 for empty string', () => {
    expect(wordCount('')).toBe(0)
  })
})

describe('readTime', () => {
  it('calculates read time at 180 wpm', () => {
    expect(readTime(180)).toBe(1)
    expect(readTime(360)).toBe(2)
  })

  it('rounds up to nearest minute', () => {
    expect(readTime(181)).toBe(2)
    expect(readTime(1)).toBe(1)
  })

  it('returns 0 for 0 words', () => {
    expect(readTime(0)).toBe(0)
  })
})

describe('formatDate', () => {
  it('formats date string in long format to en-AU locale by default', () => {
    const result = formatDate('long', '2024-01-15')
    expect(result).toBe('15 January 2024')
  })

  it('formats date string with custom locale', () => {
    const result = formatDate('long', '2024-01-15', 'en-US')
    expect(result).toBe('January 15, 2024')
  })

  it('formats date string in short format', () => {
    const result = formatDate('short', '2024-06-01T12:00:00.000Z')
    expect(result).toContain('24')
    expect(result).toContain('Jun')
  })
})

describe('getHeadingTextFromPortable', () => {
  it('extracts heading text from portable text blocks', () => {
    const blocks = [
      {
        _type: 'block',
        _key: '1',
        style: 'h2',
        children: [{ text: 'First Heading' }],
      },
      {
        _type: 'block',
        _key: '2',
        style: 'normal',
        children: [{ text: 'Normal paragraph' }],
      },
      {
        _type: 'block',
        _key: '3',
        style: 'h3',
        children: [{ text: 'Second Heading' }],
      },
    ] as PortableTextBlock[]

    expect(getHeadingTextFromPortable(blocks)).toBe(
      'First Heading Second Heading',
    )
  })

  it('returns empty string for non-array input', () => {
    expect(
      getHeadingTextFromPortable(null as unknown as PortableTextBlock[]),
    ).toBe('')
  })

  it('returns empty string when no headings exist', () => {
    const blocks = [
      {
        _type: 'block',
        _key: '1',
        style: 'normal',
        children: [{ text: 'Just a paragraph' }],
      },
    ] as PortableTextBlock[]

    expect(getHeadingTextFromPortable(blocks)).toBe('')
  })
})

describe('getTextFromReactNode', () => {
  it('returns string directly', () => {
    expect(getTextFromReactNode('hello')).toBe('hello')
  })

  it('joins array of strings', () => {
    expect(getTextFromReactNode(['hello', ' world'])).toBe('hello  world')
  })

  it('extracts text from objects with props.children string', () => {
    const node = [{ props: { children: 'test' } }]
    expect(getTextFromReactNode(node)).toBe('test')
  })

  it('extracts text from objects with props.children array', () => {
    const node = [{ props: { children: ['hello', ' world'] } }]
    expect(getTextFromReactNode(node)).toBe('hello  world')
  })

  it('returns empty string for unsupported types', () => {
    expect(getTextFromReactNode(123)).toBe('')
    expect(getTextFromReactNode(null)).toBe('')
  })
})

describe('getHeadingsFromPortableText', () => {
  it('returns only heading blocks', () => {
    const blocks = [
      {
        _type: 'block',
        _key: '1',
        style: 'h2',
        children: [{ text: 'Heading' }],
      },
      {
        _type: 'block',
        _key: '2',
        style: 'normal',
        children: [{ text: 'Paragraph' }],
      },
      {
        _type: 'block',
        _key: '3',
        style: 'h3',
        children: [{ text: 'Sub Heading' }],
      },
    ] as PortableTextBlock[]

    const headings = getHeadingsFromPortableText(blocks)
    expect(headings).toHaveLength(2)
    expect(headings[0].style).toBe('h2')
    expect(headings[1].style).toBe('h3')
  })

  it('returns empty array when no headings', () => {
    const blocks = [
      {
        _type: 'block',
        _key: '1',
        style: 'normal',
        children: [{ text: 'Just text' }],
      },
    ] as PortableTextBlock[]

    expect(getHeadingsFromPortableText(blocks)).toHaveLength(0)
  })

  it('filters out blocks without children', () => {
    const blocks = [
      { _type: 'block', _key: '1', style: 'h2' },
    ] as PortableTextBlock[]

    expect(getHeadingsFromPortableText(blocks)).toHaveLength(0)
  })
})
