import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL 단축기 - 무료 링크 단축 도구 | 유틸박스',
  description: '긴 URL을 짧고 기억하기 쉬운 링크로 변환하세요. 무료로 사용 가능한 온라인 URL 단축 도구입니다.',
  keywords: 'URL 단축, 링크 단축, 무료 URL 단축기, 온라인 링크 단축, 짧은 URL 만들기',
  openGraph: {
    title: 'URL 단축기 - 무료 링크 단축 도구',
    description: '긴 URL을 짧고 기억하기 쉬운 링크로 변환하세요. 설치 없이 무료로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/short-url-generator',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/short-url-generator.png',
        width: 1200,
        height: 630,
        alt: 'URL 단축기 - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL 단축기 - 무료 링크 단축 도구',
    description: '긴 URL을 짧고 기억하기 쉬운 링크로 변환하세요.',
    images: ['/og/short-url-generator.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/short-url-generator',
  },
};

export default function ShortUrlGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 