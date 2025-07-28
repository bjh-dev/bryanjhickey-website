import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting utilities for better performance
const dateFormatterCache = new Map<string, string>()

export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions,
  locale: string = 'en-AU',
): string {
  const cacheKey = `${dateString}-${JSON.stringify(options)}-${locale}`

  if (dateFormatterCache.has(cacheKey)) {
    return dateFormatterCache.get(cacheKey)!
  }

  const formatted = new Date(dateString).toLocaleDateString(locale, options)
  dateFormatterCache.set(cacheKey, formatted)

  return formatted
}

export function getTodayFormatted(): string {
  const today = new Date().toISOString().split('T')[0]
  return formatDate(today, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
