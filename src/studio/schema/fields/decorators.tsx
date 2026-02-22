import { BlockDecoratorDefinition } from 'sanity'
import { HighlightIcon } from '@sanity/icons'
import { ReactNode } from 'react'

const HighlightPreview = ({ children }: { children: ReactNode }) => (
  <span style={{ backgroundColor: '#fef08a' }}>{children}</span>
)

const SuperscriptPreview = ({ children }: { children: ReactNode }) => (
  <sup>{children}</sup>
)

const SubscriptPreview = ({ children }: { children: ReactNode }) => (
  <sub>{children}</sub>
)

const SuperscriptIcon = () => (
  <span>
    x<sup style={{ fontSize: '0.7em' }}>2</sup>
  </span>
)

const SubscriptIcon = () => (
  <span>
    x<sub style={{ fontSize: '0.7em' }}>2</sub>
  </span>
)

/**
 * Standard inline decorators available in all block content types.
 */
export const baseDecorators: BlockDecoratorDefinition[] = [
  { title: 'Strong', value: 'strong' },
  { title: 'Emphasis', value: 'em' },
  { title: 'Code', value: 'code' },
  { title: 'Underline', value: 'underline' },
  { title: 'Strike', value: 'strike-through' },
]

/**
 * Extended decorators for longform rich text (posts, book reviews, biographies).
 * Includes base decorators plus highlight, superscript, and subscript.
 */
export const extendedDecorators: BlockDecoratorDefinition[] = [
  ...baseDecorators,
  {
    title: 'Highlight',
    value: 'highlight',
    icon: HighlightIcon,
    component: HighlightPreview,
  },
  {
    title: 'Superscript',
    value: 'sup',
    icon: SuperscriptIcon,
    component: SuperscriptPreview,
  },
  {
    title: 'Subscript',
    value: 'sub',
    icon: SubscriptIcon,
    component: SubscriptPreview,
  },
]
