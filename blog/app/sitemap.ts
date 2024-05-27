import { getDocPosts } from 'app/bio/utils'

export const baseUrl = 'https://portfolio-bio-starter.vercel.app'

export default async function sitemap() {
  let docs = getDocPosts().map((post) => ({
    url: `${baseUrl}/bio/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/bio'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...docs]
}
