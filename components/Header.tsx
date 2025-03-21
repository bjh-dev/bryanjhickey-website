import { bryanHeroDataUri } from '@/lib/dataUris'
import Image from 'next/image'

import { FaXTwitter, FaFacebook, FaLinkedinIn } from 'react-icons/fa6'
import TextLink from './ui/TextLink'
import FadeXAnimation from './animations/FadeXAnimation'
import FadeYAnimation from './animations/FadeYAnimation'

const Header = () => {
  return (
    <section className="relative grid h-[90svh] overflow-hidden bg-[#000]">
      <Image
        src="/images/bryan_hero.jpg"
        fill
        priority
        placeholder="blur"
        blurDataURL={bryanHeroDataUri}
        alt="Bryan J. Hickey"
        className="pointer-events-none object-cover object-right-top"
      />
      <div className="relative col-span-2 col-start-2 my-16 flex max-w-lg flex-col justify-end space-y-2 px-4 text-white md:max-w-xl lg:max-w-2xl lg:justify-center">
        <FadeXAnimation xStartValue={-10} delay={1}>
          {' '}
          <h1 className="text-primary font-medium uppercase lg:text-lg">
            Bryan J. Hickey
          </h1>
        </FadeXAnimation>
        <FadeXAnimation xStartValue={-10} delay={1.5} duration={0.75}>
          <p className="font-serif text-3xl sm:text-5xl lg:text-6xl">
            Proclaiming the truth, beauty and relevance of Jesus.
          </p>
        </FadeXAnimation>
        <FadeXAnimation xStartValue={-10} delay={2} duration={0.75}>
          <div className="bg-primary my-6 h-0.5 w-1/4 max-w-[120px]" />
        </FadeXAnimation>
        <FadeXAnimation xStartValue={-10} delay={2} duration={0.75}>
          <p className="lg:text-lg">
            Throughout 2025, I have the immense privilege of taking a break from{' '}
            <TextLink text="bjh.dev" link="https://www.bjh.dev" external /> to
            serve Jesus at my church,{' '}
            <TextLink
              text="City on a Hill Geelong"
              link="https://cityonahill.com.au/geelong"
              external
            />
            , overseeing theological training of interns, and providing pastoral
            support for Greenhouse participants.
          </p>
        </FadeXAnimation>
        <div className="text-primary mt-4 flex gap-4">
          <FadeYAnimation delay={2}>
            <a
              href="https://www.facebook.com/bryanjhickey"
              target="_blank"
              rel="nofollow noopener"
            >
              <p className="sr-only">Facebook Link</p>
              <FaFacebook className="h-6 w-6 transition-colors hover:text-white" />
            </a>
          </FadeYAnimation>
          <FadeYAnimation delay={2.5}>
            <a
              href="www.linkedin.com/in/bryanjhickey
"
              target="_blank"
              rel="nofollow noopener"
            >
              <p className="sr-only">LinkedIn Link</p>
              <FaLinkedinIn className="h-6 w-6 transition-colors hover:text-white" />
            </a>
          </FadeYAnimation>
          <FadeYAnimation delay={3}>
            <a
              href="https://x.com/bryanjhickey"
              target="_blank"
              rel="nofollow noopener"
            >
              <p className="sr-only">X / Twitter Link</p>
              <FaXTwitter className="h-6 w-6 transition-colors hover:text-white" />
            </a>
          </FadeYAnimation>
        </div>
      </div>
    </section>
  )
}

export default Header
