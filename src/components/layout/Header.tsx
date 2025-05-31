import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client/live'
import { settingsQuery } from '@/lib/sanity/queries/queries'
import { Logo } from '@/components/icons/Logo'
import NavBar from '@/components/layout/Navbar'
import FadeXAnimation from '@/components/animations/FadeXAnimation'
import { Button } from '@/components/ui/button'

export default async function Header({
  hasHero = true,
}: {
  hasHero?: boolean
}) {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  if (!settings) {
    return null
  }

  return (
    <header className="relative z-50 -mb-20 h-20">
      <div className="content feature">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-4">
            {typeof settings.title !== 'undefined' && (
              <Link className="flex items-center space-x-4" href="/">
                <Logo lightLogo={hasHero ?? false} animate />
                <span className="sr-only">{settings.title}</span>
              </Link>
            )}
          </div>
          <div className="flex space-x-2">
            <FadeXAnimation xStartValue={20} delay={3}>
              <Button asChild size="lg">
                <Link href="/booking">Book a Time with Bryan</Link>
              </Button>
            </FadeXAnimation>
            {settings.menu && <NavBar menuItems={settings.menu || []} />}
          </div>
        </div>
      </div>
    </header>
  )
}
