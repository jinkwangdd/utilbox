'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

export default function ImageResizerPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [newWidth, setNewWidth] = useState<number | string>('');
  const [newHeight, setNewHeight] = useState<number | string>('');
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          setImageSrc(img.src);
          setOriginalWidth(img.width);
          setOriginalHeight(img.height);
          setNewWidth(img.width);
          setNewHeight(img.height);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = Number(e.target.value);
    setNewWidth(width);
    if (aspectRatioLocked && originalWidth > 0) {
      setNewHeight(Math.round(width * (originalHeight / originalWidth)));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = Number(e.target.value);
    setNewHeight(height);
    if (aspectRatioLocked && originalHeight > 0) {
      setNewWidth(Math.round(height * (originalWidth / originalHeight)));
    }
  };

  const handleResizeAndDownload = () => {
    if (!imageSrc || !canvasRef.current) return;

    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = Number(newWidth);
        canvas.height = Number(newHeight);
        ctx.drawImage(img, 0, 0, Number(newWidth), Number(newHeight));

        const link = document.createElement('a');
        link.download = `resized_image_${newWidth}x${newHeight}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
  };

  return (
    <Layout>
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
            <ImageIcon size={40} style={{ color: '#ffffff' }} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
            이미지 크기 조절
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            이미지의 크기를 원하는 대로 조절하고 다운로드하세요
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
                이미지 업로드
              </h2>
            </div>

            <label
              htmlFor="image-upload"
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
                클릭하거나 이미지를 여기에 드래그하세요
              </p>
              <input 
                id="image-upload" 
                type="file" 
                style={{ display: 'none' }} 
                accept="image/*" 
                onChange={handleImageUpload} 
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
                <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
                  원본 크기: {originalWidth} x {originalHeight} px
                </p>
              </div>
            )}
          </Card>

          {/* Resize Section */}
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
                <ImageIcon size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                크기 조절
              </h2>
            </div>

            {imageSrc ? (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#374151', 
                      marginBottom: '8px' 
                    }}>
                      너비 (px)
                    </label>
                    <input
                      type="number"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      value={newWidth}
                      onChange={handleWidthChange}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#374151', 
                      marginBottom: '8px' 
                    }}>
                      높이 (px)
                    </label>
                    <input
                      type="number"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      value={newHeight}
                      onChange={handleHeightChange}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <input
                    type="checkbox"
                    style={{
                      marginRight: '8px',
                      width: '16px',
                      height: '16px',
                      accentColor: '#667eea'
                    }}
                    checked={aspectRatioLocked}
                    onChange={(e) => setAspectRatioLocked(e.target.checked)}
                  />
                  <label style={{ fontSize: '14px', color: '#374151' }}>
                    가로세로 비율 유지
                  </label>
                </div>

                <Button 
                  onClick={handleResizeAndDownload}
                  style={{ width: '100%' }}
                >
                  <Download size={20} style={{ marginRight: '8px' }} />
                  크기 조절 및 다운로드
                </Button>
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                color: '#9ca3af'
              }}>
                <ImageIcon size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p style={{ fontSize: '16px' }}>
                  이미지를 업로드하면 크기 조절 옵션이 표시됩니다
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
              이미지 크기 조절의 장점
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              다양한 용도에 맞게 이미지 크기를 조절하여 최적화하세요
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
                <ImageIcon size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                웹사이트 최적화
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                웹사이트 로딩 속도 향상을 위한 이미지 크기 조절
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
                <ImageIcon size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                소셜 미디어
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                각 플랫폼에 맞는 최적 크기로 조절
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
                <ImageIcon size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                비율 유지
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                원본 비율을 유지하면서 크기 조절
              </p>
            </div>
          </div>
        </div>

        {imageSrc && <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>}
      </div>
    </Layout>
  );
}
