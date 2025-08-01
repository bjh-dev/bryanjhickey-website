import NextLink from 'next/link'

import { LinkFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'
import { getLinkByLinkObject } from '@/lib/links'
import { cn } from '@/lib/utils'

interface LinkProps {
  link: LinkFragmentType
  children: React.ReactNode
  className?: string
}

export default function Link({ link, children, className }: LinkProps) {
  const url = getLinkByLinkObject(link)
  if (url) {
    return (
      <NextLink
        href={url}
        target={link.openInNewTab ? '_blank' : undefined}
        rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
        className={cn(
          'decoration-primary hover:decoration-foreground/50 underline decoration-2 underline-offset-2 transition',
          className,
        )}
      >
        {children}
      </NextLink>
    )
  }
  return <>{children}</>
}
