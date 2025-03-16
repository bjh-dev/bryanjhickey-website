import type { Metadata } from 'next'
import { Noto_Sans, Bitter } from 'next/font/google'
import './globals.css'
import '@calcom/atoms/globals.min.css'

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
})

const bitterFont = Bitter({
  variable: '--font-bitter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bryan J. Hickey | a disciple of Jesus Christ',
  description:
    'Spreading a passion for the Truth, Beauty and Relevance of Jesus Christ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${bitterFont.variable} bg-background antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  )
}
