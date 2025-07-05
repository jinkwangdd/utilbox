import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이메일 도메인 분석기 - 무료 이메일 분석 도구 | 유틸박스',
  description: '이메일 도메인을 분석하여 스팸 여부, 신뢰도, 제공 업체 정보를 확인하세요. 무료 온라인 이메일 분석 도구.',
  keywords: '이메일 분석, 이메일 도메인 분석, 무료 이메일 분석, 온라인 이메일 분석',
  openGraph: {
    title: '이메일 도메인 분석기 - 무료 이메일 분석 도구',
    description: '이메일 도메인을 분석하여 스팸 여부, 신뢰도, 제공 업체 정보를 확인하세요. 무료 온라인 이메일 분석 도구.',
    type: 'website',
    url: 'https://utilbox-mu.vercel.app/email-domain-analyzer',
    siteName: '유틸박스',
    images: [
      {
        url: '/og/email-domain-analyzer.png',
        width: 1200,
        height: 630,
        alt: '이메일 도메인 분석기 - 무료 온라인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이메일 도메인 분석기 - 무료 이메일 분석 도구',
    description: '이메일 도메인을 분석하여 스팸 여부, 신뢰도, 제공 업체 정보를 확인하세요.',
    images: ['/og/email-domain-analyzer.png'],
  },
  alternates: {
    canonical: 'https://utilbox-mu.vercel.app/email-domain-analyzer',
  },
};

export default function EmailDomainAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 