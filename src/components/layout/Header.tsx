import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client/live'
import { settingsQuery } from '@/lib/sanity/queries/queries'
import { Logo } from '@/components/icons/Logo'
import NavBar from '@/components/layout/Navbar'

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  if (!settings) {
    return null
  }

  return (
    <header className="relative z-50 -mb-20 h-20">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
        <div className="flex items-center space-x-4">
          {typeof settings.title !== 'undefined' && (
            <Link className="flex items-center space-x-4" href="/">
              <Logo lightLogo animate />
              <span className="sr-only">{settings.title}</span>
            </Link>
          )}
        </div>
        <NavBar menuItems={settings.menu || []} />
      </div>
    </header>
  )
}
