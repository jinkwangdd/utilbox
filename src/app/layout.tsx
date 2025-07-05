import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "유틸박스 - 매일 필요한 도구, 한곳에서",
  description: "PDF 변환, 이미지 압축, 배경 제거, QR 코드 생성 등 실생활에 필요한 모든 웹 유틸리티를 무료로 제공합니다. 빠르고 안전한 온라인 도구 모음입니다.",
  keywords: "유틸리티, PDF 변환, 이미지 압축, 배경 제거, QR 코드 생성, 텍스트 도구, 웹 도구, 온라인 도구, 무료 도구",
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
    title: "유틸박스 - 매일 필요한 도구, 한곳에서",
    description: "PDF 변환, 이미지 압축, 배경 제거, QR 코드 생성 등 실생활에 필요한 모든 웹 유틸리티를 무료로 제공합니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "유틸박스",
  },
  twitter: {
    card: "summary_large_image",
    title: "유틸박스 - 매일 필요한 도구, 한곳에서",
    description: "PDF 변환, 이미지 압축, 배경 제거, QR 코드 생성 등 실생활에 필요한 모든 웹 유틸리티를 무료로 제공합니다.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "유틸박스",
              "description": "일상의 모든 디지털 작업을 더욱 쉽고 빠르게 만들어주는 온라인 도구 모음",
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
