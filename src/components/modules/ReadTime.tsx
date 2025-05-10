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
    <div className={cn('flex items-center text-sm text-gray-500', className)}>
      {readTime(wordCount)} minute
      {readTime(wordCount) > 1 ? 's' : ''}
      &nbsp;<span>reading time</span>
    </div>
  )
}
