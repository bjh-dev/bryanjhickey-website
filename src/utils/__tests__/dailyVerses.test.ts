import { describe, it, expect } from 'vitest'
import { getDailyVerse } from '@/utils/dailyVerses'

describe('getDailyVerse', () => {
  it('returns a non-empty string', () => {
    const verse = getDailyVerse()
    expect(typeof verse).toBe('string')
    expect(verse.length).toBeGreaterThan(0)
  })

  it('returns the same verse for the same date', () => {
    const date = new Date(2025, 5, 15) // June 15, 2025
    expect(getDailyVerse(date)).toBe(getDailyVerse(date))
  })

  it('returns different verses for different dates', () => {
    const dateA = new Date(2025, 0, 1) // Jan 1
    const dateB = new Date(2025, 0, 2) // Jan 2
    expect(getDailyVerse(dateA)).not.toBe(getDailyVerse(dateB))
  })

  it('returns the first verse for January 1', () => {
    const jan1 = new Date(2025, 0, 1)
    expect(getDailyVerse(jan1)).toBe('Genesis 1:1-5')
  })

  it('returns the last verse for December 31 of a leap year', () => {
    const dec31 = new Date(2024, 11, 31) // 2024 is a leap year — day 366
    expect(getDailyVerse(dec31)).toBe('Revelation 22:20-21')
  })

  it('handles leap year February 29 without crashing', () => {
    const feb29 = new Date(2024, 1, 29) // 2024 is a leap year
    const verse = getDailyVerse(feb29)
    expect(typeof verse).toBe('string')
    expect(verse.length).toBeGreaterThan(0)
  })

  it('returns a verse for every day of a leap year', () => {
    const seen = new Set<string>()
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(2024, month + 1, 0).getDate()
      for (let day = 1; day <= daysInMonth; day++) {
        const verse = getDailyVerse(new Date(2024, month, day))
        expect(typeof verse).toBe('string')
        expect(verse.length).toBeGreaterThan(0)
        seen.add(verse)
      }
    }
    // Should have used at least 300 unique verses across 366 days
    expect(seen.size).toBeGreaterThan(300)
  })
})
