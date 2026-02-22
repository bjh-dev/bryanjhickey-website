/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from 'next-sanity'

import Link from '@/components/modules/Link'
import ScripturePopover from '@/components/modules/ScripturePopover'
import Image from 'next/image'
import { ReactNode } from 'react'
import { LinkFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'
import { urlForImage } from '@/lib/sanity/client/image'
import {
  BlockQuote,
  HeadingFour,
  HeadingThree,
  HeadingTwo,
  NumberedList,
  BulletList,
  BulletListItem,
  NumberedListItem,
  DefaultText,
  LeadParagraph,
  CodeBlock,
  EmphasisMark,
  StrikeThroughMark,
  StrongMark,
  UnderlineMark,
  HighlightMark,
  SuperScriptMark,
  SubScriptMark,
  CalloutBlock,
  HorizontalRule,
  YouTubeEmbed,
  CodeBlockComponent,
  ImageWithCaption,
} from '@/studio/schema/objects/blockContentComponents'

// ---------------------------------------------------------------------------
// Footnote extraction
// ---------------------------------------------------------------------------

interface FootnoteEntry {
  index: number
  _key: string
  note: PortableTextBlock[]
}

/**
 * Walks blocks in document order, finds footnote annotations, and returns
 * them in the order they first appear in the text. A footnote is counted
 * once — the first time a span references its markDef _key. Subsequent
 * references to the same _key reuse the same index.
 */
export function extractFootnotes(blocks: PortableTextBlock[]): FootnoteEntry[] {
  const footnotes: FootnoteEntry[] = []
  const seen = new Map<string, number>()

  for (const block of blocks) {
    if (block._type !== 'block' || !block.markDefs || !block.children) continue

    const footnoteDefs = new Map<string, PortableTextBlock[]>()
    for (const def of block.markDefs as Array<{
      _key: string
      _type: string
      note?: PortableTextBlock[]
    }>) {
      if (def._type === 'footnote' && def._key && Array.isArray(def.note)) {
        footnoteDefs.set(def._key, def.note)
      }
    }

    if (footnoteDefs.size === 0) continue

    for (const child of block.children as Array<{
      marks?: string[]
    }>) {
      if (!child.marks) continue
      for (const markKey of child.marks) {
        if (footnoteDefs.has(markKey) && !seen.has(markKey)) {
          const index = footnotes.length + 1
          seen.set(markKey, index)
          footnotes.push({
            index,
            _key: markKey,
            note: footnoteDefs.get(markKey)!,
          })
        }
      }
    }
  }

  return footnotes
}

// ---------------------------------------------------------------------------
// Footnote components
// ---------------------------------------------------------------------------

function FootnoteContent({ note }: { note: PortableTextBlock[] }) {
  const footnoteComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => <span>{children}</span>,
    },
    marks: {
      strong: ({ children }) => <StrongMark>{children}</StrongMark>,
      em: ({ children }) => <EmphasisMark>{children}</EmphasisMark>,
      underline: ({ children }) => <UnderlineMark>{children}</UnderlineMark>,
      customLink: ({
        children,
        value,
      }: {
        children: ReactNode
        value?: { customLink: LinkFragmentType }
      }) => {
        const customLink = value?.customLink
        if (!customLink) return <>{children}</>
        return <Link link={customLink}>{children}</Link>
      },
    },
  }

  return <PortableText components={footnoteComponents} value={note} />
}

function FootnotesSection({ footnotes }: { footnotes: FootnoteEntry[] }) {
  return (
    <section
      role="doc-endnotes"
      aria-label="Footnotes"
      className="border-border mt-12 border-t pt-8"
    >
      <h2 className="mb-4 text-lg font-bold">Footnotes</h2>
      <ol className="list-decimal space-y-3 ps-6 text-sm leading-relaxed">
        {footnotes.map((fn) => (
          <li key={fn._key} id={`fn-${fn.index}`}>
            <FootnoteContent note={fn.note} />{' '}
            <a
              href={`#fnref-${fn.index}`}
              role="doc-backlink"
              aria-label={`Back to reference ${fn.index}`}
              className="text-primary text-xs no-underline hover:underline"
            >
              ↩
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function CustomPortableText({
  paragraphStyles,
  value,
}: {
  paragraphStyles?: string
  value: PortableTextBlock[]
}) {
  const footnotes = extractFootnotes(value)
  const footnoteIndexMap = new Map(footnotes.map((fn) => [fn._key, fn.index]))

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <DefaultText paragraphStyles={paragraphStyles}>{children}</DefaultText>
      ),
      default: ({ children }) => (
        <DefaultText paragraphStyles={paragraphStyles}>{children}</DefaultText>
      ),
      h2: ({ children }) => <HeadingTwo>{children}</HeadingTwo>,
      h3: ({ children }) => <HeadingThree>{children}</HeadingThree>,
      h4: ({ children }) => <HeadingFour>{children}</HeadingFour>,
      lead: ({ children }) => <LeadParagraph>{children}</LeadParagraph>,
      blockquote: ({ children }) => <BlockQuote>{children}</BlockQuote>,
    },
    list: {
      bullet: ({ children }) => <BulletList>{children}</BulletList>,
      number: ({ children }) => <NumberedList>{children}</NumberedList>,
    },
    listItem: {
      bullet: ({ children }) => <BulletListItem>{children}</BulletListItem>,
      number: ({ children }) => <NumberedListItem>{children}</NumberedListItem>,
    },
    marks: {
      code: ({ children }) => <CodeBlock>{children}</CodeBlock>,
      em: ({ children }) => <EmphasisMark>{children}</EmphasisMark>,
      customLink: ({
        children,
        value,
      }: {
        children: ReactNode
        value?: { customLink: LinkFragmentType }
      }) => {
        const customLink = value?.customLink
        if (!customLink) {
          return <>{children}</>
        }

        return <Link link={customLink}>{children}</Link>
      },
      link: ({
        children,
        value,
      }: {
        children: ReactNode
        value?: { customLink: LinkFragmentType }
      }) => {
        const customLink = value?.customLink
        if (!customLink) {
          return <>{children}</>
        }

        return <Link link={customLink}>{children}</Link>
      },
      scriptureRef: ({
        children,
        value,
      }: {
        children: ReactNode
        value?: { reference?: string; label?: string }
      }) => {
        const reference = value?.reference
        if (!reference) return <>{children}</>
        return (
          <ScripturePopover reference={reference}>{children}</ScripturePopover>
        )
      },
      footnote: ({
        children,
        value: markValue,
      }: {
        children: ReactNode
        value?: { _key?: string; note?: PortableTextBlock[] }
      }) => {
        const key = markValue?._key
        const index = key ? footnoteIndexMap.get(key) : undefined
        if (!index) return <>{children}</>

        return (
          <>
            {children}
            <sup>
              <a
                id={`fnref-${index}`}
                href={`#fn-${index}`}
                role="doc-noteref"
                aria-label={`Footnote ${index}`}
                className="text-primary ms-0.5 text-xs no-underline hover:underline"
              >
                [{index}]
              </a>
            </sup>
          </>
        )
      },
      strong: ({ children }) => <StrongMark>{children}</StrongMark>,
      'strike-through': ({ children }) => (
        <StrikeThroughMark>{children}</StrikeThroughMark>
      ),
      underline: ({ children }) => <UnderlineMark>{children}</UnderlineMark>,
      highlight: ({ children }) => <HighlightMark>{children}</HighlightMark>,
      sup: ({ children }) => <SuperScriptMark>{children}</SuperScriptMark>,
      sub: ({ children }) => <SubScriptMark>{children}</SubScriptMark>,
    },
    types: {
      image: (props) => {
        const { value } = props
        if (!value) {
          return null
        }

        const imageElement = (
          <div className="overflow-hidden rounded-lg shadow-lg">
            <Image
              width="1000"
              height="667"
              src={urlForImage(value)?.width(1000).height(667).url()}
              alt={value?.alt || 'Content image'}
              className="h-auto w-full"
            />
          </div>
        )

        if (value?.caption) {
          return (
            <ImageWithCaption caption={value.caption}>
              {imageElement}
            </ImageWithCaption>
          )
        }

        return <div className="my-8">{imageElement}</div>
      },
      callout: (props) => {
        return (
          <CalloutBlock
            type={props.value?.calloutType}
            title={props?.value?.title}
            content={props?.value?.content}
          />
        )
      },
      code: (props) => {
        return (
          <CodeBlockComponent
            code={props.value?.code}
            language={props.value?.language}
            filename={props.value?.filename}
          />
        )
      },
      youtubeEmbed: (props) => {
        return (
          <YouTubeEmbed url={props.value?.url} caption={props.value?.caption} />
        )
      },
      hr: () => {
        return <HorizontalRule />
      },
    },
  }

  return (
    <div className={paragraphStyles}>
      <PortableText components={components} value={value} />
      {footnotes.length > 0 && <FootnotesSection footnotes={footnotes} />}
    </div>
  )
}
