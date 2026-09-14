import { pages } from '../lib/pages';

export const metadata = {
  title: pages[''].title,
  description: pages[''].description,
  alternates: { canonical: '/' }
};

export default function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: pages[''].html }} />;
}
