import { readTime } from '@/utils/strings'
import { cn } from '@/lib/utils'

export default function ReadTime({
  wordCount,
  className,
}: {
  wordCount: number
  className?: string
}) {
  return (
    <div>
      <div className={cn('text-foreground/50', className)}>
        {readTime(wordCount)} min
        {readTime(wordCount) > 1 ? 's' : ''}
        &nbsp;<span>reading time</span>
      </div>
    </div>
  )
}
