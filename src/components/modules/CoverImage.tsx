import { urlForImage } from '@/lib/sanity/client/image'
import { stegaClean } from '@sanity/client/stega'
import { Image } from 'next-sanity/image'

interface CoverImageProps {
  image: { asset?: { _ref?: string }; alt?: string }
  priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority } = props

  const image = source?.asset?._ref ? (
    <Image
      className="rounded-2xl object-cover shadow-md transition-shadow"
      fill={true}
      alt={stegaClean(source?.alt) || ''}
      src={urlForImage(source)?.height(720).width(1280).auto('format').url()}
      sizes="100vw"
      priority={priority}
    />
  ) : (
    <div className="bg-slate-50 pt-[100%]" />
  )

  return <div className="relative h-[40svh]">{image}</div>
}
