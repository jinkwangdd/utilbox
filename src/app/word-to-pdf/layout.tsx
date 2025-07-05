import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word to PDF - 무료 워드 PDF 변환기 | 유틸박스',
  description: 'Word 문서를 PDF로 빠르게 변환하세요. 무료로 사용 가능한 온라인 워드 PDF 변환 도구입니다.',
  keywords: 'Word PDF 변환, 워드 PDF 변환기, 무료 PDF 변환, 온라인 워드 변환',
  openGraph: {
    title: 'Word to PDF - 무료 워드 PDF 변환기',
    description: 'Word 문서를 PDF로 빠르게 변환하세요. 설치 없이 무료로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/word-to-pdf',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/word-to-pdf.png',
        width: 1200,
        height: 630,
        alt: 'Word to PDF - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word to PDF - 무료 워드 PDF 변환기',
    description: 'Word 문서를 PDF로 빠르게 변환하세요.',
    images: ['/og/word-to-pdf.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/word-to-pdf',
  },
};

export default function WordToPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 