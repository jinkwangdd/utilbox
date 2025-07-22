'use client';

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { FileText, Copy, Download } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

export default function RemoveLineBreaksPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRemoveLineBreaks = () => {
    if (!inputText.trim()) return;
    
    // 줄바꿈 제거 및 공백 정리
    const cleanedText = inputText
      .replace(/\r\n/g, ' ') // Windows 줄바꿈
      .replace(/\n/g, ' ')   // Unix/Linux 줄바꿈
      .replace(/\r/g, ' ')   // Mac 줄바꿈
      .replace(/\s+/g, ' ')  // 연속된 공백을 하나로
      .trim();               // 앞뒤 공백 제거
    
    setOutputText(cleanedText);
  };

  const handleCopy = async () => {
    if (outputText) {
      try {
        await navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleDownload = () => {
    if (outputText) {
      const blob = new Blob([outputText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cleaned_text.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Layout>
      <Head>
        <title>줄바꿈 제거 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스</title>
        <meta name="description" content="막내사원 대신하는 줄바꿈 제거 도구! 텍스트의 불필요한 줄바꿈을 제거하고 깔끔하게 정리하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <meta name="keywords" content="줄바꿈 제거, 텍스트 정리, 업무 끝판왕, 막내사원, 사무실 필수, 무료 도구, 텍스트 편집, 온라인 텍스트 도구, 웹 유틸리티, 업무 자동화" />
        <meta property="og:title" content="줄바꿈 제거 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
        <meta property="og:description" content="막내사원 대신하는 줄바꿈 제거 도구! 텍스트의 불필요한 줄바꿈을 제거하고 깔끔하게 정리하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilbox-mu.vercel.app/remove-line-breaks" />
        <meta property="og:site_name" content="유틸박스" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="줄바꿈 제거 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
        <meta name="twitter:description" content="막내사원 대신하는 줄바꿈 제거 도구! 텍스트의 불필요한 줄바꿈을 제거하고 깔끔하게 정리하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <link rel="canonical" href="https://utilbox-mu.vercel.app/remove-line-breaks" />
      </Head>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            margin: '0 auto 24px'
          }}>
            <FileText size={40} style={{ color: '#ffffff' }} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
            줄바꿈 제거
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            텍스트의 불필요한 줄바꿈을 제거하고 깔끔하게 정리하세요
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
          {/* Input Section */}
          <Card variant="elevated">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '10px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}>
                <FileText size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                원본 텍스트
              </h2>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="줄바꿈을 제거할 텍스트를 입력하세요..."
              style={{
                width: '100%',
                height: '300px',
                padding: '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '16px',
                lineHeight: '1.5',
                resize: 'vertical',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />

            <Button 
              onClick={handleRemoveLineBreaks}
              style={{ width: '100%', marginTop: '16px' }}
              disabled={!inputText.trim()}
            >
              줄바꿈 제거하기
            </Button>
          </Card>

          {/* Output Section */}
          <Card variant="elevated">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '10px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              }}>
                <FileText size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                정리된 텍스트
              </h2>
            </div>

            <div style={{
              width: '100%',
              height: '300px',
              padding: '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '16px',
              lineHeight: '1.5',
              backgroundColor: '#f9fafb',
              overflowY: 'auto',
              fontFamily: 'inherit',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}>
              {outputText || '정리된 텍스트가 여기에 표시됩니다...'}
            </div>

            {outputText && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <Button 
                  onClick={handleCopy}
                  variant="outline"
                  style={{ flex: 1 }}
                >
                  <Copy size={16} style={{ marginRight: '8px' }} />
                  {copied ? '복사됨!' : '복사'}
                </Button>
                <Button 
                  onClick={handleDownload}
                  variant="outline"
                  style={{ flex: 1 }}
                >
                  <Download size={16} style={{ marginRight: '8px' }} />
                  다운로드
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Features Section */}
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '48px 24px', 
          borderRadius: '16px',
          marginBottom: '48px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              줄바꿈 제거의 장점
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              텍스트를 깔끔하게 정리하여 가독성을 높이세요
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '24px' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                margin: '0 auto 16px'
              }}>
                <FileText size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                가독성 향상
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                불필요한 줄바꿈 제거로 텍스트 가독성 개선
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                margin: '0 auto 16px'
              }}>
                <FileText size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                문서 정리
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                복사된 텍스트의 형식을 깔끔하게 정리
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                margin: '0 auto 16px'
              }}>
                <FileText size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                시간 절약
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                수동으로 정리하는 시간을 크게 단축
              </p>
            </div>
          </div>
        </div>

        {/* 추천 도구(내부링크) 섹션 */}
        <div style={{ marginTop: '48px', padding: '32px', background: '#f8fafc', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
            이런 도구도 함께 써보세요
          </h2>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/img-to-pdf" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>IMG to PDF</Link>
            <Link href="/file-converter" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>파일 형식 변환</Link>
            <Link href="/image-compressor" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>이미지 압축</Link>
            <Link href="/qr-code-generator" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>QR 코드 생성</Link>
            <Link href="/background-remover" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>배경 제거</Link>
            <Link href="/short-url-generator" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>짧은 URL 생성</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}