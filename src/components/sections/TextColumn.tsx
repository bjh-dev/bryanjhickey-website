import CustomPortableText from '@/components/modules/PortableText'
import ButtonsGroup from '@/components/modules/ButtonsGroup'
import { PortableTextBlock } from 'next-sanity'
import { TextColumnSection } from '@/components/sections/types'
import { ButtonFragmentType } from '@/lib/sanity/queries/fragments/fragment.types'

export default function TextColumn({
  section,
}: {
  section: TextColumnSection
}) {
  return (
    <section className="border-border border-b">
      <div className="mx-auto max-w-[720px] px-6 py-20">
        {section.eyebrow && (
          <p className="text-primary mb-8 text-xs font-semibold tracking-[0.2em] uppercase">
            {section.eyebrow}
          </p>
        )}

        {section.content && (
          <CustomPortableText
            value={section.content as PortableTextBlock[]}
            paragraphStyles="text-foreground text-[1.0625rem] leading-[1.85] [&>div>p+p]:mt-5"
          />
        )}

        {section.buttons && section.buttons.length > 0 && (
          <div className="mt-8">
            <ButtonsGroup
              buttons={section.buttons as unknown as ButtonFragmentType[]}
              size="default"
            />
          </div>
        )}
      </div>
    </section>
  )
}
