'use client';

import { useState } from 'react';
import { Link as LinkIcon, Copy, ArrowLeft, ExternalLink, Check, Search } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Head from 'next/head';

interface ShortUrlResult {
  shortUrl: string;
  originalUrl: string;
  shortCode: string;
}

export default function ShortUrlGeneratorPage() {
  const [url, setUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<ShortUrlResult | null>(null);
  const [copied, setCopied] = useState(false);

  const generateShortUrl = async () => {
    if (!url.trim()) {
      toast.error('URL을 입력해주세요.');
      return;
    }

    // URL 유효성 검사
    try {
      new URL(url);
    } catch {
      toast.error('유효하지 않은 URL입니다.');
      return;
    }

    setIsGenerating(true);
    toast.loading('짧은 URL 생성 중...');

    try {
      const response = await fetch('/api/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('URL 생성에 실패했습니다.');
      }

      const data = await response.json();
      setResult(data);
      toast.success('짧은 URL이 생성되었습니다!');
    } catch (error) {
      console.error('URL 생성 오류:', error);
      toast.error('URL 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('클립보드에 복사되었습니다!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('복사에 실패했습니다.');
    }
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Layout>
      <Head>
        <title>URL 단축하기 - 긴 링크를 짧은 URL로 무료 온라인 URL 단축기 | 유틸박스</title>
        <meta name="description" content="URL 단축 무료 온라인 도구! 긴 URL을 짧고 기억하기 쉬운 링크로 변환하세요. 소셜미디어 공유 최적화, 무료, 즉시 생성." />
        <meta name="keywords" content="URL 단축, 짧은 URL, 링크 단축, URL 단축기, 온라인 URL 단축, 무료 URL 단축, 짧은 링크, URL 줄이기, 링크 줄이기" />
        <meta property="og:title" content="URL 단축하기 - 긴 링크를 짧은 URL로 무료 온라인 URL 단축기 | 유틸박스" />
        <meta property="og:description" content="URL 단축 무료 온라인 도구! 긴 URL을 짧고 기억하기 쉬운 링크로 변환하세요. 소셜미디어 공유 최적화, 무료, 즉시 생성." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilbox-mu.vercel.app/short-url-generator" />
        <meta property="og:site_name" content="유틸박스" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="URL 단축하기 - 긴 링크를 짧은 URL로 무료 온라인 URL 단축기 | 유틸박스" />
        <meta name="twitter:description" content="URL 단축 무료 온라인 도구! 긴 URL을 짧고 기억하기 쉬운 링크로 변환하세요. 소셜미디어 공유 최적화, 무료, 즉시 생성." />
        <link rel="canonical" href="https://utilbox-mu.vercel.app/short-url-generator" />
      </Head>
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{ marginBottom: '48px' }}>
          <Link href="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            color: '#6b7280', 
            textDecoration: 'none',
            marginBottom: '24px',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            <ArrowLeft size={20} style={{ marginRight: '8px' }} />
            홈으로 돌아가기
          </Link>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              color: '#1f2937', 
              marginBottom: '16px',
              lineHeight: '1.2'
            }}>
              짧은 URL 생성기
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#6b7280', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              긴 URL을 짧고 기억하기 쉬운 링크로 변환하세요. 소셜미디어 공유에 최적화되어 있습니다.
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '48px',
          alignItems: 'start'
        }}>
          {/* 입력 섹션 */}
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <LinkIcon size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                URL 입력
              </h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  marginBottom: '8px' 
                }}>
                  원본 URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url-that-needs-to-be-shortened"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = '#667eea';
                    (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = '#e5e7eb';
                    (e.target as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <Button
                onClick={generateShortUrl}
                disabled={isGenerating || !url.trim()}
                size="lg"
                style={{ width: '100%' }}
              >
                {isGenerating ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTop: '2px solid #ffffff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '8px'
                    }} />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Search size={20} style={{ marginRight: '8px' }} />
                    짧은 URL 생성하기
                  </>
                )}
              </Button>
            </div>

            {/* 결과 표시 */}
            {result && (
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                  생성된 짧은 URL
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      marginBottom: '8px' 
                    }}>
                      짧은 URL
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="text"
                        value={result.shortUrl}
                        readOnly
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '16px',
                          backgroundColor: '#f8fafc',
                          outline: 'none'
                        }}
                      />
                      <button
                        onClick={() => copyToClipboard(result.shortUrl)}
                        style={{
                          padding: '12px',
                          backgroundColor: '#e0e7ff',
                          color: '#667eea',
                          border: 'none',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLButtonElement).style.backgroundColor = '#c7d2fe';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLButtonElement).style.backgroundColor = '#e0e7ff';
                        }}
                      >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                      </button>
                      <button
                        onClick={() => openUrl(result.shortUrl)}
                        style={{
                          padding: '12px',
                          backgroundColor: '#dcfce7',
                          color: '#16a34a',
                          border: 'none',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLButtonElement).style.backgroundColor = '#bbf7d0';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLButtonElement).style.backgroundColor = '#dcfce7';
                        }}
                      >
                        <ExternalLink size={20} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      marginBottom: '8px' 
                    }}>
                      원본 URL
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="text"
                        value={result.originalUrl}
                        readOnly
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '14px',
                          backgroundColor: '#f8fafc',
                          outline: 'none'
                        }}
                      />
                      <button
                        onClick={() => copyToClipboard(result.originalUrl)}
                        style={{
                          padding: '12px',
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280',
                          border: 'none',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLButtonElement).style.backgroundColor = '#e5e7eb';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLButtonElement).style.backgroundColor = '#f3f4f6';
                        }}
                      >
                        <Copy size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* 정보 섹션 */}
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <LinkIcon size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                URL 정보
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* 통계 */}
              <div style={{ 
                backgroundColor: '#f8fafc', 
                borderRadius: '16px', 
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', fontWeight: '800', color: '#667eea', marginBottom: '8px' }}>
                  {result ? result.shortCode.length : '0'}
                </div>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                  문자 수
                </p>
              </div>

              {/* 사용법 */}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                  사용법
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    '1. 원본 URL을 입력 필드에 붙여넣기하세요',
                    '2. "짧은 URL 생성하기" 버튼을 클릭하세요',
                    '3. 생성된 짧은 URL을 복사하여 사용하세요',
                    '4. 소셜미디어나 메시지에 공유하세요'
                  ].map((step, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ 
                        width: '24px', 
                        height: '24px', 
                        backgroundColor: '#667eea', 
                        color: '#ffffff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        flexShrink: 0
                      }}>
                        {index + 1}
                      </div>
                      <p style={{ 
                        color: '#374151', 
                        fontSize: '14px', 
                        lineHeight: '1.5',
                        margin: 0
                      }}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 장점 */}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                  장점
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    '기억하기 쉬운 짧은 링크',
                    '소셜미디어 공유 최적화',
                    '클릭 추적 및 분석 가능',
                    '브랜드 커스터마이징 지원'
                  ].map((benefit, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ 
                        width: '20px', 
                        height: '20px', 
                        backgroundColor: '#10b981', 
                        color: '#ffffff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        ✓
                      </div>
                      <p style={{ 
                        color: '#374151', 
                        fontSize: '14px', 
                        lineHeight: '1.5',
                        margin: 0
                      }}>
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 광고 배너 */}
        <div style={{ 
          marginTop: '48px', 
          padding: '24px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>
            더 많은 도구를 사용해보세요
          </h3>
          <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '24px' }}>
            이미지 압축, QR 코드 생성, 시간대 변환 등 다양한 유틸리티를 제공합니다
          </p>
          <Button variant="outline" size="lg" style={{ 
            color: '#ffffff', 
            borderColor: '#ffffff',
            backgroundColor: 'transparent'
          }}>
            모든 도구 보기
          </Button>
        </div>

        {/* 추천 도구(내부링크) 섹션 */}
        <div style={{ marginTop: '48px', padding: '32px', background: '#f8fafc', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
            이런 도구도 함께 써보세요
          </h2>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/qr-code-generator" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>QR 코드 생성</Link>
            <Link href="/img-to-pdf" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>IMG to PDF</Link>
            <Link href="/file-converter" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>파일 형식 변환</Link>
            <Link href="/image-compressor" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>이미지 압축</Link>
            <Link href="/background-remover" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>배경 제거</Link>
            <Link href="/remove-line-breaks" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>줄바꿈 제거</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
}
