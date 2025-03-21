import type { Metadata } from 'next'
import { Noto_Sans, Bitter } from 'next/font/google'
import './globals.css'
import Favicon from '@/components/Favicon'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Analytics } from '@vercel/analytics/react'
const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
})

const bitterFont = Bitter({
  variable: '--font-bitter',
  subsets: ['latin'],
})

const localhost = 'http://localhost:3000'
const vercelUrl =
  process.env.VERCEL_ENV === 'preview'
    ? `http://${process.env.VERCEL_BRANCH_URL}`
    : `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'development' ? localhost : vercelUrl,
  ),
  title: 'Bryan J. Hickey — Personal Website',

  description:
    'I have the immense privilege of taking a break from bjh.dev to serve Jesus at my church, City on a Hill Geelong, overseeing theological training of interns, and providing pastoral support.',

  openGraph: {
    title: 'Bryan J. Hickey — Personal Website',
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
  icons: {
    icon: [
      {
        url: '/images/favicons/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
    ],
    shortcut: ['./favicon.ico'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Favicon />
      </head>
      <body className={(notoSans.variable, bitterFont.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="bg-background antialiased">{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
