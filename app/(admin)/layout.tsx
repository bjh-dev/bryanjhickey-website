import '@/app/globals.css'

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <div>{children}</div>
    </main>
  )
}
