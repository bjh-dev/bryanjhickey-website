import { cn } from '@/lib/utils'
import { SocialMediaType } from '@/types/seo'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'

export const SocialIcon = ({
  platform,
  className,
}: {
  platform: NonNullable<SocialMediaType>
  className?: string
}) => {
  switch (platform) {
    case 'facebook':
      return (
        <FaFacebook
          className={cn(
            'group-hover:text-primary h-6 w-6 transition-colors',
            className,
          )}
        />
      )
    case 'instagram':
      return (
        <FaInstagram
          className={cn(
            'group-hover:text-primary h-6 w-6 transition-colors',
            className,
          )}
        />
      )
    case 'linkedin':
      return (
        <FaLinkedinIn
          className={cn(
            'group-hover:text-primary h-6 w-6 transition-colors',
            className,
          )}
        />
      )
    case 'twitter':
      return (
        <FaXTwitter
          className={cn(
            'group-hover:text-primary h-6 w-6 transition-colors',
            className,
          )}
        />
      )
    case 'youtube':
      return (
        <FaYoutube
          className={cn(
            'group-hover:text-primary h-6 w-6 transition-colors',
            className,
          )}
        />
      )
    case 'tiktok':
      return (
        <FaTiktok
          className={cn(
            'group-hover:text-primary h-6 w-6 transition-colors',
            className,
          )}
        />
      )
    default:
      return null
  }
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
