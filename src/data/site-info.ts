export type SocialLink = {
  /** Longer descriptive label, e.g. `"Join the Astro community on Discord"` */
  text: string
  /** Short label with the name of the platform, e.g. `"Discord"`*/
  label: string
  /** Icon name for use with `astro-icon`, e.g. `"social/discord"`. */
  icon: string
  /** URL for our profile on the external platform. */
  href: string
  /** Platform ID, e.g. `"discord"`. Used for `astro.build/on/PLATFORM` redirects. */
  platform: string
  /** Whether this platform should be linked in the site header */
  showInHeader?: boolean
}

export type SiteInfo = {
  name: string
  title: string
  description: string
  image: {
    src: string
    alt: string
  }
  socialLinks: SocialLink[]
}

const siteInfo: SiteInfo = {
  name: 'Brody MacLean',
  title: 'Brody MacLean',
  description:
    'Multi-disciplinary design leader based in Sydney, Australia. With 15+ years of experience in product design, spanning product strategy, design systems, AI features, and design leadership.',
  image: {
    src: '/og/default.jpg',
    alt: 'Brody MacLean',
  },
  socialLinks: [
    {
      platform: 'bluesky',
      icon: 'social/bluesky',
      label: 'Bluesky',
      text: 'Follow Brody on Bluesky',
      href: 'https://bsky.app/profile/brodymaclean.bsky.social',
    },
    {
      platform: 'github',
      icon: 'social/github',
      label: 'GitHub',
      text: "Go to Brody's GitHub repo",
      href: 'https://github.com/brody/',
      showInHeader: true,
    },
    {
      platform: 'linkedin',
      icon: 'social/linkedin',
      label: 'LinkedIn',
      text: 'Follow Brody on LinkedIn',
      href: 'https://www.linkedin.com/in/brodymaclean/',
    },
    {
      platform: 'twitter',
      icon: 'social/twitter',
      href: 'https://x.com/brodymaclean',
      label: 'X.com',
      text: 'Follow Brody on x.com (formerly Twitter)',
    },
    {
      platform: 'youtube',
      icon: 'social/youtube',
      href: 'https://www.youtube.com/@brodymaclean',
      label: 'YouTube',
      text: 'Follow Brody on YouTube',
    },
  ],
}

export default siteInfo
