import { PortableTextReactComponents } from 'next-sanity'
import { ReactNode } from 'react'

export const LeadParagraph = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-foreground/40 border-b-primary my-8 mb-8 border-b pb-8 text-xl leading-8 font-medium">
      {children}
    </p>
  )
}

export const HeadingOne = ({ children }: { children: ReactNode }) => (
  <h1 className="mb-8 font-serif text-6xl font-medium">{children}</h1>
)
export const HeadingTwo = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-12 mb-6 font-serif text-4xl font-medium">{children}</h2>
)
export const HeadingThree = ({ children }: { children: ReactNode }) => (
  <h3 className="mt-8 mb-4 font-serif text-3xl font-medium">{children}</h3>
)
export const HeadingFour = ({ children }: { children: ReactNode }) => (
  <h4 className="mt-8 mb-4 font-serif text-2xl font-medium">{children}</h4>
)
export const HeadingFive = ({ children }: { children: ReactNode }) => (
  <h5 className="mt-8 mb-4 font-serif text-xl font-medium">{children}</h5>
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
      normal: ({ children }) => <p className="my-6">{children}</p>,
      default: ({ children }) => <p className="my-6">{children}</p>,
    },
    list: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => (
        <ul className="my-6 ml-4 list-outside list-disc">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="my-6 ml-4 list-outside list-decimal">{children}</ol>
      ),
    },
    listItem: {
      // Ex. 2: customizing list item types
      bullet: ({ children }) => <li className="mt-sm mb-2 pl-4">{children}</li>,
      number: ({ children }) => <li className="mt-sm mb-2 pl-4">{children}</li>,
    },
  }
