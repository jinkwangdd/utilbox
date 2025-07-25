import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "유틸박스 - PDF변환/이미지압축/QR코드생성/배경제거/URL단축 무료 온라인 도구 모음, 사무실 필수 사이트",
  description: "PDF 변환, 이미지 압축, QR코드 생성, 배경제거, URL단축, 파일변환, 텍스트도구 등 사무실에서 꼭 필요한 무료 온라인 도구를 한 곳에! 업무 자동화, 사무실 필수 사이트, 무료 웹 유틸리티 끝판왕.",
  keywords: "유틸박스, 업무 끝판왕, 막내사원, 사무실 필수, 무료 도구, PDF 변환, 이미지 압축, 온라인 도구, 업무 자동화, 웹 유틸리티, 사무실 꿀팁, 문서 변환, 추천 사이트, 사무실 추천, 무료 웹사이트, 사무실 업무, 사무실 자동화, 사무실 사이트, 사무실 필수 사이트, 사무실 도구, 사무실 추천 도구, 사무실 업무 자동화, 사무실 무료 도구, 사무실 끝판왕, 사무실 막내사원, 사무실 업무 끝판왕, 사무실 무료 사이트, 사무실 업무 사이트, 사무실 자동화 사이트, 사무실 업무 추천, 사무실 업무 꿀팁, 사무실 업무 도구, 사무실 업무 사이트 추천, 사무실 업무 자동화 사이트, 사무실 업무 무료 사이트, 사무실 업무 끝판왕 사이트, 사무실 업무 필수 사이트, 사무실 업무 필수 도구, 사무실 업무 필수 사이트 추천, 사무실 업무 필수 도구 추천, 사무실 업무 필수 사이트 모음, 사무실 업무 필수 도구 모음, 사무실 업무 필수 사이트 리스트, 사무실 업무 필수 도구 리스트, 사무실 업무 필수 사이트 TOP, 사무실 업무 필수 도구 TOP, 사무실 업무 필수 사이트 BEST, 사무실 업무 필수 도구 BEST, 사무실 업무 필수 사이트 추천 리스트, 사무실 업무 필수 도구 추천 리스트, 사무실 업무 필수 사이트 추천 TOP, 사무실 업무 필수 도구 추천 TOP, 사무실 업무 필수 사이트 추천 BEST, 사무실 업무 필수 도구 추천 BEST",
  authors: [{ name: "유틸박스" }],
  creator: "유틸박스",
  publisher: "유틸박스",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "유틸박스 - PDF변환/이미지압축/QR코드생성/배경제거/URL단축 무료 온라인 도구 모음, 사무실 필수 사이트",
    description: "PDF 변환, 이미지 압축, QR코드 생성, 배경제거, URL단축, 파일변환, 텍스트도구 등 사무실에서 꼭 필요한 무료 온라인 도구를 한 곳에! 업무 자동화, 사무실 필수 사이트, 무료 웹 유틸리티 끝판왕.",
    type: "website",
    locale: "ko_KR",
    siteName: "유틸박스",
    url: "https://utilbox-mu.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "유틸박스 - PDF변환/이미지압축/QR코드생성/배경제거/URL단축 무료 온라인 도구 모음, 사무실 필수 사이트",
    description: "PDF 변환, 이미지 압축, QR코드 생성, 배경제거, URL단축, 파일변환, 텍스트도구 등 사무실에서 꼭 필요한 무료 온라인 도구를 한 곳에! 업무 자동화, 사무실 필수 사이트, 무료 웹 유틸리티 끝판왕.",
  },
  alternates: {
    canonical: "https://utilbox-mu.vercel.app/",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <head>
        <meta name="google-site-verification" content="ige8uZ8BtSMNs1-JbXU0EVhMRyRfcW7hZhCzu8Cl8O8" />
        <meta name="naver-site-verification" content="6f629171da6d0c67f75e9f4885551e21bf511626" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "유틸박스",
              "description": "PDF 변환, 이미지 압축, QR코드 생성, 배경제거, URL단축, 파일변환, 텍스트도구 등 사무실에서 꼭 필요한 무료 온라인 도구를 한 곳에! 업무 자동화, 사무실 필수 사이트, 무료 웹 유틸리티 끝판왕.",
              "url": "https://utilbox-mu.vercel.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://utilbox-mu.vercel.app/?search={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "유틸박스"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
