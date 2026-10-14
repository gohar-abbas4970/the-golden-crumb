import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/data/siteConfig';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export default function Seo({ title, description, path = '', image }: SeoProps) {
  const url = `${siteConfig.domain}${path}`;
  const ogImage = image || 'https://bolt.new/static/og_default.png';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
