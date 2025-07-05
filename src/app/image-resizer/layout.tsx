import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이미지 크기 조절 - 무료 이미지 리사이즈 | 유틸박스',
  description: '이미지의 크기를 원하는 대로 조절하세요. JPG, PNG, GIF 등 다양한 형식 지원, 무료 온라인 이미지 리사이즈 도구.',
  keywords: '이미지 리사이즈, 이미지 크기 조절, 무료 이미지 리사이즈, 온라인 이미지 크기 변경',
  openGraph: {
    title: '이미지 크기 조절 - 무료 이미지 리사이즈',
    description: '이미지의 크기를 원하는 대로 조절하세요. 설치 없이 무료로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/image-resizer',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/image-resizer.png',
        width: 1200,
        height: 630,
        alt: '이미지 크기 조절 - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이미지 크기 조절 - 무료 이미지 리사이즈',
    description: '이미지의 크기를 원하는 대로 조절하세요.',
    images: ['/og/image-resizer.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/image-resizer',
  },
};

export default function ImageResizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 