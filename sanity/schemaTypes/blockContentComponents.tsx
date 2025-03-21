import { ReactNode } from 'react'

export const LeadParagraph = ({ children }: { children: ReactNode }) => {
  return <p className="text-lg text-red-600">{children}</p>
}

export const LeadParagraphPreview = ({ children }: { children: ReactNode }) => {
  return <p className="text-lg">{children}</p>
}
