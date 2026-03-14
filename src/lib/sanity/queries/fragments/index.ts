export const twitterFragment = /* groq */ `
  _type,
  site,
  creator,
  cardType,
  handle,
`

export const imageFragment = /* groq */ `
  _type,
  crop {
    _type,
    right,
    top,
    left,
    bottom
  },
  hotspot {
    _type,
    x,
    y,
    height,
    width,
  },
  asset->{...},
`

export const openGraphFragment = /* groq */ `
  _type,
  siteName,
  url,
  description,
  title,
  image {
    ${imageFragment}
  },
`

export const metaAttributesFragment = /* groq */ `
  _type,
  attributeValueString,
  attributeType,
  attributeKey,
  attributeValueImage {
    ${imageFragment}
  },
`

export const additionalMetaTagFragment = /* groq */ `
  _key,
  _type,
  metaAttributes[] {
    ${metaAttributesFragment}
  },
`

export const seoFragment = /* groq */ `
  _type,
  metaTitle,
  noIndex,
  seoKeywords,
  metaDescription,
  metaImage{
    ${imageFragment}
  },
  additionalMetaTags[]{
    ${additionalMetaTagFragment}
  },
  openGraph {
    ${openGraphFragment}
  },
  twitter {
    ${twitterFragment}
  }
`

export const linkFragment = /* groq */ `
  _type,
  type,
  openInNewTab,
  external,
  internal->{
    ...,
    _type,
    _id,
    "slug": slug.current
  },
`

const customLinkFragment = /* groq */ `
  customLink{
    ...,
    ${linkFragment}
  },
`

const markDefsFragment = /* groq */ `
  markDefs[]{
    ...,
    ${customLinkFragment}
  },
`

const contentFragment = /* groq */ `
  content[]{
    ...,
    ${markDefsFragment}
    _type == 'image' => { ..., alt, caption },
    _type == 'code' => { ..., language, code, filename },
    _type == 'youtubeEmbed' => { ..., url, caption },
    content[]{
      ...,
      ${markDefsFragment}
    }
  },
`

export const buttonFragment = /* groq */ `
  _key,
  _type,
  variant,
  text,
  link {
    ${linkFragment}
  },
`

export const buttonsFragment = /* groq */ `
  buttons[]{
    ${buttonFragment}
  },
`

export const heroSectionFragment = /* groq */ `
  _type,
  title,
  subtitle,
  ${imageFragment}
  ${contentFragment}
  ${buttonsFragment}
`

export const categoryFragment = /* groq */ `
  _id,
  _type,
  title,
  "slug": slug.current,
  description,
`

export const personFragment = /* groq */ `
  _id,
  _type,
  firstName,
  lastName,
  image,
  role,
  biography,
  "slug": slug.current,
`

export const postCardFragment = /* groq */ `
  _type,
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  subtitle,
  "slug": slug.current,
  excerpt,
  isFeatured,
  image,
  "categories": categories[]->{${categoryFragment}},
  date,
  _updatedAt,
  "author": author->{${personFragment}},
  "wordCount": count(string::split(coalesce(pt::text(content), ''), " ")),
`

export const postFragment = /* groq */ `
  ${postCardFragment}
  "slug": slug.current,
  "wordCount": count(string::split(coalesce(pt::text(content), ''), " ")),
  ${contentFragment}
  seo {
    ${seoFragment}
  },
`

export const postListSectionFragment = /* groq */ `
    _type,
    title,
    subtitle,
    description,
    recentTitle,
    recentSubtitle,
    numberOfPosts,
    "posts": *[_type == 'post'] | order(_createdAt desc, _id desc) [0...20] {
      ${postFragment}
    }
`

export const subscribeSectionFragment = /* groq */ `
  _type,
  heading,
  text,
  buttonText
`

export const textColumnSectionFragment = /* groq */ `
  _type,
  eyebrow,
  ${contentFragment}
  ${buttonsFragment}
`

export const bookReviewCardFragment = /* groq */ `
  _type,
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  bookTitle,
  bookAuthor,
  image,
  date,
  _updatedAt,
  "author": author->{${personFragment}},
  "wordCount": count(string::split(coalesce(pt::text(content), ''), " ")),
`

export const bookReviewFragment = /* groq */ `
  ${bookReviewCardFragment}
  publisher,
  yearPublished,
  amazonLink,
  ${contentFragment}
  seo {
    ${seoFragment}
  },
`

export const bibleQuoteOfTheDaySectionFragment = /* groq */ `
  _type,
  eyebrow,
  title,
  ${contentFragment}
`

export const bookReviewsSectionFragment = /* groq */ `
  _type,
  heading,
  subtitle,
  linkText,
  numberOfReviews,
  "reviews": *[_type == 'bookReview'] | order(date desc) [0...9] {
    _id,
    title,
    bookTitle,
    bookAuthor,
    excerpt,
    date,
    "slug": slug.current,
  }
`

export const scripturePassageSectionFragment = /* groq */ `
  _type,
  heading,
  passageReference,
  showVerseNumbers
`

export const pageBuilderFragment = /* groq */ `
  pageSections[]{
    ...,
    _key,
    _type,
    _type == 'bibleQuoteOfTheDay' => {${bibleQuoteOfTheDaySectionFragment}},
    _type == 'bookReviews' => {${bookReviewsSectionFragment}},
    _type == 'hero' => {${heroSectionFragment}},
    _type == 'postList' => {${postListSectionFragment}},
    _type == 'scripturePassage' => {${scripturePassageSectionFragment}},
    _type == 'subscribe' => {${subscribeSectionFragment}},
    _type == 'textColumn' => {${textColumnSectionFragment}}
  },
`

export const menuItemFragment = /* groq */ `
  _type,
  _key,
  text,
  type,
  link {
    ${linkFragment}
  },
`

export const menuFragment = /* groq */ `
  menu[]{
    ${menuItemFragment}
    childMenu[]{
      ${menuItemFragment}
    }
  }
`

export const pageFragment = /* groq */ `
  ${pageBuilderFragment}
  seo {
    ${seoFragment}
  },
`
