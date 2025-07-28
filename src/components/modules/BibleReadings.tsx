'use client'

import { cn } from '@/lib/utils'

interface ReadingProps {
  passage: string
  title: string
  verses: number
}

interface ReadingSectionProps {
  title: string
  reading: ReadingProps
  className?: string
}

export function ReadingSection({
  title,
  reading,
  className,
}: ReadingSectionProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-3',
        'border-border bg-background',
        className,
      )}
    >
      <h3 className="text-primary mb-2 font-bold">{title}</h3>
      <p className="text-sm font-medium">{reading.passage}</p>
      <p className="text-muted-foreground mt-1 text-xs">{reading.title}</p>
    </div>
  )
}

interface DailyReadingsProps {
  oldTestament: ReadingProps
  newTestament: ReadingProps
  psalmsWisdom: ReadingProps
  className?: string
}

export function DailyReadings({
  oldTestament,
  newTestament,
  psalmsWisdom,
  className,
}: DailyReadingsProps) {
  const totalVerses =
    oldTestament.verses + newTestament.verses + psalmsWisdom.verses

  return (
    <div className={cn('space-y-4', className)}>
      <ReadingSection title="Old Testament" reading={oldTestament} />
      <ReadingSection title="New Testament" reading={newTestament} />
      <ReadingSection title="Psalms/Wisdom" reading={psalmsWisdom} />

      <div className="border-border border-t pt-4">
        <p className="text-muted-foreground text-xs">
          Total verses today: {totalVerses}
        </p>
      </div>
    </div>
  )
}
