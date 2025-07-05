import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "유틸박스 - 매일 필요한 도구, 한곳에서",
  description: "PDF 변환, 이미지 편집, 텍스트 도구 등 실생활에 필요한 모든 웹 유틸리티를 무료로 제공합니다.",
  keywords: "유틸리티, PDF 변환, 이미지 편집, 텍스트 도구, 웹 도구",
  authors: [{ name: "유틸박스" }],
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
