import { notFound } from 'next/navigation';
import { pages } from '../../lib/pages';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages)
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/${slug}`,
      type: slug.startsWith('blog') ? 'article' : 'website'
    }
  };
}

export default async function DynamicPage({ params }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();

  return <div dangerouslySetInnerHTML={{ __html: page.html }} />;
}
