import { getCurrentReadingData } from '@/lib/readingPlan'
import { Progress } from '@/components/ui/progress'
import { DailyReadings } from '@/components/modules/BibleReadings'
import { formatDate, getTodayFormatted } from '@/lib/utils'

export default function BibleReadingPlan() {
  const readingData = getCurrentReadingData()
  const {
    cycle: currentCycle,
    reading: todayReading,
    dayInCycle: currentDayInCycle,
  } = readingData

  // Calculate expensive values once
  const progressPercentage =
    currentCycle && currentDayInCycle > 0
      ? (currentDayInCycle / currentCycle.readings.length) * 100
      : 0

  const cycleDateRange = currentCycle
    ? {
        start: formatDate(currentCycle.cycle_info.startDate, {
          month: 'long',
          day: 'numeric',
        }),
        end: formatDate(currentCycle.cycle_info.endDate, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      }
    : null

  if (!currentCycle) {
    return (
      <section className="py-36">
        <div className="content">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold">Bible Reading Plan</h1>
            <p className="text-muted-foreground text-lg">
              No active reading cycle found for today&apos;s date.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-36">
      <div className="content">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
          <div className="col-span-1">
            <h1 className="mb-6 text-5xl font-bold">Bible Reading Plan</h1>

            {/* Current Cycle Info */}
            <div className="border-border flex flex-col gap-2 border-b py-6">
              <h2 className="flex items-baseline justify-between gap-2">
                <div className="text-2xl font-bold">
                  Cycle {currentCycle.cycle_info.cycle_number}
                </div>
                {cycleDateRange && (
                  <div className="text-muted-foreground text-sm">
                    {cycleDateRange.start} - {cycleDateRange.end}
                  </div>
                )}
              </h2>
              <p className="text-muted-foreground text-sm">
                {currentCycle.cycle_info.description}
              </p>
              <p>
                <span className="font-bold">Average verses per day: </span>
                {currentCycle.cycle_info.average_verses_per_day}
              </p>
              <p>
                <span className="font-bold">Old Testament: </span>
                {currentCycle.cycle_info.daily_breakdown.old_testament}
              </p>
              <p>
                <span className="font-bold">New Testament: </span>
                {currentCycle.cycle_info.daily_breakdown.new_testament}
              </p>
              <p>
                <span className="font-bold">Psalms/Wisdom: </span>
                {currentCycle.cycle_info.daily_breakdown.psalms_wisdom}
              </p>
              {currentCycle.cycle_info.celebration_day && (
                <p>
                  <span className="font-bold">Celebration Day: </span>
                  {currentCycle.cycle_info.celebration_day}
                </p>
              )}
            </div>

            {/* Progress */}
            <div className="py-6">
              <h3 className="mb-4 text-xl font-bold">Progress</h3>
              <p className="mb-2">
                <span className="font-bold">Current Day: </span>
                Day {currentDayInCycle} of {currentCycle.readings.length}
              </p>
              <Progress value={progressPercentage} className="w-full" />
            </div>
          </div>

          {/* Today's Reading */}
          <section className="bg-foreground/5 col-span-1 rounded-md p-6">
            <h2 className="mb-4 text-2xl font-bold">{getTodayFormatted()}</h2>

            {todayReading ? (
              <DailyReadings
                oldTestament={todayReading.old_testament}
                newTestament={todayReading.new_testament}
                psalmsWisdom={todayReading.psalms_wisdom}
              />
            ) : (
              <p className="text-muted-foreground">
                No reading scheduled for today.
              </p>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}
