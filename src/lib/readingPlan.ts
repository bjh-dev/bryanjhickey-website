// TypeScript interfaces for the reading plan structure
interface CycleInfo {
  cycle_number: number
  startDate: string // YYYY-MM-DD format
  endDate: string // YYYY-MM-DD format
  total_days: number
  description: string
  average_verses_per_day: number
  daily_breakdown: {
    old_testament: string
    new_testament: string
    psalms_wisdom: string
  }
  celebration_day?: string
  completion_stats?: {
    total_verses_read: number
    total_chapters_read: number
    old_testament_books: number
    new_testament_books: number
    wisdom_books: number
  }
}

interface Reading {
  passage: string
  title: string
  verses: number
}

interface DailyReading {
  day: string // YYYY-MM-DD format
  old_testament: Reading
  new_testament: Reading
  psalms_wisdom: Reading
}

interface ReadingCycle {
  cycle_info: CycleInfo
  readings: DailyReading[]
  celebration_note?: string
}

// Performance optimization: Cache today's date
let cachedToday: string | null = null
let lastCacheDate: number | null = null

function getTodayString(): string {
  const now = Date.now()
  const today = new Date().toISOString().split('T')[0]

  // Only update cache if date has changed
  if (lastCacheDate === null || now - lastCacheDate > 86400000) {
    // 24 hours
    cachedToday = today
    lastCacheDate = now
  }

  return cachedToday!
}

// Optimized function to get all current reading data in one pass
export function getCurrentReadingData(): {
  cycle: ReadingCycle | null
  reading: DailyReading | null
  dayInCycle: number
} {
  const today = getTodayString()
  console.log('🔍 Debug: Today is', today)
  console.log('🔍 Debug: Reading plan has', readingPlan.length, 'cycles')

  // Find current cycle and today's reading in a single pass
  for (const cycle of readingPlan) {
    const { startDate, endDate } = cycle.cycle_info
    console.log(
      `🔍 Debug: Checking cycle ${cycle.cycle_info.cycle_number}: ${startDate} to ${endDate}`,
    )

    if (today >= startDate && today <= endDate) {
      console.log('✅ Debug: Found matching cycle!')
      // Found matching cycle, now find today's reading
      const dayIndex = cycle.readings.findIndex(
        (reading) => reading.day === today,
      )
      console.log('🔍 Debug: Day index for today:', dayIndex)

      return {
        cycle,
        reading: dayIndex >= 0 ? cycle.readings[dayIndex] : null,
        dayInCycle: dayIndex >= 0 ? dayIndex + 1 : 0,
      }
    }
  }

  console.log('❌ Debug: No matching cycle found')
  return {
    cycle: null,
    reading: null,
    dayInCycle: 0,
  }
}

// Utility functions for common operations
export function getCurrentCycle(): ReadingCycle | null {
  const { cycle } = getCurrentReadingData()
  return cycle
}

export function getTodayReading(): DailyReading | null {
  const { reading } = getCurrentReadingData()
  return reading
}

export function getCurrentDayInCycle(): number {
  const { dayInCycle } = getCurrentReadingData()
  return dayInCycle
}

// Debug function for development
export function debugReadingPlan() {
  const today = getTodayString()
  console.log('Today:', today)

  for (const cycle of readingPlan) {
    const { startDate, endDate } = cycle.cycle_info
    console.log(
      `Cycle ${cycle.cycle_info.cycle_number}:`,
      startDate,
      'to',
      endDate,
    )

    if (today >= startDate && today <= endDate) {
      console.log('✅ Found matching cycle!')
      return cycle
    }
  }

  console.log('❌ No matching cycle found')
  return null
}

// Import the actual reading plan data
import { readingPlanData } from './reading-plan-data'
export const readingPlan: ReadingCycle[] = readingPlanData
