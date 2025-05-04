import { PostsArchiveQueryResult } from '@/types/sanity.types'
import { Image } from 'next-sanity/image'

import CustomPortableText from '@/components/modules/PortableText'
import type { PortableTextBlock } from 'next-sanity'
import { Badge } from '@/components/ui/badge'
import { urlForImage } from '@/lib/sanity/client/image'

export default function PersonArchiveByline({
  person,
}: {
  person: NonNullable<PostsArchiveQueryResult['results'][number]['author']>
}) {
  return (
    <div className="mb-12">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
        <div className="relative h-[300px] w-full max-w-[300px]">
          {person.image ? (
            <Image
              src={urlForImage(person.image)?.width(800).height(800).url()}
              alt={`Photo of ${person.firstName} ${person.lastName}`}
              style={{
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              width={800}
              height={800}
              className="rounded-full object-cover"
            />
          ) : null}
        </div>

        <div className="flex w-full flex-col justify-center">
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              {person.firstName} {person.lastName}
            </h1>
            {person.role ? <Badge>{person.role}</Badge> : null}
          </div>
          {person.biography ? (
            <CustomPortableText
              value={person.biography as PortableTextBlock[]}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
