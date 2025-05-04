/**
 * Do not import Sanity or front-end specific code into this
 * file, it will not be tree shaken effectively across routes
 */

import Favicon from '@/components/layout/Favicon'
import { cn } from '@/lib/utils'
import { Bitter, Noto_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
})

const bitterFont = Bitter({
  variable: '--font-bitter',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn('antialiased', notoSans.variable, bitterFont.variable)}
      suppressHydrationWarning
    >
      <head>
        <Favicon />
      </head>
      {children}
      <Analytics />
    </html>
  )
}
