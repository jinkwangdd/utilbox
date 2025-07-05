import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이미지 압축기 - 무료 온라인 이미지 크기 줄이기 | 유틸박스',
  description: '이미지 파일 크기를 빠르게 줄여서 웹사이트 로딩 속도를 개선하세요. JPG, PNG, GIF, BMP, WebP 형식을 지원하는 무료 온라인 이미지 압축 도구입니다.',
  keywords: '이미지 압축, 이미지 크기 줄이기, 온라인 이미지 압축, 무료 이미지 압축, JPG 압축, PNG 압축, WebP 변환',
  openGraph: {
    title: '이미지 압축기 - 무료 온라인 이미지 크기 줄이기',
    description: '이미지 파일 크기를 빠르게 줄여서 웹사이트 로딩 속도를 개선하세요. 설치 없이 무료로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/image-compressor',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/image-compressor.png',
        width: 1200,
        height: 630,
        alt: '이미지 압축기 - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이미지 압축기 - 무료 온라인 이미지 크기 줄이기',
    description: '이미지 파일 크기를 빠르게 줄여서 웹사이트 로딩 속도를 개선하세요.',
    images: ['/og/image-compressor.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/image-compressor',
  },
};

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "이미지 압축기",
            "description": "이미지 파일 크기를 빠르게 줄여서 웹사이트 로딩 속도를 개선하는 무료 온라인 도구",
            "url": "https://utilbox-mu.vercel.app/image-compressor",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "KRW"
            },
            "creator": {
              "@type": "Organization",
              "name": "유틸박스"
            },
            "featureList": [
              "JPG, PNG, GIF, BMP, WebP 형식 지원",
              "품질 조절 가능",
              "크기 조절 가능",
              "무료 사용"
            ]
          })
        }}
      />
      {children}
    </>
  );
} 