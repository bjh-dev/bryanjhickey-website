import { Noto_Sans, Bitter } from 'next/font/google'
import '@/app/globals.css'

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
})

const bitterFont = Bitter({
  variable: '--font-bitter',
  subsets: ['latin'],
})

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={(notoSans.variable, bitterFont.variable)}>
      <main>{children}</main>
    </div>
  )
}
