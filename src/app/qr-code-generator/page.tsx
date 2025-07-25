'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, QrCode, Download, Copy, Check, Settings, Palette, Smartphone } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Head from 'next/head';

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState(200);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [copied, setCopied] = useState(false);

  const generateQRCode = () => {
    if (!text.trim()) {
      toast.error('텍스트를 입력해주세요.');
      return;
    }

    const encodedText = encodeURIComponent(text);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&color=${foregroundColor.replace('#', '')}&bgcolor=${backgroundColor.replace('#', '')}`;
    setQrCodeUrl(qrUrl);
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) {
      toast.error('먼저 QR 코드를 생성해주세요.');
      return;
    }

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR 코드가 다운로드되었습니다!');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('클립보드에 복사되었습니다!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('클립보드 복사에 실패했습니다.');
    }
  };

  const copyQRCodeImage = async () => {
    if (!qrCodeUrl) {
      toast.error('먼저 QR 코드를 생성해주세요.');
      return;
    }

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      toast.success('QR 코드 이미지가 클립보드에 복사되었습니다!');
    } catch (error) {
      toast.error('이미지 복사에 실패했습니다.');
    }
  };

  // 텍스트가 변경될 때마다 자동으로 QR 코드 생성
  useEffect(() => {
    if (text.trim()) {
      const timeoutId = setTimeout(generateQRCode, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [text, size, foregroundColor, backgroundColor]);

  return (
    <Layout>
      <Head>
        <title>QR코드 생성하기 - URL/텍스트/연락처 무료 온라인 QR코드 생성기 | 유틸박스</title>
        <meta name="description" content="QR코드 생성 무료 온라인 도구! URL, 텍스트, 연락처 정보를 QR코드로 빠르고 쉽게 변환하세요. 커스터마이징 가능, 고품질, 즉시 다운로드." />
        <meta name="keywords" content="QR코드 생성, QR코드 생성기, URL QR코드, 텍스트 QR코드, 연락처 QR코드, 온라인 QR코드, 무료 QR코드, QR코드 만들기, QR코드 생성기 온라인" />
        <meta property="og:title" content="QR코드 생성하기 - URL/텍스트/연락처 무료 온라인 QR코드 생성기 | 유틸박스" />
        <meta property="og:description" content="QR코드 생성 무료 온라인 도구! URL, 텍스트, 연락처 정보를 QR코드로 빠르고 쉽게 변환하세요. 커스터마이징 가능, 고품질, 즉시 다운로드." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilbox-mu.vercel.app/qr-code-generator" />
        <meta property="og:site_name" content="유틸박스" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="QR코드 생성하기 - URL/텍스트/연락처 무료 온라인 QR코드 생성기 | 유틸박스" />
        <meta name="twitter:description" content="QR코드 생성 무료 온라인 도구! URL, 텍스트, 연락처 정보를 QR코드로 빠르고 쉽게 변환하세요. 커스터마이징 가능, 고품질, 즉시 다운로드." />
        <link rel="canonical" href="https://utilbox-mu.vercel.app/qr-code-generator" />
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
              QR 코드 생성기
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#6b7280', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              텍스트, URL, 연락처 정보를 QR 코드로 변환하세요. 커스터마이징 옵션도 제공합니다.
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
              <QrCode size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                QR 코드 생성
              </h2>
            </div>

            {/* 텍스트 입력 */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1f2937', 
                marginBottom: '8px' 
              }}>
                텍스트 또는 URL
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com 또는 텍스트를 입력하세요..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* 설정 옵션 */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                <Settings size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                설정 옵션
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 크기 설정 */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#1f2937', 
                    marginBottom: '8px' 
                  }}>
                    크기: {size}px
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="400"
                    step="50"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: '#e5e7eb',
                      outline: 'none',
                      WebkitAppearance: 'none'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                    <span>100px</span>
                    <span>400px</span>
                  </div>
                </div>

                {/* 색상 설정 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      marginBottom: '8px' 
                    }}>
                      QR 코드 색상
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="color"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        style={{
                          width: '40px',
                          height: '40px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      />
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        {foregroundColor}
                      </span>
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
                      배경 색상
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        style={{
                          width: '40px',
                          height: '40px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      />
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        {backgroundColor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 빠른 템플릿 */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                <Smartphone size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                빠른 템플릿
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  { label: '웹사이트', value: 'https://' },
                  { label: '이메일', value: 'mailto:example@email.com' },
                  { label: '전화번호', value: 'tel:+82-10-1234-5678' },
                  { label: 'WiFi', value: 'WIFI:T:WPA;S:NetworkName;P:Password;;' },
                  { label: '위치', value: 'geo:37.5665,126.9780' },
                  { label: '텍스트', value: '안녕하세요!' }
                ].map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setText(template.value)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#374151',
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
                    {template.label}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* 결과 섹션 */}
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <QrCode size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                생성된 QR 코드
              </h2>
            </div>

            {qrCodeUrl ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* QR 코드 이미지 */}
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '16px', 
                  padding: '32px',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb'
                }}>
                  <img 
                    src={qrCodeUrl} 
                    alt="Generated QR Code"
                    style={{ 
                      maxWidth: '100%', 
                      height: 'auto',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>

                {/* 액션 버튼 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Button onClick={downloadQRCode} size="lg">
                    <Download size={20} style={{ marginRight: '8px' }} />
                    QR 코드 다운로드
                  </Button>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(text)}
                    >
                      {copied ? (
                        <>
                          <Check size={16} style={{ marginRight: '4px' }} />
                          복사됨
                        </>
                      ) : (
                        <>
                          <Copy size={16} style={{ marginRight: '4px' }} />
                          텍스트 복사
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={copyQRCodeImage}
                    >
                      <Copy size={16} style={{ marginRight: '4px' }} />
                      이미지 복사
                    </Button>
                  </div>
                </div>

                {/* QR 코드 정보 */}
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '12px', 
                  padding: '16px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                    QR 코드 정보
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>크기:</span>
                      <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                        {size} × {size}px
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>색상:</span>
                      <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                        {foregroundColor} / {backgroundColor}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>생성 시간:</span>
                      <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ 
                backgroundColor: '#f8fafc', 
                borderRadius: '16px', 
                padding: '32px',
                textAlign: 'center',
                border: '2px dashed #e5e7eb'
              }}>
                <QrCode size={64} style={{ color: '#9ca3af', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  QR 코드
                </h3>
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                  텍스트를 입력하면<br />
                  여기에 QR 코드가 생성됩니다.
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* 사용 팁 */}
        <div style={{ marginTop: '48px' }}>
          <Card variant="default">
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '24px', textAlign: 'center' }}>
              💡 QR 코드 사용 팁
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                {
                  title: '웹사이트 링크',
                  description: 'URL을 입력하면 스마트폰으로 쉽게 접속할 수 있습니다.',
                  icon: '🌐'
                },
                {
                  title: '연락처 정보',
                  description: '전화번호나 이메일을 QR 코드로 만들어 명함에 활용하세요.',
                  icon: '📞'
                },
                {
                  title: 'WiFi 공유',
                  description: 'WiFi 정보를 QR 코드로 만들어 손님들과 쉽게 공유하세요.',
                  icon: '📶'
                },
                {
                  title: '위치 정보',
                  description: 'GPS 좌표를 QR 코드로 만들어 위치를 쉽게 공유하세요.',
                  icon: '📍'
                }
              ].map((tip, index) => (
                <div key={index} style={{ 
                  padding: '20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                    {tip.icon}
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                    {tip.title}
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                    {tip.description}
                  </p>
                </div>
              ))}
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
            이미지 압축, PDF 변환, 시간대 변환 등 다양한 유틸리티를 제공합니다
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
            <Link href="/img-to-pdf" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>IMG to PDF</Link>
            <Link href="/pdf-tools" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>PDF 도구</Link>
            <Link href="/file-converter" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>파일 형식 변환</Link>
            <Link href="/image-compressor" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>이미지 압축</Link>
            <Link href="/background-remover" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>배경 제거</Link>
            <Link href="/remove-line-breaks" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>줄바꿈 제거</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </Layout>
  );
}
