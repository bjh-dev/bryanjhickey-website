export default function Page({
  title,
  children,
}: {
  title?: string | React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto py-12">
      {title ? (
        <h1 className="mb-10 text-3xl font-bold md:text-5xl">{title}</h1>
      ) : null}
      {children}
    </div>
  )
}
