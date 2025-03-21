import FadeXAnimation from '@/components/animations/FadeXAnimation'
import Header from '@/components/Header'
import Logo from '@/components/Logo'
import { Posts } from '@/components/Posts'
// import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY } from '@/sanity/lib/queries'

export default async function Home() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY })
  return (
    <>
      <div className="fixed top-0 z-10 w-full">
        <nav className="flex items-center justify-between space-x-12 px-8 py-8 lg:px-12">
          <Logo />
          <div className="flex items-center space-x-4">
            {/* <ThemeToggle />  */}
            <FadeXAnimation xStartValue={20} delay={5}>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="hover:text-primary hover:border-primary hover:bg-background border border-white bg-transparent text-white backdrop-blur-3xl"
              >
                <a href="booking">Book a Time with Bryan</a>
              </Button>
            </FadeXAnimation>
          </div>
        </nav>
      </div>
      <Header />
      <Posts posts={posts} />
    </>
  )
}
