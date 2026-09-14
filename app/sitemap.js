import { pages } from '../lib/pages';

export default function sitemap() {
  const base = 'https://ecitizendigit.com';
  return Object.keys(pages).map((slug) => ({
    url: slug ? `${base}/${slug}` : base,
    lastModified: new Date(),
    changeFrequency: slug.startsWith('blog') ? 'monthly' : 'weekly',
    priority: slug === '' ? 1 : 0.8
  }));
}
