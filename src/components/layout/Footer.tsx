import { sanityFetch } from '@/lib/sanity/client/live'
import { settingsQuery } from '@/lib/sanity/queries/queries'
import { Logo } from '@/components/icons/Logo'
import Link from 'next/link'
import { ThemeSwitcher } from '@/components/modules/theme-switcher'
import SocialMedia from '@/components/modules/SocialMedia'
import CustomPortableText from '@/components/modules/PortableText'
import { PortableTextBlock } from 'next-sanity'

type SocialType = {
  _key: string
  platform?:
    | 'facebook'
    | 'instagram'
    | 'linkedin'
    | 'twitter'
    | 'youtube'
    | 'tiktok'
  url?: string
}

export default async function Footer() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  if (!settings) {
    return null
  }

  return (
    <footer className="bg-accent text-foreground border-foreground relative border-2 border-t py-12 md:py-16">
      <div className="content feature">
        <div className="grid grid-cols-1 gap-18 md:grid-cols-5">
          <div className="col-span-2">
            <div className="mb-4 flex flex-col gap-2">
              <Link className="flex items-center space-x-4" href="/">
                <Logo animate={false} />
                <span className="sr-only">{settings.title}</span>
              </Link>
              <h3 className="mt-4 text-lg font-semibold">{settings.title}</h3>
              {settings.footerText && (
                <CustomPortableText
                  value={settings.footerText as PortableTextBlock[]}
                  className="!text-sm"
                />
              )}
            </div>
          </div>
          <div className="col-span-1">
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

          <div className="col-span-1">
            {settings.socials && (
              <div className="flex space-x-4">
                {settings.socials.map((social: SocialType) => {
                  return (
                    <SocialMedia
                      key={social._key}
                      platform={social.platform!}
                      url={social.url!}
                    />
                  )
                })}
              </div>
            )}

            <div className="mt-8 flex items-center gap-4">
              <div>
                <p>Theme:</p>
              </div>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-xs">
          <p>
            &copy; {new Date().getFullYear()} {settings.title}. All rights
            reserved.
          </p>
        </div>
      </div>
      <div className="bg-primary absolute right-0 bottom-0 left-0 h-2"></div>
    </footer>
  )
}
