/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 파일 생성 최적화
  trailingSlash: false,
  
  // 압축 및 최적화
  compress: true,
  
  // 헤더 설정
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/api/sitemap',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ]
  },
  
  // 리다이렉트 설정
  async redirects() {
    return [
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ]
  },
  
  // 재작성 설정 (백업용)
  async rewrites() {
    return [
      {
        source: '/sitemap-backup.xml',
        destination: '/api/sitemap',
      },
    ]
  },
};

module.exports = nextConfig;