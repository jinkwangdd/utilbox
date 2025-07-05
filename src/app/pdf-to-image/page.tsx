'use client';

import { useState, useRef } from 'react';
import { Upload, Download, FileText, Image as ImageIcon } from 'lucide-react';
import JSZip from 'jszip';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

export default function PdfToImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('PDF 파일만 선택할 수 있습니다.');
        setFile(null);
      }
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError(null);
    } else {
      setError('PDF 파일만 드롭할 수 있습니다.');
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    setError(null);
    setImages([]);
    setZipUrl(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/convert/pdf-to-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '변환 중 오류가 발생했습니다.');
      }

      const blob = await response.blob();
      setZipUrl(URL.createObjectURL(blob));

      // zip 파일에서 이미지 추출 및 미리보기
      const zip = await JSZip.loadAsync(blob);
      const imageFiles = Object.keys(zip.files).filter((name) => name.endsWith('.png'));
      const imageUrls: string[] = [];
      for (const name of imageFiles) {
        const fileData = await zip.files[name].async('blob');
        imageUrls.push(URL.createObjectURL(fileData));
      }
      setImages(imageUrls);
    } catch (err) {
      setError(err instanceof Error ? err.message : '변환 중 오류가 발생했습니다.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownloadZip = () => {
    if (zipUrl) {
      const link = document.createElement('a');
      link.href = zipUrl;
      link.download = `pdf_images.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
            <FileText size={40} style={{ color: '#ffffff' }} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
            PDF to Image
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            PDF 파일의 모든 페이지를 고품질 이미지로 변환하여 쉽게 공유하고 편집하세요
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
                PDF 업로드
              </h2>
            </div>

            <div
              style={{
                border: '2px dashed #e5e7eb',
                borderRadius: '12px',
                padding: '40px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#f9fafb',
                transition: 'all 0.2s ease',
                marginBottom: '24px'
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <FileText size={48} style={{ color: '#9ca3af', marginBottom: '16px' }} />
              <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '8px' }}>
                PDF 파일을 드래그하거나 클릭하여 업로드
              </p>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                최대 10MB까지 지원
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>

            {file && (
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#f0fdf4', 
                borderRadius: '8px',
                border: '1px solid #bbf7d0',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} style={{ color: '#10b981' }} />
                  <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>
                    {file.name}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}

            {error && (
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#fef2f2', 
                borderRadius: '8px',
                border: '1px solid #fecaca',
                marginBottom: '24px'
              }}>
                <p style={{ fontSize: '14px', color: '#ef4444' }}>{error}</p>
              </div>
            )}

            <Button 
              onClick={handleConvert}
              disabled={!file || isConverting}
              style={{ width: '100%' }}
            >
              {isConverting ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px'
                  }} />
                  변환 중...
                </>
              ) : (
                <>
                  <ImageIcon size={20} style={{ marginRight: '8px' }} />
                  이미지로 변환
                </>
              )}
            </Button>
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
                <ImageIcon size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                변환 결과
              </h2>
            </div>

            {images.length > 0 ? (
              <div>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: '16px',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e5e7eb'
                }}>
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`페이지 ${idx + 1}`}
                      style={{
                        maxWidth: '180px',
                        maxHeight: '240px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  ))}
                </div>
                <Button 
                  onClick={handleDownloadZip}
                  style={{ width: '100%' }}
                >
                  <Download size={20} style={{ marginRight: '8px' }} />
                  전체 이미지 ZIP 다운로드
                </Button>
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                color: '#9ca3af'
              }}>
                <ImageIcon size={64} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p style={{ fontSize: '16px', marginBottom: '8px' }}>
                  변환된 이미지가 여기에 표시됩니다
                </p>
                <p style={{ fontSize: '14px' }}>
                  PDF를 업로드하고 변환 버튼을 클릭하세요
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
              PDF to Image의 장점
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              PDF를 이미지로 변환하여 다양한 용도로 활용하세요
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
                고품질 변환
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                원본 품질을 유지하면서 이미지로 변환
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
                쉬운 공유
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                이미지로 변환하여 소셜 미디어에 쉽게 공유
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
                편집 가능
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                이미지 편집 도구로 추가 편집 가능
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Layout>
  );
}
