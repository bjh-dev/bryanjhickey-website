import Link from 'next/link'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className="fixed top-0 z-10 w-full bg-gray-100 dark:bg-gray-950">
      <nav className="flex items-center justify-between space-x-12 px-8 py-4 lg:px-12">
        <div className="group flex items-center space-x-4">
          <Link
            className="font-serif text-4xl font-medium tracking-widest uppercase"
            href="/"
          >
            B.
            <div className="h-1 w-0 transition-all duration-200 group-hover:w-full group-hover:bg-[#E5A51A]" />
          </Link>
          <p className="max-w-3xs border-l border-l-[#E5A51A] pl-4 font-serif text-sm">
            {' '}
            Proclaiming the truth, beauty and relevance of{' '}
            <span className="font-bold text-[#E5A51A]">Jesus</span>.
          </p>
        </div>
        <Button asChild variant="secondary">
          <a
            href="https://cal.com/bryanjhickey"
            rel="noopener noreferrer"
            target="_blank"
          >
            Book a Time with Bryan
          </a>
        </Button>
      </nav>
    </div>
  )
}

export default Navbar
