import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import tailwindcss from '@tailwindcss/vite'
import tunnel from 'astro-tunnel'
import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  site: 'https://brody.com',
  output: 'hybrid',
  adapter: netlify(),
  integrations: [mdx(), preact(), icon(), tunnel()],

  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // domains: [
    //   'www.giantbomb.com',
    //   'resizing.flixster.com',
    //   'ssl-images-amazon.com',
    //   'media.themoviedb.org',
    //   'images-na.ssl-images-amazon.com',
    //   '*',
    // ], // Add your remote image domains here
    remotePatterns: [{ protocol: 'https' }, { protocol: 'http' }],
  },
})
