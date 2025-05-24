// @ts-check
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import preact from '@astrojs/preact'
import tailwindcss from '@tailwindcss/vite'

import tunnel from 'astro-tunnel';

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), icon(), tunnel()],

  vite: {
    plugins: [tailwindcss()],
  },
})