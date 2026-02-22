import { sanityFetch } from '@/lib/sanity/client/live'
import { settingsQuery } from '@/lib/sanity/queries/queries'
import { Logo } from '@/components/icons/Logo'
import Link from 'next/link'
import { ThemeSwitcher } from '@/components/modules/theme-switcher'
import SocialMedia from '@/components/modules/SocialMedia'

export default async function Footer() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  if (!settings) {
    return null
  }

  return (
    <footer className="bg-foreground/5 text-foreground relative py-12 md:py-16">
      <div className="content feature">
        <Link
          className="flex items-center justify-center space-x-4 pb-6 md:justify-start"
          href="/"
        >
          <Logo animate={false} />
          <span className="sr-only">{settings.title}</span>
        </Link>

        <div className="grid grid-cols-1 items-start justify-center gap-12 text-center md:grid-cols-3 md:text-left">
          <div>
            <div className="mb-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{settings.title}</h3>
              <p className="font-serif text-sm">{settings.description}</p>
            </div>
          </div>
          <div>
            {settings.footerMenu && (
              <>
                <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="transition-colors hover:text-gray-900"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="transition-colors hover:text-gray-900"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="transition-colors hover:text-gray-900"
                    >
                      Posts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="transition-colors hover:text-gray-900"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
          <div className="flex flex-col gap-6">
            {settings.socials && (
              <nav
                aria-label="Social media links"
                className="flex w-full items-center justify-center space-x-4 md:justify-end"
              >
                {settings.socials.map((social) => {
                  return (
                    <SocialMedia
                      key={social._key}
                      platform={social.platform!}
                      url={social.url!}
                    />
                  )
                })}
                <ThemeSwitcher />
              </nav>
            )}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-gray-200 text-center text-xs md:flex-row md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {settings.title}. All rights
            reserved.
          </p>
          <p className="text-foreground/60">
            Designed, coded &amp; deployed by Bryan &mdash; not a theme.
          </p>
        </div>
      </div>
      <div className="bg-primary absolute right-0 bottom-0 left-0 h-2"></div>
    </footer>
  )
}
