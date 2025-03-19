'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <Button
      variant="link"
      size="icon"
      className="text-white"
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
    >
      {currentTheme === 'light' ? (
        <Sun className="hover:text-primary h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      ) : (
        <Moon className="hover:text-primary absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
