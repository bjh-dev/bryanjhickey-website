'use client'

import FadeXAnimation from '@/components/animations/FadeXAnimation'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const Logo = ({
  lightLogo = false,
  animate = false,
}: {
  lightLogo?: boolean
  animate?: boolean
}) => {
  const [mounted, setMounted] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const checkDarkTheme = () => {
      setIsDarkTheme(
        theme === 'dark' || document.documentElement.classList.contains('dark'),
      )
    }

    // Run the check initially
    checkDarkTheme()

    // Optionally, add a listener if the theme can change dynamically
    const observer = new MutationObserver(checkDarkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [theme])

  if (!mounted) {
    return null
  }

  if (isDarkTheme && animate) {
    return (
      <FadeXAnimation xStartValue={0} delay={3}>
        <div
          className={cn(
            lightLogo && 'text-white',
            'group text-foreground font-serif text-4xl font-medium tracking-widest uppercase transition',
          )}
        >
          <span>B.</span>
          <FadeXAnimation xStartValue={-10} delay={4}>
            <div
              className={cn(
                'bg-primary h-1 w-full group-hover:bg-gray-50',
                lightLogo && 'group-hover:bg-white',
              )}
            />
          </FadeXAnimation>
        </div>
      </FadeXAnimation>
    )
  }
  if (isDarkTheme && !animate) {
    return (
      <div
        className={cn(
          lightLogo && 'text-white',
          'group text-foreground font-serif text-4xl font-medium tracking-widest uppercase transition',
        )}
      >
        <span>B.</span>

        <div
          className={cn(
            'bg-primary h-1 w-full group-hover:bg-gray-50',
            lightLogo && 'group-hover:bg-white',
          )}
        />
      </div>
    )
  }
  if (!isDarkTheme && animate) {
    return (
      <FadeXAnimation xStartValue={0} delay={3}>
        <div
          className={cn(
            'group text-foreground font-serif text-4xl font-medium tracking-widest uppercase transition',
            lightLogo && 'text-gray-50',
          )}
        >
          <span>B.</span>
          <FadeXAnimation xStartValue={-10} delay={4}>
            <div
              className={cn(
                'bg-primary h-1 w-full group-hover:bg-gray-950',
                lightLogo && 'group-hover:bg-gray-50',
              )}
            />
          </FadeXAnimation>
        </div>
      </FadeXAnimation>
    )
  }
  if (!isDarkTheme && !animate) {
    return (
      <div
        className={cn(
          'group text-foreground font-serif text-4xl font-medium tracking-widest uppercase transition',
          lightLogo && 'text-gray-50',
        )}
      >
        <span>B.</span>
        <div
          className={cn(
            'group-hover:bg-primary bg-primary h-1 min-w-2.5 transition-all group-hover:w-full',
            !lightLogo && 'group-hover:bg-primary text-gray-950',
          )}
        />
      </div>
    )
  }
  return null
}
