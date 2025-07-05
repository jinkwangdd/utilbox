import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '줄바꿈 제거기 - 텍스트 정리 도구 | 유틸박스',
  description: '불필요한 줄바꿈을 제거하여 텍스트를 정리하세요. 무료로 사용 가능한 온라인 텍스트 정리 도구입니다.',
  keywords: '줄바꿈 제거, 텍스트 정리, 무료 텍스트 도구, 온라인 텍스트 편집, 줄바꿈 삭제',
  openGraph: {
    title: '줄바꿈 제거기 - 텍스트 정리 도구',
    description: '불필요한 줄바꿈을 제거하여 텍스트를 정리하세요. 설치 없이 무료로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/remove-line-breaks',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/remove-line-breaks.png',
        width: 1200,
        height: 630,
        alt: '줄바꿈 제거기 - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '줄바꿈 제거기 - 텍스트 정리 도구',
    description: '불필요한 줄바꿈을 제거하여 텍스트를 정리하세요.',
    images: ['/og/remove-line-breaks.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/remove-line-breaks',
  },
};

export default function RemoveLineBreaksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 