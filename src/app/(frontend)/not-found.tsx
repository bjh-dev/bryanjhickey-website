import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="my-16 px-4">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="text-4xl font-bold tracking-wider uppercase">
          Page not found
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </section>
  )
}
