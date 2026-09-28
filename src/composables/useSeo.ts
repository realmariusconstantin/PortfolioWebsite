import { useHead } from '@unhead/vue'
import { person, site } from '@/data/content'

interface SeoOptions {
  title: string
  description: string
  /** Path from the site root, e.g. "/projects/romish". */
  path: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article' | 'profile'
  jsonLd?: Record<string, unknown>
}

/** Title, description, canonical URL, Open Graph + Twitter card and optional JSON-LD for a page. */
export function useSeo(o: SeoOptions) {
  const url = new URL(o.path, site.url).href
  const image = new URL(o.image ?? site.ogImage, site.url).href

  useHead({
    title: o.title,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: o.description },
      { property: 'og:type', content: o.type ?? 'website' },
      { property: 'og:site_name', content: person.name },
      { property: 'og:locale', content: 'en_IE' },
      { property: 'og:url', content: url },
      { property: 'og:title', content: o.title },
      { property: 'og:description', content: o.description },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: o.imageAlt ?? o.title },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: o.title },
      { name: 'twitter:description', content: o.description },
      { name: 'twitter:image', content: image },
    ],
    script: o.jsonLd
      ? [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...o.jsonLd }) }]
      : [],
  })
}
