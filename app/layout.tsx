import type { Metadata } from 'next'
import { Noto_Sans, Bitter } from 'next/font/google'
import './globals.css'

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
  description: 'Proclaiming the truth, beauty and relevance of Jesus.',

  openGraph: {
    title: 'Bryan J. Hickey | a disciple of Jesus Christ',
    description: 'Proclaiming the truth, beauty and relevance of Jesus.',
    url: 'https://www.bryanjhickey.com',
    type: 'website',
    siteName: 'bryanjhickey.com',
    images: [
      {
        url: 'https://www.bryanjhickey.com/images/sahre-image.png',
        width: 1200,
        height: 630,
        alt: 'Bryan J. Hickey | a disciple of Jesus Christ',
      },
    ],
  },
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
