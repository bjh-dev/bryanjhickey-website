import type { Metadata } from 'next'
import { Noto_Sans, Bitter } from 'next/font/google'
import '@/app/globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Analytics } from '@vercel/analytics/react'
import { SanityLive } from '@/sanity/lib/live'
import { DisableDraftMode } from '@/components/DisableDraftMode'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import { cn } from '@/lib/utils'
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

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={cn(notoSans.variable, bitterFont.variable)}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main className="bg-background antialiased" role="main">
          {children}
          <SanityLive />
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
        </main>
      </ThemeProvider>
      <Analytics />
    </div>
  )
}
