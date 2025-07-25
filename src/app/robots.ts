import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://utilbox-mu.vercel.app'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'NaverBot',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://utilbox-mu.vercel.app/sitemap.xml',
    host: baseUrl,
  }
} 