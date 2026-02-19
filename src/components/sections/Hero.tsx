import FadeXAnimation from '@/components/animations/FadeXAnimation'
import FadeYAnimation from '@/components/animations/FadeYAnimation'
import { bryanHeroDataUri } from '@/lib/dataUris'
import Image from 'next/image'
import { FaFacebook, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import CustomPortableText from '@/components/modules/PortableText'
import { urlForImage } from '@/lib/sanity/client/image'
import { PortableTextBlock } from 'next-sanity'
import { track } from '@vercel/analytics'
import { HeroSection } from '@/components/sections/types'

export default function Hero({ section }: { section: HeroSection }) {
  return (
    <section className="relative h-[85svh] overflow-hidden bg-black">
      {section.image && (
        <Image
          src={urlForImage(section.image).url()}
          fill
          priority
          placeholder="blur"
          blurDataURL={bryanHeroDataUri}
          alt="Bryan J. Hickey"
          className="pointer-events-none object-cover object-top-right"
        />
      )}
      <div className="content feature h-full">
        <div className="mt-12 max-w-xl self-center md:mt-0">
          <div className="relative flex flex-col text-white lg:space-y-2">
            <FadeXAnimation xStartValue={-10} delay={0.25}>
              {' '}
              <h1 className="text-primary max-w-3xl font-medium tracking-wider uppercase lg:text-lg">
                {section.title}
              </h1>
            </FadeXAnimation>
            <FadeXAnimation xStartValue={-10} delay={1} duration={0.75}>
              <p className="font-serif text-2xl sm:text-4xl lg:text-5xl">
                {section.subtitle}
              </p>
            </FadeXAnimation>
            <FadeXAnimation xStartValue={-10} delay={1.24} duration={0.75}>
              <div className="bg-primary my-6 h-0.5 w-1/4 max-w-30" />
            </FadeXAnimation>
            {section.content && (
              <FadeXAnimation xStartValue={-10} delay={1.5} duration={0.75}>
                <CustomPortableText
                  value={section.content as PortableTextBlock[]}
                  paragraphStyles="leading-relaxed text-white lg:text-lg [&_a]:font-sans [&_a]:font-medium [&_a]:text-[0.9em] [&_a]:text-primary [&_a]:hover:text-white [&_a]:hover:decoration-white"
                />
              </FadeXAnimation>
            )}
            <nav
              aria-label="Social media links"
              className="text-primary flex gap-4"
            >
              <FadeYAnimation delay={1.75}>
                <a
                  href="https://www.facebook.com/bryanjhickey"
                  target="_blank"
                  rel="nofollow noopener"
                  onClick={() => {
                    track('Social Platform', {
                      platform: 'facebook',
                      location: 'hero',
                    })
                  }}
                >
                  <p className="sr-only">Facebook Link</p>
                  <FaFacebook className="h-6 w-6 transition-colors hover:text-white" />
                </a>
              </FadeYAnimation>
              <FadeYAnimation delay={2}>
                <a
                  href="https://www.linkedin.com/in/bryanjhickey"
                  target="_blank"
                  rel="nofollow noopener"
                  onClick={() => {
                    track('Social Platform', {
                      platform: 'linkedin',
                      location: 'hero',
                    })
                  }}
                >
                  <p className="sr-only">LinkedIn Link</p>
                  <FaLinkedinIn className="h-6 w-6 transition-colors hover:text-white" />
                </a>
              </FadeYAnimation>
              <FadeYAnimation delay={2.25}>
                <a
                  href="https://x.com/bryanjhickey"
                  target="_blank"
                  rel="nofollow noopener"
                  onClick={() => {
                    track('Social Platform', {
                      platform: 'twitter',
                      location: 'hero',
                    })
                  }}
                >
                  <p className="sr-only">X / Twitter Link</p>
                  <FaXTwitter className="h-6 w-6 transition-colors hover:text-white" />
                </a>
              </FadeYAnimation>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}
