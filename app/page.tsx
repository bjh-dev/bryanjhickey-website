import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="fixed top-0 z-10 w-full">
        <nav className="flex items-center justify-between space-x-12 px-8 py-8 lg:px-12">
          <Link
            className="font-serif text-4xl font-medium tracking-widest text-white uppercase transition hover:text-[#E5A51A]"
            href="/contact"
          >
            <span className="border-b-4 border-b-[#E5A51A]">B.</span>
          </Link>
          <Button asChild variant="secondary">
            <a href="booking">Book a Time with Bryan</a>
          </Button>
        </nav>
      </div>
      <Header />
    </>
  )
}
