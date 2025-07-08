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
