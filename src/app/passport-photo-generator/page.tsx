'use client';

import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { Camera, Download, Upload } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

export default function PassportPhotoGeneratorPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(null);
  const [photoSize, setPhotoSize] = useState('35x45');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const photoSizes = [
    { value: '35x45', label: '여권사진 (35x45mm)', width: 413, height: 531 },
    { value: '3x4', label: '증명사진 3x4 (3x4cm)', width: 354, height: 472 },
    { value: '4x6', label: '증명사진 4x6 (4x6cm)', width: 472, height: 708 },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        setProcessedImageSrc(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePhoto = () => {
    if (!imageSrc || !canvasRef.current) return;

    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        const selectedSize = photoSizes.find(size => size.value === photoSize);
        if (!selectedSize) return;

        // 캔버스 크기 설정 (300 DPI 기준)
        canvas.width = selectedSize.width;
        canvas.height = selectedSize.height;

        // 흰색 배경
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 이미지 그리기 (비율 유지하면서 중앙 정렬)
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

        setProcessedImageSrc(canvas.toDataURL('image/png'));
      }
    };
  };

  const handleDownload = () => {
    if (processedImageSrc) {
      const link = document.createElement('a');
      link.download = `passport_photo_${photoSize}.png`;
      link.href = processedImageSrc;
      link.click();
    }
  };

  return (
    <Layout>
      <Head>
        <title>여권사진 생성기 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스</title>
        <meta name="description" content="막내사원 대신하는 여권사진 생성기! 업로드한 사진을 여권사진 규격에 맞게 자동으로 변환하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <meta name="keywords" content="여권사진 생성기, 증명사진, 업무 끝판왕, 막내사원, 사무실 필수, 무료 도구, 여권사진, 온라인 사진 편집, 웹 유틸리티, 업무 자동화" />
        <meta property="og:title" content="여권사진 생성기 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
        <meta property="og:description" content="막내사원 대신하는 여권사진 생성기! 업로드한 사진을 여권사진 규격에 맞게 자동으로 변환하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilbox-mu.vercel.app/passport-photo-generator" />
        <meta property="og:site_name" content="유틸박스" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="여권사진 생성기 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
        <meta name="twitter:description" content="막내사원 대신하는 여권사진 생성기! 업로드한 사진을 여권사진 규격에 맞게 자동으로 변환하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <link rel="canonical" href="https://utilbox-mu.vercel.app/passport-photo-generator" />
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
            <Camera size={40} style={{ color: '#ffffff' }} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
            여권사진 생성기
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            업로드한 사진을 여권사진 규격에 맞게 자동으로 변환하세요
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
          {/* Upload Section */}
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
                <Upload size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                사진 업로드
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
                사진 크기 선택
              </label>
              <select
                value={photoSize}
                onChange={(e) => setPhotoSize(e.target.value)}
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
                {photoSizes.map(size => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            <label
              htmlFor="photo-upload"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '200px',
                border: '2px dashed #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor: '#f9fafb',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <Upload size={48} style={{ color: '#9ca3af', marginBottom: '12px' }} />
              <p style={{ fontSize: '16px', color: '#6b7280', textAlign: 'center' }}>
                클릭하거나 사진을 여기에 드래그하세요
              </p>
              <input 
                id="photo-upload" 
                type="file" 
                style={{ display: 'none' }} 
                accept="image/*" 
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
            </label>

            {imageSrc && (
              <div style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <img 
                    src={imageSrc} 
                    alt="Uploaded" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '200px', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                </div>
                <Button 
                  onClick={handleGeneratePhoto}
                  style={{ width: '100%' }}
                >
                  <Camera size={20} style={{ marginRight: '8px' }} />
                  여권사진 생성
                </Button>
              </div>
            )}
          </Card>

          {/* Result Section */}
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
                <Camera size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                생성된 여권사진
              </h2>
            </div>

            {processedImageSrc ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <img 
                    src={processedImageSrc} 
                    alt="Processed" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '300px', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e5e7eb'
                    }} 
                  />
                </div>
                <Button 
                  onClick={handleDownload}
                  style={{ width: '100%' }}
                >
                  <Download size={20} style={{ marginRight: '8px' }} />
                  다운로드
                </Button>
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                color: '#9ca3af'
              }}>
                <Camera size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p style={{ fontSize: '16px' }}>
                  사진을 업로드하고 생성 버튼을 클릭하면 여기서 확인할 수 있습니다
                </p>
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
              여권사진 생성기의 장점
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              정확한 규격으로 여권사진을 생성하여 시간과 비용을 절약하세요
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
                <Camera size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                정확한 규격
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                여권사진 표준 규격에 맞춰 정확하게 생성
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
                <Camera size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                시간 절약
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                사진관 방문 없이 집에서 바로 생성
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
                <Camera size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                비용 절약
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                사진관 비용 없이 무료로 생성 가능
              </p>
            </div>
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

        {/* 추천 도구(내부링크) 섹션 */}
        <div style={{ marginTop: '48px', padding: '32px', background: '#f8fafc', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
            이런 도구도 함께 써보세요
          </h2>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/background-remover" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>배경 제거</Link>
            <Link href="/image-compressor" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>이미지 압축</Link>
            <Link href="/image-resizer" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>이미지 크기 조절</Link>
            <Link href="/img-to-pdf" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>IMG to PDF</Link>
            <Link href="/file-converter" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>파일 형식 변환</Link>
            <Link href="/qr-code-generator" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>QR 코드 생성</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
