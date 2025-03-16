import { bryanHeroDataUri } from '@/lib/dataUris'
import Image from 'next/image'

import { FaXTwitter, FaFacebook, FaLinkedinIn } from 'react-icons/fa6'
import TextLink from './ui/TextLink'

const Header = () => {
  return (
    <section className="relative grid h-svh overflow-hidden bg-gray-900">
      <Image
        src="/images/bryan_hero.jpg"
        fill
        priority
        placeholder="blur"
        blurDataURL={bryanHeroDataUri}
        alt="Bryan J. Hickey"
        className="pointer-events-none object-cover object-right-top opacity-90"
      />
      <div className="relative col-span-2 col-start-2 my-16 flex max-w-2xl flex-col justify-end space-y-2 px-4 text-white lg:justify-center">
        <h1 className="font-medium text-[#E5A51A] uppercase lg:text-lg">
          Bryan J. Hickey
        </h1>
        <p className="font-serif text-3xl md:text-7xl lg:text-5xl">
          Proclaiming the truth, beauty and relevance of Jesus.
        </p>
        <div className="my-6 h-0.5 w-1/4 max-w-[120px] bg-[#E5A51A]" />
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
        <div className="mt-4 flex gap-4 text-[#E5A51A]">
          <a
            href="https://www.facebook.com/bryanjhickey"
            target="_blank"
            rel="nofollow noopener"
          >
            <p className="sr-only">Facebook Link</p>
            <FaFacebook className="h-6 w-6 transition-colors hover:text-white" />
          </a>
          <a
            href="www.linkedin.com/in/bryanjhickey
"
            target="_blank"
            rel="nofollow noopener"
          >
            <p className="sr-only">LinkedIn Link</p>
            <FaLinkedinIn className="h-6 w-6 transition-colors hover:text-white" />
          </a>
          <a
            href="https://x.com/bryanjhickey"
            target="_blank"
            rel="nofollow noopener"
          >
            <p className="sr-only">X / Twitter Link</p>
            <FaXTwitter className="h-6 w-6 transition-colors hover:text-white" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Header
