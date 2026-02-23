import { Button, type buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import { ButtonFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'
import { getLinkByLinkObject } from '@/lib/links'
import Link from 'next/link'
import type { VariantProps } from 'class-variance-authority'

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>

export default function ButtonsGroup({
  buttons,
  size = 'xl',
  className,
  variantMap,
}: {
  buttons: ButtonFragmentType[]
  size?: 'xl' | 'lg' | 'sm' | 'default' | 'icon'
  className?: string
  variantMap?: Partial<Record<ButtonVariant, ButtonVariant>>
}) {
  return (
    <div className={cn('flex flex-col gap-4 md:flex-row', className)}>
      {buttons.map((button) => {
        const variant =
          variantMap?.[button.variant as ButtonVariant] ?? button.variant
        return (
          <Button asChild variant={variant} size={size} key={button._key}>
            <Link
              href={button.link ? (getLinkByLinkObject(button.link) ?? '') : ''}
              target={button.link?.openInNewTab ? '_blank' : '_self'}
            >
              {button.text}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}
