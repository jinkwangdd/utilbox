import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF 도구 - 무료 PDF 분할, 합병, 변환 | 유틸박스',
  description: 'PDF 파일을 분할, 합병, 변환하는 무료 온라인 도구입니다. PDF를 이미지로 변환, 페이지 분할, 파일 합병 등 다양한 PDF 작업을 지원합니다.',
  keywords: 'PDF 도구, PDF 분할, PDF 합병, PDF 변환, PDF 이미지 변환, 무료 PDF 도구, 온라인 PDF 편집',
  openGraph: {
    title: 'PDF 도구 - 무료 PDF 분할, 합병, 변환',
    description: 'PDF 파일을 분할, 합병, 변환하는 무료 온라인 도구입니다. 설치 없이 바로 사용 가능합니다.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/pdf-tools',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/pdf-tools.png',
        width: 1200,
        height: 630,
        alt: 'PDF 도구 - 무료 온라인 PDF 편집',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF 도구 - 무료 PDF 분할, 합병, 변환',
    description: 'PDF 파일을 분할, 합병, 변환하는 무료 온라인 도구입니다.',
    images: ['/og/pdf-tools.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/pdf-tools',
  },
};

export default function PdfToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PDF 도구",
            "description": "PDF 파일을 분할, 합병, 변환하는 무료 온라인 도구 모음",
            "url": "https://utilbox-mu.vercel.app/pdf-tools",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "KRW"
            },
            "creator": {
              "@type": "Organization",
              "name": "유틸박스"
            },
            "featureList": [
              "PDF 분할",
              "PDF 합병",
              "PDF를 이미지로 변환",
              "PDF 정보 확인",
              "무료 사용"
            ]
          })
        }}
      />
      {children}
    </>
  );
} 