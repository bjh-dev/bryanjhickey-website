'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="my-16 px-4">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="text-4xl font-bold tracking-wider uppercase">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          An unexpected error occurred. Please try again.
        </p>
        <Button onClick={reset} className="mt-8">
          Try again
        </Button>
      </div>
    </section>
  )
}
