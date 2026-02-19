import { cn } from '@/lib/utils'
import { SocialMediaType } from '@/types/seo'
import { IconType } from 'react-icons'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'

const ICON_MAP: Record<NonNullable<SocialMediaType>, IconType> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  tiktok: FaTiktok,
}

export const SocialIcon = ({
  platform,
  className,
}: {
  platform: NonNullable<SocialMediaType>
  className?: string
}) => {
  const Icon = ICON_MAP[platform]
  if (!Icon) return null

  return (
    <Icon
      className={cn(
        'group-hover:text-primary h-6 w-6 transition-colors',
        className,
      )}
    />
  )
}

export default function SocialMedia({
  platform,
  url,
  iconClasses,
  anchorClasses,
}: {
  platform: NonNullable<SocialMediaType>
  url: string
  iconClasses?: string
  anchorClasses?: string
}) {
  if (!platform) {
    return null
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow noopener"
      className={cn('group', anchorClasses)}
    >
      <p className="sr-only">{platform} Link</p>
      {platform && (
        <SocialIcon
          platform={platform}
          className={cn(
            'group-hover:text-primary h-6 w-6 transition-colors',
            iconClasses,
          )}
        />
      )}
    </a>
  )
}
