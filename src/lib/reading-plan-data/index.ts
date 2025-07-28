import type { ReadingCycle } from '../readingPlan'

// Import all cycle data
import cycle1Data from './cycle1.json'
import cycle2Data from './cycle2.json'
import cycle3Data from './cycle3.json'
import cycle4Data from './cycle4.json'
import cycle5Data from './cycle5.json'

// Combine all cycles into a single array
export const readingPlanData: ReadingCycle[] = [
  cycle1Data as ReadingCycle,
  cycle2Data as ReadingCycle,
  cycle3Data as ReadingCycle,
  cycle4Data as ReadingCycle,
  cycle5Data as ReadingCycle,
]

// Export individual cycles for easier management
export { cycle1Data, cycle2Data, cycle3Data, cycle4Data, cycle5Data }
