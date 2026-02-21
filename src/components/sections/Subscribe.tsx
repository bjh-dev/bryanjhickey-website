import { SubscribeSection } from '@/components/sections/types'
import { Button } from '@/components/ui/button'

export default function Subscribe({ section }: { section: SubscribeSection }) {
  return (
    <section>
      <div className="mx-auto max-w-180 px-6 py-20 text-center">
        {section.heading && (
          <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            {section.heading}
          </h2>
        )}
        {section.text && (
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-[1.0625rem] leading-relaxed">
            {section.text}
          </p>
        )}
        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="subscribe-email" className="sr-only">
            Email address
          </label>
          <input
            id="subscribe-email"
            type="email"
            name="email"
            placeholder="Your email address"
            required
            className="border-border bg-background text-foreground placeholder:text-muted-foreground flex-1 rounded-md border px-4 py-3 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
          />
          <Button type="submit" size="lg">
            {section.buttonText || 'Subscribe'}
          </Button>
        </form>
      </div>
    </section>
  )
}
