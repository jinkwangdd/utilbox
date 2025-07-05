import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '파일 형식 변환기 - 무료 파일 변환 도구 | 유틸박스',
  description: '다양한 파일 형식을 원하는 형식으로 변환하세요. 무료로 사용 가능한 온라인 파일 변환 도구입니다.',
  keywords: '파일 형식 변환, 파일 변환기, 무료 파일 변환, 온라인 파일 변환, 문서 변환, 이미지 변환',
  openGraph: {
    title: '파일 형식 변환기 - 무료 파일 변환 도구',
    description: '다양한 파일 형식을 원하는 형식으로 변환하세요. 설치 없이 무료로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/file-converter',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/file-converter.png',
        width: 1200,
        height: 630,
        alt: '파일 형식 변환기 - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '파일 형식 변환기 - 무료 파일 변환 도구',
    description: '다양한 파일 형식을 원하는 형식으로 변환하세요.',
    images: ['/og/file-converter.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/file-converter',
  },
};

export default function FileConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 