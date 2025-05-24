// Import the glob loader
import { glob } from 'astro/loaders'
// Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
  }),
})
const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
  }),
})
const movies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/movies' }),
  schema: z.object({
    title: z.string(),
    genre: z.array(z.string()),
    year: z.number(),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    rating: z.string().optional(),
    status: z.string(),
    progress: z.number().optional(),
    repeat: z.boolean().optional(),
  }),
})
// const tvShows = defineCollection({
//   loader: glob({ pattern: '**/[^_]*.md', base: './src/content/tv-shows' }),
//   schema: z.object({
//     title: z.string(),
//     pubDate: z.date(),
//     description: z.string(),
//     author: z.string(),
//     image: z.object({
//       url: z.string(),
//       alt: z.string(),
//     }),
//     tags: z.array(z.string()),
//   }),
// })
// Export a single `collections` object to register your collection(s)
export const collections = { blog, notes, movies }
