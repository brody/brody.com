// Import the glob loader
import { glob } from 'astro/loaders'
// Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.union([z.string(), z.null()]).optional(),
    pubDate: z.union([z.date(), z.string()]),
    updatedDate: z.union([z.date(), z.string(), z.null()]).optional(),
    description: z.union([z.string(), z.null()]).optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()),
  }),
})
const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.union([z.string(), z.null()]).optional(),
    pubDate: z.union([z.date(), z.string()]),
    updatedDate: z.union([z.date(), z.string(), z.null()]).optional(),
    description: z.union([z.string(), z.null()]).optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()),
  }),
})
const movies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/movies' }),
  schema: z.object({
    title: z.string(),
    genre: z.array(z.string()),
    year: z.number(),
    description: z.union([z.string(), z.null()]).optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
    pubDate: z.union([z.date(), z.string()]),
    updatedDate: z.union([z.date(), z.string(), z.null()]).optional(),
    rating: z.number().optional(),
    inProgress: z.boolean().optional(),
    repeat: z.boolean().optional(),
  }),
})
const tvShows = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/tv-shows' }),
  schema: z.object({
    title: z.string(),
    genre: z.array(z.string()),
    year: z.number(),
    description: z.union([z.string(), z.null()]).optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
    pubDate: z.union([z.date(), z.string()]),
    updatedDate: z.union([z.date(), z.string(), z.null()]).optional(),
    rating: z.number().optional(),
    inProgress: z.boolean().optional(),
    repeat: z.boolean().optional(),
  }),
})

const games = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    gamePlatform: z.array(z.string()),
    genre: z.array(z.string()),
    year: z.number(),
    description: z.union([z.string(), z.null()]).optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
    pubDate: z.union([z.date(), z.string()]),
    updatedDate: z.union([z.date(), z.string(), z.null()]).optional(),
    rating: z.number().optional(),
    inProgress: z.boolean().optional(),
    repeat: z.boolean().optional(),
  }),
})

const books = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    genre: z.array(z.string()),
    year: z.number(),
    imageUrl: z.string().optional(),
    description: z.union([z.string(), z.null()]).optional(),
    datePublished: z.union([z.date(), z.string()]).optional(),
    pubDate: z.union([z.date(), z.string()]).optional(),
    dateModified: z.union([z.date(), z.string(), z.null()]).optional(),
    rating: z.union([z.number(), z.null()]).optional(),
    inProgress: z.boolean().optional(),
    scoreGr: z.number().optional(),
    length: z.number().optional(),
    tags: z.array(z.string()).optional(),
    slug: z.union([z.string(), z.null()]).optional(),
  }),
})

const bookmarks = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/bookmarks' }),
  schema: z.object({
    title: z.union([z.string(), z.null()]).optional(),
    sourceTitle: z.string().optional(),
    source: z.string().optional(),
    imageUrl: z.string().optional(),
    faviconUrl: z.string().optional(),
    author: z.union([z.string(), z.null()]).optional(),
    published: z.union([z.date(), z.string(), z.null()]).optional(),
    pubDate: z.union([z.date(), z.string()]),
    description: z.union([z.string(), z.null()]).optional(),
    tags: z.array(z.string()).optional(),
  }),
})

// Export a single `collections` object to register your collection(s)
export const collections = { blog, notes, movies, tvShows, games, books, bookmarks }
