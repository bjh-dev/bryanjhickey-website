import { cn } from '@/lib/utils'
import { slugify } from '@/utils/strings'
import { PortableTextReactComponents } from 'next-sanity'
import { ReactNode } from 'react'

export const LeadParagraph = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-foreground/60 text-xl leading-relaxed lg:text-2xl">
      {children}
    </p>
  )
}

function getHeadingText(children: ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.join(' ')
  return ''
}

export const HeadingOne = ({ children }: { children: ReactNode }) => {
  const headingText = getHeadingText(children)
  return (
    <h1
      id={slugify(headingText)}
      className="scroll-mt-20 py-6 font-serif text-4xl md:text-5xl"
    >
      {children}
    </h1>
  )
}
export const HeadingTwo = ({ children }: { children: ReactNode }) => {
  const headingText = getHeadingText(children)
  return (
    <h2
      id={slugify(headingText)}
      className="scroll-mt-20 py-12 font-serif text-3xl md:text-4xl"
    >
      {children}
    </h2>
  )
}
export const HeadingThree = ({ children }: { children: ReactNode }) => {
  const headingText = getHeadingText(children)
  return (
    <h3
      id={slugify(headingText)}
      className="scroll-mt-20 py-6 font-serif text-3xl md:text-4xl"
    >
      {children}
    </h3>
  )
}
export const HeadingFour = ({ children }: { children: ReactNode }) => {
  const headingText = getHeadingText(children)
  return (
    <h4
      id={slugify(headingText)}
      className="scroll-mt-20 py-6 font-serif text-xl md:text-2xl"
    >
      {children}
    </h4>
  )
}
export const HeadingFive = ({ children }: { children: ReactNode }) => {
  const headingText = getHeadingText(children)
  return (
    <h5
      id={slugify(headingText)}
      className="scroll-mt-20 py-6 font-serif text-lg md:text-xl"
    >
      {children}
    </h5>
  )
}

export const BlockQuote = ({ children }: { children: ReactNode }) => (
  <blockquote className="text-foreground/60 border-border my-12 border-l-4 pl-4 font-serif text-lg leading-relaxed italic lg:text-xl">
    {children}
  </blockquote>
)

export const DefaultText = ({
  children,
  paragraphStyles,
}: {
  children: ReactNode
  paragraphStyles?: string
}) => (
  <p
    className={cn(
      paragraphStyles,
      'mb-6 font-serif text-lg leading-relaxed lg:text-xl',
    )}
  >
    {children}
  </p>
)

export const BulletList = ({ children }: { children: ReactNode }) => (
  <ul className="mb-6 ml-6 list-outside list-disc space-y-2 font-serif text-lg lg:text-xl">
    {children}
  </ul>
)
export const BulletListItem = ({ children }: { children: ReactNode }) => (
  <li className="pl-2">{children}</li>
)
export const NumberedList = ({ children }: { children: ReactNode }) => (
  <ol className="mb-6 ml-6 list-outside list-decimal space-y-2 font-serif text-lg lg:text-xl">
    {children}
  </ol>
)
export const NumberedListItem = ({ children }: { children: ReactNode }) => (
  <li className="pl-2">{children}</li>
)

export const CodeBlock = ({ children }: { children: ReactNode }) => (
  <code className="rounded px-1 py-0.5 font-mono text-sm">{children}</code>
)

export const EmphasisMark = ({ children }: { children: ReactNode }) => (
  <em className="italic">{children}</em>
)
export const StrongMark = ({ children }: { children: ReactNode }) => (
  <strong className="font-bold">{children}</strong>
)

export const StrikeThroughMark = ({ children }: { children: ReactNode }) => (
  <del className="line-through">{children}</del>
)

export const UnderlineMark = ({ children }: { children: ReactNode }) => (
  <u className="underline">{children}</u>
)

export const SuperScriptMark = ({ children }: { children: ReactNode }) => (
  <sup className="text-xs">{children}</sup>
)

export const SubScriptMark = ({ children }: { children: ReactNode }) => (
  <sub className="text-xs">{children}</sub>
)

export const CustomPortableTextComponents: Partial<PortableTextReactComponents> =
  {
    block: {
      h1: ({ children }) => <HeadingOne>{children}</HeadingOne>,
      h2: ({ children }) => <HeadingTwo>{children}</HeadingTwo>,
      h3: ({ children }) => <HeadingThree>{children}</HeadingThree>,
      h4: ({ children }) => <HeadingFour>{children}</HeadingFour>,
      h5: ({ children }) => <HeadingFive>{children}</HeadingFive>,
      lead: ({ children }) => <LeadParagraph>{children}</LeadParagraph>,
      normal: ({ children }) => <DefaultText>{children}</DefaultText>,
      default: ({ children }) => <DefaultText>{children}</DefaultText>,
      blockquote: ({ children }) => <BlockQuote>{children}</BlockQuote>,
    },
    list: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => <BulletList>{children}</BulletList>,
      number: ({ children }) => <NumberedList>{children}</NumberedList>,
    },
    listItem: {
      // Ex. 2: customizing list item types
      bullet: ({ children }) => <BulletListItem>{children}</BulletListItem>,
      number: ({ children }) => <NumberedListItem>{children}</NumberedListItem>,
    },
    marks: {
      code: ({ children }) => <CodeBlock>{children}</CodeBlock>,
      em: ({ children }) => <EmphasisMark>{children}</EmphasisMark>,
      strong: ({ children }) => <StrongMark>{children}</StrongMark>,
      'strike-through': ({ children }) => (
        <StrikeThroughMark>{children}</StrikeThroughMark>
      ),
      underline: ({ children }) => <UnderlineMark>{children}</UnderlineMark>,
      sup: ({ children }) => <SuperScriptMark>{children}</SuperScriptMark>,
      sub: ({ children }) => <SubScriptMark>{children}</SubScriptMark>,
    },
  }
