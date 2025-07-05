import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to JPG - 무료 PDF 이미지 변환기 | 유틸박스',
  description: 'PDF 파일을 빠르게 이미지(JPG)로 변환하세요. 설치 없이 무료로 사용 가능한 온라인 툴입니다.',
  keywords: 'PDF JPG 변환, PDF 이미지 변환, 무료 PDF 변환, 온라인 PDF 변환',
  openGraph: {
    title: 'PDF to JPG - 무료 PDF 이미지 변환기',
    description: 'PDF 파일을 빠르게 이미지(JPG)로 변환하세요. 설치 없이 무료로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/pdf-to-image',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/pdf-to-jpg.png',
        width: 1200,
        height: 630,
        alt: 'PDF to JPG - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to JPG - 무료 PDF 이미지 변환기',
    description: 'PDF 파일을 빠르게 이미지(JPG)로 변환하세요.',
    images: ['/og/pdf-to-jpg.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/pdf-to-image',
  },
};

export default function PdfToImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 