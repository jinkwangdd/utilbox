import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로마자 변환기 - 무료 한글 로마자 변환 | 유틸박스',
  description: '한글을 로마자로 빠르게 변환하세요. 무료로 사용 가능한 온라인 한글 로마자 변환 도구입니다.',
  keywords: '로마자 변환, 한글 로마자 변환, 무료 로마자 변환, 온라인 한글 변환',
  openGraph: {
    title: '로마자 변환기 - 무료 한글 로마자 변환',
    description: '한글을 로마자로 빠르게 변환하세요. 설치 없이 무료로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/romanization-converter',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/romanization-converter.png',
        width: 1200,
        height: 630,
        alt: '로마자 변환기 - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '로마자 변환기 - 무료 한글 로마자 변환',
    description: '한글을 로마자로 빠르게 변환하세요.',
    images: ['/og/romanization-converter.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/romanization-converter',
  },
};

export default function RomanizationConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 