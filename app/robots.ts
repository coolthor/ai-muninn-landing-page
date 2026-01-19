import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/bpstracker/callback'],
    },
    sitemap: 'https://ai-muninn.com/sitemap.xml',
  };
}
