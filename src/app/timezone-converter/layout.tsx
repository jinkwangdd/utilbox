import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시간대 변환기 - 세계 시간 변환 도구 | 유틸박스',
  description: '전 세계 시간대를 쉽게 변환하여 일정을 관리하세요. 무료로 사용 가능한 온라인 시간대 변환 도구입니다.',
  keywords: '시간대 변환, 세계 시간, 시간 변환기, 무료 시간 도구, 온라인 시간 변환, UTC 변환',
  openGraph: {
    title: '시간대 변환기 - 세계 시간 변환 도구',
    description: '전 세계 시간대를 쉽게 변환하여 일정을 관리하세요. 설치 없이 무료로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/timezone-converter',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/timezone-converter.png',
        width: 1200,
        height: 630,
        alt: '시간대 변환기 - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '시간대 변환기 - 세계 시간 변환 도구',
    description: '전 세계 시간대를 쉽게 변환하여 일정을 관리하세요.',
    images: ['/og/timezone-converter.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/timezone-converter',
  },
};

export default function TimezoneConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 