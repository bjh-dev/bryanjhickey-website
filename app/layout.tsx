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
  title:
    'Bryan J. Hickey — Proclaiming the truth, beauty and relevance of Jesus.',
  description:
    'I have the immense privilege of taking a break from bjh.dev to serve Jesus at my church, City on a Hill Geelong, overseeing theological training of interns, and providing pastoral support.',

  openGraph: {
    title:
      'Bryan J. Hickey — Proclaiming the truth, beauty and relevance of Jesus.',
    description:
      'I have the immense privilege of taking a break from bjh.dev to serve Jesus at my church, City on a Hill Geelong, overseeing theological training of interns, and providing pastoral support.',
    url: 'https://www.bryanjhickey.com',
    type: 'website',
    siteName: 'bryanjhickey.com',
    images: [
      {
        url: '/images/share-icon.png',
        width: 1200,
        height: 630,
        alt: 'Bryan smiling at the camera in an office at night.',
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
