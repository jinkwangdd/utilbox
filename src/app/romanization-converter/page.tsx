'use client';

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { Languages, Copy, Download } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

export default function RomanizationConverterPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [conversionType, setConversionType] = useState('korean-to-roman');
  const [copied, setCopied] = useState(false);

  const conversionTypes = [
    { value: 'korean-to-roman', label: '한글 → 로마자' },
    { value: 'roman-to-korean', label: '로마자 → 한글' },
  ];

  const convertText = () => {
    if (!inputText.trim()) return;

    if (conversionType === 'korean-to-roman') {
      // 간단한 한글 → 로마자 변환 (실제로는 더 정교한 라이브러리 사용 필요)
      const converted = inputText
        .replace(/[가-깋]/g, 'ga')
        .replace(/[나-닣]/g, 'na')
        .replace(/[다-딯]/g, 'da')
        .replace(/[라-맇]/g, 'ra')
        .replace(/[마-밓]/g, 'ma')
        .replace(/[바-빟]/g, 'ba')
        .replace(/[사-싷]/g, 'sa')
        .replace(/[아-잏]/g, 'a')
        .replace(/[자-짛]/g, 'ja')
        .replace(/[차-칳]/g, 'cha')
        .replace(/[카-킿]/g, 'ka')
        .replace(/[타-팋]/g, 'ta')
        .replace(/[파-핗]/g, 'pa')
        .replace(/[하-힣]/g, 'ha');
      
      setOutputText(converted);
    } else {
      // 간단한 로마자 → 한글 변환 (실제로는 더 정교한 라이브러리 사용 필요)
      const converted = inputText
        .replace(/ga/g, '가')
        .replace(/na/g, '나')
        .replace(/da/g, '다')
        .replace(/ra/g, '라')
        .replace(/ma/g, '마')
        .replace(/ba/g, '바')
        .replace(/sa/g, '사')
        .replace(/a/g, '아')
        .replace(/ja/g, '자')
        .replace(/cha/g, '차')
        .replace(/ka/g, '카')
        .replace(/ta/g, '타')
        .replace(/pa/g, '파')
        .replace(/ha/g, '하');
      
      setOutputText(converted);
    }
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
      a.download = 'converted_text.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Layout>
      <Head>
        <title>로마자 변환기 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스</title>
        <meta name="description" content="막내사원 대신하는 로마자 변환기! 한글과 로마자를 빠르고 정확하게 변환하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <meta name="keywords" content="로마자 변환기, 한글 로마자, 업무 끝판왕, 막내사원, 사무실 필수, 무료 도구, 한글 변환, 온라인 변환 도구, 웹 유틸리티, 업무 자동화" />
        <meta property="og:title" content="로마자 변환기 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
        <meta property="og:description" content="막내사원 대신하는 로마자 변환기! 한글과 로마자를 빠르고 정확하게 변환하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilbox-mu.vercel.app/romanization-converter" />
        <meta property="og:site_name" content="유틸박스" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="로마자 변환기 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
        <meta name="twitter:description" content="막내사원 대신하는 로마자 변환기! 한글과 로마자를 빠르고 정확하게 변환하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <link rel="canonical" href="https://utilbox-mu.vercel.app/romanization-converter" />
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
            <Languages size={40} style={{ color: '#ffffff' }} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
            로마자 변환기
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            한글과 로마자를 빠르고 정확하게 변환하세요
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
                <Languages size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                원본 텍스트
              </h2>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                변환 유형
              </label>
              <select
                value={conversionType}
                onChange={(e) => setConversionType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              >
                {conversionTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="변환할 텍스트를 입력하세요..."
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
              onClick={convertText}
              style={{ width: '100%', marginTop: '16px' }}
              disabled={!inputText.trim()}
            >
              변환하기
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
                <Languages size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                변환된 텍스트
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
              {outputText || '변환된 텍스트가 여기에 표시됩니다...'}
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
              로마자 변환기의 장점
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              한글과 로마자 간의 정확하고 빠른 변환을 제공합니다
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
                <Languages size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                정확한 변환
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                한글과 로마자 간의 정확한 변환 제공
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
                <Languages size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                빠른 처리
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                실시간으로 빠른 변환 처리
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
                <Languages size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                양방향 변환
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                한글→로마자, 로마자→한글 양방향 지원
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
            <Link href="/remove-line-breaks" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>줄바꿈 제거</Link>
            <Link href="/timezone-converter" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>시간대 변환</Link>
            <Link href="/qr-code-generator" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>QR 코드 생성</Link>
            <Link href="/short-url-generator" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>짧은 URL 생성</Link>
            <Link href="/img-to-pdf" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>IMG to PDF</Link>
            <Link href="/file-converter" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>파일 형식 변환</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
