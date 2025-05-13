import { draftMode } from 'next/headers'
import '../globals.css'
// import Alert from '@/components/layout/Alert'
import DraftModeToast from '@/components/modules/DraftModeToast'
import { VisualEditing } from 'next-sanity'
import { Toaster } from 'sonner'
import { SanityLive } from '@/lib/sanity/client/live'
import Header from '@/components/layout/Header'
import Main from '@/components/layout/Main'
import Footer from '@/components/layout/Footer'
import { handleError } from '@/app/(frontend)/client-utils'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <body className="font-noto-sans antialiased">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        enableColorScheme
        disableTransitionOnChange
      >
        <section className="min-h-screen">
          {/* <Alert /> */}
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />

          <Header />
          <Main>{children}</Main>
          <Footer />
        </section>
      </ThemeProvider>
      <Analytics />
    </body>
  )
}
