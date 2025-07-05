import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '대소문자 변환기 - 텍스트 대소문자 변환 | 유틸박스',
  description: '텍스트의 대소문자를 원하는 형식으로 변환하세요. 무료로 사용 가능한 온라인 텍스트 변환 도구입니다.',
  keywords: '대소문자 변환, 텍스트 변환, 무료 텍스트 도구, 온라인 텍스트 편집, 대문자 변환, 소문자 변환',
  openGraph: {
    title: '대소문자 변환기 - 텍스트 대소문자 변환',
    description: '텍스트의 대소문자를 원하는 형식으로 변환하세요. 설치 없이 무료로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/case-converter',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/case-converter.png',
        width: 1200,
        height: 630,
        alt: '대소문자 변환기 - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '대소문자 변환기 - 텍스트 대소문자 변환',
    description: '텍스트의 대소문자를 원하는 형식으로 변환하세요.',
    images: ['/og/case-converter.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/case-converter',
  },
};

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 