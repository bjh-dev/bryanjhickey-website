import Header from '@/components/Header'
// import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="fixed top-0 z-10 w-full">
        <nav className="flex items-center justify-between space-x-12 px-8 py-8 lg:px-12">
          <Link
            className="hover:text-primary font-serif text-4xl font-medium tracking-widest text-white uppercase transition"
            href="/"
          >
            <span className="border-b-primary border-b-4">B.</span>
          </Link>
          <div className="flex items-center space-x-4">
            {/* <ThemeToggle /> */}
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="hover:text-primary hover:border-primary hover:bg-background border border-white bg-transparent text-white backdrop-blur-3xl"
            >
              <a href="booking">Book a Time with Bryan</a>
            </Button>
          </div>
        </nav>
      </div>
      <Header />
    </>
  )
}
