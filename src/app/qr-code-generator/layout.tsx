import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR 코드 생성기 - 무료 QR 코드 만들기 | 유틸박스',
  description: 'URL, 텍스트, 연락처 정보를 QR 코드로 빠르게 변환하세요. 무료로 사용 가능한 온라인 QR 코드 생성 도구입니다.',
  keywords: 'QR 코드 생성, QR 코드 만들기, 무료 QR 코드, 온라인 QR 코드, URL QR 코드, 텍스트 QR 코드',
  openGraph: {
    title: 'QR 코드 생성기 - 무료 QR 코드 만들기',
    description: 'URL, 텍스트, 연락처 정보를 QR 코드로 빠르게 변환하세요. 설치 없이 무료로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/qr-code-generator',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/qr-code-generator.png',
        width: 1200,
        height: 630,
        alt: 'QR 코드 생성기 - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR 코드 생성기 - 무료 QR 코드 만들기',
    description: 'URL, 텍스트, 연락처 정보를 QR 코드로 빠르게 변환하세요.',
    images: ['/og/qr-code-generator.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/qr-code-generator',
  },
};

export default function QrCodeGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 