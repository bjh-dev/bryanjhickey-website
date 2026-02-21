import { readTime } from '@/utils/strings'
import { cn } from '@/lib/utils'
import { Clock } from 'lucide-react'

export default function ReadTime({
  wordCount,
  className,
}: {
  wordCount: number
  className?: string
}) {
  return (
    <div className="flex items-center gap-1">
      <div>
        <Clock className="text-foreground/50 h-4 w-4" />
      </div>
      <div className={cn('text-foreground/50', className)}>
        {readTime(wordCount)} min
        {readTime(wordCount) > 1 ? 's' : ''}
      </div>
    </div>
  )
}
