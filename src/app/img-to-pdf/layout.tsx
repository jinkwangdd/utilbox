import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이미지 to PDF - 무료 이미지 PDF 변환기 | 유틸박스',
  description: '이미지 파일을 PDF 문서로 빠르게 변환하세요. JPG, PNG, GIF 등 다양한 이미지 형식을 지원하는 무료 온라인 변환 도구입니다.',
  keywords: '이미지 PDF 변환, JPG to PDF, PNG to PDF, 이미지 PDF 변환기, 무료 PDF 변환, 온라인 이미지 변환',
  openGraph: {
    title: '이미지 to PDF - 무료 이미지 PDF 변환기',
    description: '이미지 파일을 PDF 문서로 빠르게 변환하세요. 설치 없이 무료로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/img-to-pdf',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/img-to-pdf.png',
        width: 1200,
        height: 630,
        alt: '이미지 to PDF - 무료 온라인 변환 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이미지 to PDF - 무료 이미지 PDF 변환기',
    description: '이미지 파일을 PDF 문서로 빠르게 변환하세요.',
    images: ['/og/img-to-pdf.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/img-to-pdf',
  },
};

export default function ImgToPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 