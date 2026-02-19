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
import Image from 'next/image'
import { ReactNode } from 'react'
import { LinkFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'
import { urlForImage } from '@/lib/sanity/client/image'
import {
  BlockQuote,
  HeadingFive,
  HeadingFour,
  HeadingOne,
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
  SuperScriptMark,
  SubScriptMark,
  CalloutBlock,
} from '@/studio/schema/objects/blockContentComponents'

export default function CustomPortableText({
  paragraphStyles,
  value,
}: {
  paragraphStyles?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <DefaultText paragraphStyles={paragraphStyles}>{children}</DefaultText>
      ),
      h1: ({ children }) => <HeadingOne>{children}</HeadingOne>,
      h2: ({ children }) => <HeadingTwo>{children}</HeadingTwo>,
      h3: ({ children }) => <HeadingThree>{children}</HeadingThree>,
      h4: ({ children }) => <HeadingFour>{children}</HeadingFour>,
      h5: ({ children }) => <HeadingFive>{children}</HeadingFive>,
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
      strong: ({ children }) => <StrongMark>{children}</StrongMark>,
      'strike-through': ({ children }) => (
        <StrikeThroughMark>{children}</StrikeThroughMark>
      ),
      underline: ({ children }) => <UnderlineMark>{children}</UnderlineMark>,
      sup: ({ children }) => <SuperScriptMark>{children}</SuperScriptMark>,
      sub: ({ children }) => <SubScriptMark>{children}</SubScriptMark>,
    },
    types: {
      image: (props) => {
        const { value } = props
        if (!value) {
          return null
        }

        return (
          <div className="my-8 overflow-hidden rounded-lg shadow-lg">
            <Image
              width="1000"
              height="667"
              src={urlForImage(value)?.width(1000).height(667).url()}
              alt={value?.alt || 'Content image'}
              className="h-auto w-full"
            />
          </div>
        )
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
    },
  }

  return (
    <div className={paragraphStyles}>
      <PortableText components={components} value={value} />
    </div>
  )
}
