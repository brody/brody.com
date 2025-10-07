import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
  const posts = await getCollection('journal')
  const bookmarks = await getCollection('bookmarks')

  // Combine and sort all items by date
  const allItems = [
    ...posts.map((post) => ({
      title: post.data.title || 'no title',
      pubDate: new Date(post.data.pubDate),
      description: post.data.description || '',
      link: `/posts/${post.id}/`,
      categories: post.data.tags || [],
    })),
    ...bookmarks.map((bookmark) => ({
      title: bookmark.data.title || 'no title',
      pubDate: new Date(bookmark.data.pubDate),
      description: bookmark.data.description || bookmark.data.title || 'no description',
      link: bookmark.data.source || `/bookmarks/${bookmark.id}/`,
      categories: bookmark.data.tags || ['bookmark'],
    })),
  ]
    .filter((item) => item.title && item.pubDate && (item.description || item.link))
    .sort((a, b) => b.pubDate - a.pubDate)

  return rss({
    title: 'Brody | Blog & Bookmarks',
    description: 'Posts and bookmarks from Brody',
    site: context.site || 'https://localhost:4321',
    items: allItems,
    customData: `<language>en-us</language>`,
  })
}
