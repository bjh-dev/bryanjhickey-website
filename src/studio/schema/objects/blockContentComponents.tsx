import CustomPortableText from '@/components/modules/PortableText'
import { cn } from '@/lib/utils'
import { slugify, getTextFromReactNode } from '@/utils/strings'
import { AlertCircle, CircleQuestionMark, Info } from 'lucide-react'
import { PortableTextBlock, PortableTextReactComponents } from 'next-sanity'
import { ReactNode } from 'react'

export const LeadParagraph = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-foreground/60 text-xl leading-relaxed lg:text-2xl">
      {children}
    </p>
  )
}

export const HeadingOne = ({ children }: { children: ReactNode }) => {
  const headingText = getTextFromReactNode(children)
  return (
    <h1
      id={slugify(headingText)}
      className="py-6 font-serif text-4xl first-of-type:pt-0 md:text-5xl"
    >
      {children}
    </h1>
  )
}
export const HeadingTwo = ({ children }: { children: ReactNode }) => {
  const headingText = getTextFromReactNode(children)

  return (
    <h2
      id={slugify(headingText)}
      className="py-6 font-serif text-3xl first-of-type:pt-0 md:text-4xl"
    >
      {children}
    </h2>
  )
}
export const HeadingThree = ({ children }: { children: ReactNode }) => {
  const headingText = getTextFromReactNode(children)
  return (
    <h3
      id={slugify(headingText)}
      className="py-6 font-serif text-3xl first-of-type:pt-0 md:text-4xl"
    >
      {children}
    </h3>
  )
}
export const HeadingFour = ({ children }: { children: ReactNode }) => {
  const headingText = getTextFromReactNode(children)
  return (
    <h4
      id={slugify(headingText)}
      className="py-6 font-serif text-xl first-of-type:pt-0 md:text-2xl"
    >
      {children}
    </h4>
  )
}
export const HeadingFive = ({ children }: { children: ReactNode }) => {
  const headingText = getTextFromReactNode(children)
  return (
    <h5
      id={slugify(headingText)}
      className="py-6 font-serif text-lg first-of-type:pt-0 md:text-xl"
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

export const CalloutBlock = ({
  content,
  type = 'info',
  title = 'callout',
}: {
  type?: 'info' | 'question' | 'caution'
  title?: string
  content: PortableTextBlock[]
}) => (
  <div
    className={cn(
      'border-border bg-background my-6 rounded-lg border p-6',
      type === 'info' && 'border-green-600 bg-green-50 dark:bg-green-950',
      type === 'question' && 'border-blue-600 bg-blue-50 dark:bg-blue-950',
      type === 'caution' &&
        'border-yellow-4000 bg-yellow-50 dark:bg-yellow-950',
    )}
  >
    <div className="flex items-center gap-2 pb-2">
      {type === 'info' && <Info className="h-4 w-4" />}
      {type === 'question' && <CircleQuestionMark className="h-4 w-4" />}
      {type === 'caution' && <AlertCircle className="h-4 w-4" />}
      <h3 className="text-sm font-bold">{title}</h3>
    </div>
    <CustomPortableText
      value={content}
      paragraphStyles="text-sm! font-sans! last-of-type:mb-0!"
    />
  </div>
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
      'mb-6 font-serif text-lg leading-relaxed font-normal lg:text-xl',
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
