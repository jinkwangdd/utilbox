import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '배경 제거 - 무료 이미지 배경 지우기 | 유틸박스',
  description: '이미지에서 배경을 자동으로 제거하여 투명 배경을 만드세요. AI 기반 무료 온라인 배경 제거 도구입니다.',
  keywords: '배경 제거, 이미지 배경 지우기, 투명 배경, 무료 배경 제거, 온라인 배경 제거, AI 배경 제거',
  openGraph: {
    title: '배경 제거 - 무료 이미지 배경 지우기',
    description: '이미지에서 배경을 자동으로 제거하여 투명 배경을 만드세요. AI 기반 무료 도구입니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/background-remover',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/background-remover.png',
        width: 1200,
        height: 630,
        alt: '배경 제거 - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '배경 제거 - 무료 이미지 배경 지우기',
    description: '이미지에서 배경을 자동으로 제거하여 투명 배경을 만드세요.',
    images: ['/og/background-remover.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/background-remover',
  },
};

export default function BackgroundRemoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 