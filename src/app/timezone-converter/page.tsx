'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { Clock, Copy } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

export default function TimezoneConverterPage() {
  const [sourceTime, setSourceTime] = useState('');
  const [sourceTimezone, setSourceTimezone] = useState('Asia/Seoul');
  const [targetTimezone, setTargetTimezone] = useState('America/New_York');
  const [convertedTime, setConvertedTime] = useState('');
  const [copied, setCopied] = useState(false);

  const timezones = [
    { value: 'Asia/Seoul', label: '서울 (KST)' },
    { value: 'America/New_York', label: '뉴욕 (EST/EDT)' },
    { value: 'America/Los_Angeles', label: '로스앤젤레스 (PST/PDT)' },
    { value: 'Europe/London', label: '런던 (GMT/BST)' },
    { value: 'Europe/Paris', label: '파리 (CET/CEST)' },
    { value: 'Asia/Tokyo', label: '도쿄 (JST)' },
    { value: 'Asia/Shanghai', label: '상하이 (CST)' },
    { value: 'Australia/Sydney', label: '시드니 (AEST/AEDT)' },
    { value: 'Asia/Dubai', label: '두바이 (GST)' },
    { value: 'Asia/Singapore', label: '싱가포르 (SGT)' },
  ];

  const convertTime = () => {
    if (!sourceTime) return;

    try {
      const sourceDate = new Date(sourceTime);
      const targetDate = new Date(sourceDate.toLocaleString('en-US', { timeZone: targetTimezone }));
      
      const timeDiff = targetDate.getTime() - sourceDate.getTime();
      const convertedDate = new Date(sourceDate.getTime() + timeDiff);
      
      setConvertedTime(convertedDate.toLocaleString('ko-KR', { 
        timeZone: targetTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    } catch (error) {
      console.error('시간 변환 오류:', error);
      setConvertedTime('변환 오류가 발생했습니다.');
    }
  };

  const handleCopy = async () => {
    if (convertedTime) {
      try {
        await navigator.clipboard.writeText(convertedTime);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const getCurrentTime = (timezone: string) => {
    return new Date().toLocaleString('ko-KR', { 
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  useEffect(() => {
    const now = new Date();
    setSourceTime(now.toISOString().slice(0, 16));
  }, []);

  useEffect(() => {
    if (sourceTime) {
      convertTime();
    }
  }, [sourceTime, sourceTimezone, targetTimezone]);

  return (
    <Layout>
      <Head>
        <title>시간대 변환기 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스</title>
        <meta name="description" content="막내사원 대신하는 시간대 변환기! 전 세계 시간대를 빠르고 정확하게 변환하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <meta name="keywords" content="시간대 변환기, 세계 시간, 업무 끝판왕, 막내사원, 사무실 필수, 무료 도구, 시간 변환, 온라인 시간 도구, 웹 유틸리티, 업무 자동화" />
        <meta property="og:title" content="시간대 변환기 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
        <meta property="og:description" content="막내사원 대신하는 시간대 변환기! 전 세계 시간대를 빠르고 정확하게 변환하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilbox-mu.vercel.app/timezone-converter" />
        <meta property="og:site_name" content="유틸박스" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="시간대 변환기 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
        <meta name="twitter:description" content="막내사원 대신하는 시간대 변환기! 전 세계 시간대를 빠르고 정확하게 변환하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <link rel="canonical" href="https://utilbox-mu.vercel.app/timezone-converter" />
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
            <Clock size={40} style={{ color: '#ffffff' }} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
            시간대 변환기
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            전 세계 시간대를 빠르고 정확하게 변환하세요
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
                <Clock size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                원본 시간
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
                시간 선택
              </label>
              <input
                type="datetime-local"
                value={sourceTime}
                onChange={(e) => setSourceTime(e.target.value)}
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
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                원본 시간대
              </label>
              <select
                value={sourceTimezone}
                onChange={(e) => setSourceTimezone(e.target.value)}
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
                {timezones.map(timezone => (
                  <option key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ 
              backgroundColor: '#f8fafc', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>
                현재 시간 ({timezones.find(tz => tz.value === sourceTimezone)?.label}):
              </p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                {getCurrentTime(sourceTimezone)}
              </p>
            </div>
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
                <Clock size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                변환된 시간
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
                대상 시간대
              </label>
              <select
                value={targetTimezone}
                onChange={(e) => setTargetTimezone(e.target.value)}
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
                {timezones.map(timezone => (
                  <option key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ 
              backgroundColor: '#f0f9ff', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #0ea5e9',
              marginBottom: '16px'
            }}>
              <p style={{ fontSize: '14px', color: '#0369a1', margin: '0 0 8px 0' }}>
                변환된 시간 ({timezones.find(tz => tz.value === targetTimezone)?.label}):
              </p>
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#0c4a6e', margin: 0 }}>
                {convertedTime || '시간을 선택해주세요'}
              </p>
            </div>

            {convertedTime && (
              <Button 
                onClick={handleCopy}
                variant="outline"
                style={{ width: '100%' }}
              >
                <Copy size={16} style={{ marginRight: '8px' }} />
                {copied ? '복사됨!' : '결과 복사'}
              </Button>
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
              시간대 변환기의 장점
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              글로벌 업무와 국제 회의에 필수적인 시간대 변환 도구
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
                <Clock size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                정확한 변환
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                전 세계 주요 도시의 정확한 시간대 변환
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
                <Clock size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                실시간 업데이트
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                현재 시간을 기준으로 실시간 변환
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
                <Clock size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                간편한 사용
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                직관적인 인터페이스로 쉽고 빠른 변환
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
            <Link href="/qr-code-generator" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>QR 코드 생성</Link>
            <Link href="/short-url-generator" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>짧은 URL 생성</Link>
            <Link href="/remove-line-breaks" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>줄바꿈 제거</Link>
            <Link href="/img-to-pdf" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>IMG to PDF</Link>
            <Link href="/file-converter" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>파일 형식 변환</Link>
            <Link href="/image-compressor" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>이미지 압축</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
