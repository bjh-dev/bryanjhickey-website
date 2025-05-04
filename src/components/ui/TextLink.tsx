type TextLinkProps = {
  text: string
  link: string
  external?: boolean
}

const TextLink = (props: TextLinkProps) => {
  const { text, link, external = false } = props
  return (
    <a
      href={link}
      target={external ? '_blank' : '_self'}
      rel="nofollow noopener"
      className="text-[#E5A51A] transition hover:text-white hover:opacity-100"
    >
      {text}
    </a>
  )
}

export default TextLink
