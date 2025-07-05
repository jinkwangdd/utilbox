import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://utilbox-mu.vercel.app'
  const currentDate = new Date().toISOString()
  
  const urls = [
    { url: baseUrl, lastmod: currentDate, changefreq: 'daily', priority: '1.0' },
    { url: `${baseUrl}/image-compressor`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { url: `${baseUrl}/img-to-pdf`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { url: `${baseUrl}/pdf-tools`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { url: `${baseUrl}/pdf-to-image`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { url: `${baseUrl}/word-to-pdf`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { url: `${baseUrl}/file-converter`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/qr-code-generator`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/background-remover`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/short-url-generator`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/image-resizer`, lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { url: `${baseUrl}/remove-line-breaks`, lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { url: `${baseUrl}/timezone-converter`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { url: `${baseUrl}/case-converter`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { url: `${baseUrl}/passport-photo-generator`, lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },
    { url: `${baseUrl}/email-domain-analyzer`, lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },
    { url: `${baseUrl}/romanization-converter`, lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },
    { url: `${baseUrl}/privacy`, lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
    { url: `${baseUrl}/terms`, lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
    { url: `${baseUrl}/cookies`, lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
} 