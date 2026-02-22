import type { PortableTextBlock } from 'next-sanity'

export const slugifyRegex = /^[a-zA-Z0-9-]+$/u

export const slugify = (text: string) => {
  return text
    ? text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
    : ''
}

export function parseChildrenToSlug(children: PortableTextBlock['children']) {
  if (!children) return ''
  return slugify(children.map((child) => child.text).join(''))
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const upperCaseWords = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export const wordCount = (str: string) => {
  return str.split(/\s+/).filter(Boolean).length
}

export const formatDate = (
  format: 'short' | 'long',
  dateString: string,
  locale = 'en-AU',
) => {
  if (format === 'short') {
    return new Date(dateString).toLocaleDateString(locale, {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
    })
  }
  if (format === 'long') {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  return new Date(dateString).toLocaleDateString(locale)
}

export const readTime = (wordCount: number) => {
  const wordsPerMinute = 180

  return Math.ceil(wordCount / wordsPerMinute)
}

export function getHeadingTextFromPortable(
  blocks: PortableTextBlock[],
): string {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .filter(
      (block) =>
        typeof block.style === 'string' &&
        /^h[1-5]$/.test(block.style) &&
        Array.isArray(block.children),
    )
    .map((block) =>
      (block.children as { text?: string }[])
        .map((child) => child.text ?? '')
        .join(' '),
    )
    .join(' ')
}

export function getTextFromReactNode(children: unknown): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) {
    return children
      .map((child) => {
        if (typeof child === 'string') return child
        if (
          typeof child === 'object' &&
          child &&
          'props' in child &&
          child.props &&
          typeof child.props.children === 'string'
        ) {
          return child.props.children
        }
        if (
          typeof child === 'object' &&
          child &&
          'props' in child &&
          child.props &&
          Array.isArray(child.props.children)
        ) {
          return child.props.children.join(' ')
        }
        return ''
      })
      .join(' ')
  }
  return ''
}

// Bible book canonical ordering (Genesis = 1 … Revelation = 66)
export const BIBLE_BOOK_ORDER: Record<string, number> = {
  Genesis: 1,
  Exodus: 2,
  Leviticus: 3,
  Numbers: 4,
  Deuteronomy: 5,
  Joshua: 6,
  Judges: 7,
  Ruth: 8,
  '1 Samuel': 9,
  '2 Samuel': 10,
  '1 Kings': 11,
  '2 Kings': 12,
  '1 Chronicles': 13,
  '2 Chronicles': 14,
  Ezra: 15,
  Nehemiah: 16,
  Esther: 17,
  Job: 18,
  Psalms: 19,
  Psalm: 19,
  Proverbs: 20,
  Ecclesiastes: 21,
  'Song of Solomon': 22,
  Isaiah: 23,
  Jeremiah: 24,
  Lamentations: 25,
  Ezekiel: 26,
  Daniel: 27,
  Hosea: 28,
  Joel: 29,
  Amos: 30,
  Obadiah: 31,
  Jonah: 32,
  Micah: 33,
  Nahum: 34,
  Habakkuk: 35,
  Zephaniah: 36,
  Haggai: 37,
  Zechariah: 38,
  Malachi: 39,
  Matthew: 40,
  Mark: 41,
  Luke: 42,
  John: 43,
  Acts: 44,
  Romans: 45,
  '1 Corinthians': 46,
  '2 Corinthians': 47,
  Galatians: 48,
  Ephesians: 49,
  Philippians: 50,
  Colossians: 51,
  '1 Thessalonians': 52,
  '2 Thessalonians': 53,
  '1 Timothy': 54,
  '2 Timothy': 55,
  Titus: 56,
  Philemon: 57,
  Hebrews: 58,
  James: 59,
  '1 Peter': 60,
  '2 Peter': 61,
  '1 John': 62,
  '2 John': 63,
  '3 John': 64,
  Jude: 65,
  Revelation: 66,
}

export function extractBookFromReference(reference: string): string {
  const match = reference.match(/^(\d\s+\w+|\w+(?:\s+of\s+\w+)?|\w+)/)
  return match ? match[1] : reference
}

export function sortByBibleOrder(a: string, b: string): number {
  const orderA = BIBLE_BOOK_ORDER[a] ?? 999
  const orderB = BIBLE_BOOK_ORDER[b] ?? 999
  return orderA - orderB
}

export function getHeadingsFromPortableText(
  blocks: PortableTextBlock[],
): PortableTextBlock[] {
  // Return all heading blocks (h1-h5)
  return blocks.filter(
    (block) =>
      block &&
      typeof block.style === 'string' &&
      /^h[1-5]$/.test(block.style) &&
      Array.isArray(block.children),
  )
}
