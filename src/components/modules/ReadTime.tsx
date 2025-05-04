import { Clock } from 'lucide-react'
import { readTime } from '@/utils/strings'

export default function ReadTime({ wordCount }: { wordCount: number }) {
  return (
    <div className="flex items-center text-sm text-gray-500">
      <Clock className="mr-1 h-4 w-4" />
      {readTime(wordCount)} minute
      {readTime(wordCount) > 1 ? 's' : ''}
    </div>
  )
}
