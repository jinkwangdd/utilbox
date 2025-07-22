'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Head from 'next/head';

export default function RedirectPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [urlData, setUrlData] = useState<{
    originalUrl: string;
    shortCode: string;
    createdAt: string;
  } | null>(null);

  useEffect(() => {
    const fetchUrlData = async () => {
      try {
        const response = await fetch(`/api/url/shorten?code=${params.code}`);
        
        if (!response.ok) {
          throw new Error('유효하지 않은 단축 코드입니다.');
        }

        const data = await response.json();
        setUrlData(data);
        
        // 3초 후 자동 리다이렉트
        setTimeout(() => {
          window.location.href = data.originalUrl;
        }, 3000);
        
      } catch (error) {
        setError(error instanceof Error ? error.message : '오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.code) {
      fetchUrlData();
    }
  }, [params.code]);

  const handleRedirect = () => {
    if (urlData) {
      window.location.href = urlData.originalUrl;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Head>
          <title>URL 리다이렉트 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스</title>
          <meta name="description" content="막내사원 대신하는 URL 리다이렉트! 단축된 URL을 안전하고 빠르게 원본 주소로 이동하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
          <meta name="keywords" content="URL 리다이렉트, 단축 URL, 업무 끝판왕, 막내사원, 사무실 필수, 무료 도구, URL 이동, 웹 유틸리티, 업무 자동화" />
          <meta property="og:title" content="URL 리다이렉트 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
          <meta property="og:description" content="막내사원 대신하는 URL 리다이렉트! 단축된 URL을 안전하고 빠르게 원본 주소로 이동하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://utilbox-mu.vercel.app/r/[code]" />
          <meta property="og:site_name" content="유틸박스" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="URL 리다이렉트 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
          <meta name="twitter:description" content="막내사원 대신하는 URL 리다이렉트! 단축된 URL을 안전하고 빠르게 원본 주소로 이동하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
          <link rel="canonical" href="https://utilbox-mu.vercel.app/r/[code]" />
        </Head>
        <div style={{ 
          padding: '24px', 
          maxWidth: '600px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <Card variant="default">
            <div style={{ padding: '48px 24px' }}>
              <Loader2 size={48} style={{ 
                color: '#667eea', 
                marginBottom: '24px',
                animation: 'spin 1s linear infinite'
              }} />
              <h1 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#1f2937', 
                marginBottom: '16px' 
              }}>
                URL 확인 중...
              </h1>
              <p style={{ color: '#6b7280', fontSize: '16px' }}>
                단축된 URL을 확인하고 있습니다.
              </p>
            </div>
          </Card>
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

  if (error) {
    return (
      <Layout>
        <Head>
          <title>URL 리다이렉트 오류 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스</title>
          <meta name="description" content="막내사원 대신하는 URL 리다이렉트! 단축된 URL을 안전하고 빠르게 원본 주소로 이동하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
          <meta name="keywords" content="URL 리다이렉트, 단축 URL, 업무 끝판왕, 막내사원, 사무실 필수, 무료 도구, URL 이동, 웹 유틸리티, 업무 자동화" />
          <meta property="og:title" content="URL 리다이렉트 오류 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
          <meta property="og:description" content="막내사원 대신하는 URL 리다이렉트! 단축된 URL을 안전하고 빠르게 원본 주소로 이동하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://utilbox-mu.vercel.app/r/[code]" />
          <meta property="og:site_name" content="유틸박스" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="URL 리다이렉트 오류 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
          <meta name="twitter:description" content="막내사원 대신하는 URL 리다이렉트! 단축된 URL을 안전하고 빠르게 원본 주소로 이동하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
          <link rel="canonical" href="https://utilbox-mu.vercel.app/r/[code]" />
        </Head>
        <div style={{ 
          padding: '24px', 
          maxWidth: '600px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <Card variant="default">
            <div style={{ padding: '48px 24px' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                backgroundColor: '#fef2f2', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <span style={{ fontSize: '32px' }}>⚠️</span>
              </div>
              <h1 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#1f2937', 
                marginBottom: '16px' 
              }}>
                유효하지 않은 링크
              </h1>
              <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '32px' }}>
                {error}
              </p>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button>
                  <ArrowLeft size={20} style={{ marginRight: '8px' }} />
                  홈으로 돌아가기
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>URL 리다이렉트 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스</title>
        <meta name="description" content="막내사원 대신하는 URL 리다이렉트! 단축된 URL을 안전하고 빠르게 원본 주소로 이동하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <meta name="keywords" content="URL 리다이렉트, 단축 URL, 업무 끝판왕, 막내사원, 사무실 필수, 무료 도구, URL 이동, 웹 유틸리티, 업무 자동화" />
        <meta property="og:title" content="URL 리다이렉트 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
        <meta property="og:description" content="막내사원 대신하는 URL 리다이렉트! 단축된 URL을 안전하고 빠르게 원본 주소로 이동하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilbox-mu.vercel.app/r/[code]" />
        <meta property="og:site_name" content="유틸박스" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="URL 리다이렉트 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
        <meta name="twitter:description" content="막내사원 대신하는 URL 리다이렉트! 단축된 URL을 안전하고 빠르게 원본 주소로 이동하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <link rel="canonical" href="https://utilbox-mu.vercel.app/r/[code]" />
      </Head>
      <div style={{ 
        padding: '24px', 
        maxWidth: '600px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <Card variant="default">
          <div style={{ padding: '48px 24px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              backgroundColor: '#e0e7ff', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <ExternalLink size={32} style={{ color: '#667eea' }} />
            </div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: '#1f2937', 
              marginBottom: '16px' 
            }}>
              외부 링크로 이동합니다
            </h1>
            <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '24px' }}>
              잠시 후 자동으로 이동됩니다.
            </p>
            
            <div style={{ 
              backgroundColor: '#f8fafc', 
              borderRadius: '12px', 
              padding: '16px',
              marginBottom: '24px',
              textAlign: 'left'
            }}>
              <p style={{ 
                color: '#374151', 
                fontSize: '14px', 
                margin: 0,
                wordBreak: 'break-all'
              }}>
                {urlData?.originalUrl}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Button onClick={handleRedirect}>
                <ExternalLink size={20} style={{ marginRight: '8px' }} />
                지금 이동하기
              </Button>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button variant="outline">
                  <ArrowLeft size={20} style={{ marginRight: '8px' }} />
                  취소
                </Button>
              </Link>
            </div>

            <div style={{ 
              marginTop: '24px', 
              padding: '16px', 
              backgroundColor: '#fef3c7', 
              borderRadius: '8px',
              border: '1px solid #f59e0b'
            }}>
              <p style={{ 
                color: '#92400e', 
                fontSize: '12px', 
                margin: 0,
                lineHeight: '1.4'
              }}>
                ⚠️ 외부 링크로 이동합니다. 안전한 사이트인지 확인하세요.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
} 