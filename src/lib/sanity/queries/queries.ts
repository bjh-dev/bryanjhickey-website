import { defineQuery } from 'next-sanity'
import {
  postFragment,
  pageFragment,
  menuFragment,
  categoryFragment,
  personFragment,
  postCardFragment,
  menuItemFragment,
  bookReviewFragment,
  bookReviewCardFragment,
} from '@/lib/sanity/queries/fragments'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  title,
  description,
  ${menuFragment},
  footerMenu[]{
    ${menuItemFragment}
    childMenu[]{
      ${menuItemFragment}
    },
  },
  socials[]{
    _key,
    platform,
    url,
  }[],
}`)

export const homePageQuery = defineQuery(`*[_type == "homePage"][0]{
  _id,
  _type,
  ...,
  ${pageFragment}
}`)

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    ${pageFragment}
  }
`)

export const getSitemapQuery = defineQuery(`
  *[((_type in ["page", "post", "bookReview"] && defined(slug.current)) || (_type == "homePage")) && seo.noIndex != true]{
    "href": select(
      _type == "page" => "/" + slug.current,
      _type == "post" => "/posts/" + slug.current,
      _type == "bookReview" => "/book-reviews/" + slug.current,
      _type == "homePage" => "/",
      slug.current
    ),
    _updatedAt
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    ${postFragment}
    "slug": slug.current,
    "headings": content[style in ["h2", "h3", "h4", "h5", "h6"]],
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == 'post'] | order(date desc, _id desc) [0...20] {
      ${postFragment}
    }
`)

export const categoryQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug] [0] {
    ${categoryFragment}
  }
`)

export const personQuery = defineQuery(`
  *[_type == "person" && slug.current == $slug] [0] {
    ${personFragment}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)][0..$limit].slug.current
`)

export const categorySlugs = defineQuery(`
  *[_type == "category" && defined(slug.current)][0..$limit].slug.current
`)

export const personSlugs = defineQuery(`
  *[_type == "person" && defined(slug.current)][0..$limit].slug.current
`)

export const postsArchiveQuery = defineQuery(`
  {
    "allResults": *[
      _type == "post"
      &&
      (
        !defined( $filters.categorySlug ) || references(*[_type == "category" && slug.current == $filters.categorySlug]._id)
      )
      &&
      (
        !defined( $filters.personSlug ) || references(*[_type == "person" && slug.current == $filters.personSlug]._id)
      )
      //
      // Add more filter here if needed
      //
      // The filter value should be passed as a property of the $filter parameter
      //
      // (
      //   !defined( $filters.anotherFilter ) || fieldname == $filters.anotherFilter)
      // )
    ] | order(_createdAt desc, _id desc)
  }
  {
    "total": count(allResults),
    "results": allResults[$from..$to] {
      ${postCardFragment}
    }
  }
`)

export const bookReviewQuery = defineQuery(`
  *[_type == "bookReview" && slug.current == $slug] [0] {
    ${bookReviewFragment}
    "slug": slug.current,
    "headings": content[style in ["h2", "h3", "h4", "h5", "h6"]],
  }
`)

export const allBookReviewsQuery = defineQuery(`
  *[_type == 'bookReview'] | order(date desc, _id desc) {
    ${bookReviewCardFragment}
  }
`)

export const bookReviewSlugs = defineQuery(`
  *[_type == "bookReview" && defined(slug.current)][0..$limit].slug.current
`)

export const bookReviewsArchiveQuery = defineQuery(`
  {
    "allResults": *[_type == "bookReview"] | order(date desc, _id desc)
  }
  {
    "total": count(allResults),
    "results": allResults[$from..$to] {
      ${bookReviewCardFragment}
    }
  }
`)
