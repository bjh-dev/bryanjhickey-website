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
import { PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { parseChildrenToSlug } from '@/utils/strings'
import { LinkFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'
import { urlForImage } from '@/lib/sanity/client/image'

type HeadingProps = PropsWithChildren<{
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  id: string
  className?: string
}>

function Heading({ as, id, children, className = '' }: HeadingProps) {
  const Element = as
  return (
    <Element className={cn('group relative', className)}>
      {children}
      <a
        href={`#${id}`}
        className="absolute top-0 bottom-0 left-0 -ml-6 flex items-center opacity-0 transition-opacity group-hover:opacity-100"
        title="Copy link to heading"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </a>
    </Element>
  )
}

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p
          className={cn(
            'text-foreground mb-6 font-serif text-lg leading-relaxed lg:text-xl',
            className,
          )}
        >
          {children}
        </p>
      ),
      h1: ({ children, value }) => (
        <Heading
          as="h1"
          id={parseChildrenToSlug(value.children)}
          className="text-foreground/80 scroll-mt-20 py-6 font-serif text-4xl md:text-5xl"
        >
          {children}
        </Heading>
      ),
      h2: ({ children, value }) => (
        <Heading
          as="h2"
          id={parseChildrenToSlug(value.children)}
          className="text-foreground/80 scroll-mt-20 py-12 font-serif text-3xl md:text-4xl"
        >
          {children}
        </Heading>
      ),
      h3: ({ children, value }) => (
        <Heading
          as="h3"
          id={parseChildrenToSlug(value.children)}
          className="scroll-mt-20 py-6 font-serif text-3xl md:text-4xl"
        >
          {children}
        </Heading>
      ),
      h4: ({ children, value }) => (
        <Heading
          as="h4"
          id={parseChildrenToSlug(value.children)}
          className="scroll-mt-20 py-6 font-serif text-xl md:text-2xl"
        >
          {children}
        </Heading>
      ),
      h5: ({ children, value }) => (
        <Heading
          as="h5"
          id={parseChildrenToSlug(value.children)}
          className="scroll-mt-20 py-6 font-serif text-lg md:text-xl"
        >
          {children}
        </Heading>
      ),
      h6: ({ children, value }) => (
        <Heading
          as="h6"
          id={parseChildrenToSlug(value.children)}
          className="scroll-mt-20 py-6 font-serif text-base md:text-lg"
        >
          {children}
        </Heading>
      ),
      blockquote: ({ children }) => (
        <blockquote className="text-foreground/60 border-border my-12 border-l-4 pl-4 font-serif text-lg leading-relaxed italic lg:text-xl">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-6 ml-6 list-outside list-disc space-y-2 font-serif text-lg lg:text-xl">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mb-6 ml-6 list-outside list-decimal space-y-2 font-serif text-lg lg:text-xl">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="pl-2">{children}</li>,
      number: ({ children }) => <li className="pl-2">{children}</li>,
    },
    marks: {
      code: ({ children }) => (
        <code className="rounded px-1 py-0.5 font-mono text-sm">
          {children}
        </code>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
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

        return (
          <Link
            link={customLink}
            className="text-primary/80 hover:decoration-primary hover:text-primary underline underline-offset-2 transition-all"
          >
            {children}
          </Link>
        )
      },
      strong: ({ children }) => (
        <strong className="font-bold">{children}</strong>
      ),
      'strike-through': ({ children }) => (
        <del className="line-through">{children}</del>
      ),
      underline: ({ children }) => <u className="underline">{children}</u>,
      sup: ({ children }) => <sup className="text-xs">{children}</sup>,
      sub: ({ children }) => <sub className="text-xs">{children}</sub>,
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
              alt={value?.alt ?? ''}
              className="h-auto w-full"
            />
          </div>
        )
      },
    },
  }

  return (
    <div className={className}>
      <PortableText components={components} value={value} />
    </div>
  )
}
