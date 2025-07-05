import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '여권 사진 생성기 - 무료 증명사진 만들기 | 유틸박스',
  description: '여권, 증명사진을 빠르게 만들 수 있는 무료 온라인 여권 사진 생성기. 다양한 규격 지원, 간편한 편집 기능 제공.',
  keywords: '여권 사진, 증명사진, 무료 여권 사진, 온라인 증명사진, 여권 사진 만들기',
  openGraph: {
    title: '여권 사진 생성기 - 무료 증명사진 만들기',
    description: '여권, 증명사진을 빠르게 만들 수 있는 무료 온라인 여권 사진 생성기. 다양한 규격 지원, 간편한 편집 기능 제공.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/passport-photo-generator',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/passport-photo-generator.png',
        width: 1200,
        height: 630,
        alt: '여권 사진 생성기 - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '여권 사진 생성기 - 무료 증명사진 만들기',
    description: '여권, 증명사진을 빠르게 만들 수 있는 무료 온라인 여권 사진 생성기.',
    images: ['/og/passport-photo-generator.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/passport-photo-generator',
  },
};

export default function PassportPhotoGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 