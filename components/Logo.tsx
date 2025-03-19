import { cn } from '@/lib/utils'
import Link from 'next/link'
import FadeXAnimation from './animations/FadeXAnimation'

const Logo = ({ lightLogo = true }: { lightLogo?: boolean }) => {
  return (
    <FadeXAnimation xStartValue={0} delay={3}>
      <Link
        className={cn(
          lightLogo ? `text-white` : `text-gray-950`,
          'hover:text-primary font-serif text-4xl font-medium tracking-widest text-white uppercase transition',
        )}
        href="/"
      >
        <span>B.</span>
        <FadeXAnimation xStartValue={-10} delay={4}>
          <div className="h-1 w-full bg-[#E5A51A]" />
        </FadeXAnimation>
      </Link>
    </FadeXAnimation>
  )
}

export default Logo
