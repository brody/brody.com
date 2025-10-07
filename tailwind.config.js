/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        // You can add your custom fonts here
        custom: ['YourCustomFont', 'sans-serif'],
        // Example with multiple weights:
        'custom-bold': ['YourCustomFont-Bold', 'sans-serif'],
        'custom-light': ['YourCustomFont-Light', 'sans-serif'],
      },
      colors: {
        'tx-0': 'var(--color-tx-0)',
        'tx-1': 'var(--color-tx-1)',
        'tx-2': 'var(--color-tx-2)',
        'tx-3': 'var(--color-tx-3)',
        'tx-accent-1': 'var(--color-tx-accent-1)',
        'tx-accent-2': 'var(--color-tx-accent-2)',
        'bg-1': 'var(--color-bg-1)',
        'bg-2': 'var(--color-bg-2)',
        'bg-accent-1': 'var(--color-bg-accent-1)',
        'ui-1': 'var(--color-ui-1)',
        'ui-2': 'var(--color-ui-2)',
        'ui-3': 'var(--color-ui-3)',
        default: 'var(--color-tx-2)',
        subtle: 'var(--color-tx-3)',
        accent: 'var(--color-tx-accent-1)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.tx-1'),
            '--tw-prose-headings': theme('colors.tx-0'),
            '--tw-prose-links': theme('colors.tx-accent-1'),
            '--tw-prose-bold': theme('colors.tx-0'),
            '--tw-prose-quotes': theme('colors.tx-2'),
            '--tw-prose-quote-borders': theme('colors.tx-3'),
            '--tw-prose-code': theme('colors.tx-0'),
            '--tw-prose-pre-code': theme('colors.tx-1'),
            '--tw-prose-pre-bg': theme('colors.bg-2'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
