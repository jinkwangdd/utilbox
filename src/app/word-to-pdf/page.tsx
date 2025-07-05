'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Download, Trash2, ArrowLeft, File } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

interface FileWithPreview extends File {
  preview?: string;
}

export default function WordToPdfPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt'],
      'text/html': ['.html', '.htm']
    },
    multiple: false
  });

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      return newFiles;
    });
  };

  const convertToPdf = async () => {
    if (files.length === 0) {
      toast.error('변환할 파일을 선택해주세요.');
      return;
    }

    setIsConverting(true);
    toast.loading('PDF로 변환 중...');

    try {
      const formData = new FormData();
      formData.append('file', files[0]);

      const response = await fetch('/api/convert/word-to-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('변환에 실패했습니다.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted_${files[0].name.replace(/\.[^/.]+$/, '')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('PDF 변환이 완료되었습니다!');
    } catch (error) {
      console.error('변환 오류:', error);
      toast.error('변환 중 오류가 발생했습니다.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Layout>
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
              Word to PDF 변환기
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#6b7280', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Word 문서, 텍스트 파일을 PDF로 변환하세요. DOCX, DOC, TXT, HTML 형식을 지원합니다.
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
              <FileText size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                파일 업로드
              </h2>
            </div>

            {/* 파일 업로드 영역 */}
            <div
              {...getRootProps()}
              style={{
                border: '2px dashed #d1d5db',
                borderRadius: '16px',
                padding: '48px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: isDragActive ? '#f3f4f6' : '#ffffff',
                borderColor: isDragActive ? '#667eea' : '#d1d5db'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLDivElement).style.borderColor = '#667eea';
                (e.target as HTMLDivElement).style.backgroundColor = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLDivElement).style.borderColor = isDragActive ? '#667eea' : '#d1d5db';
                (e.target as HTMLDivElement).style.backgroundColor = isDragActive ? '#f3f4f6' : '#ffffff';
              }}
            >
              <input {...getInputProps()} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Upload size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
                <p style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  marginBottom: '8px' 
                }}>
                  {isDragActive ? '파일을 여기에 놓으세요' : '클릭하거나 파일을 드래그하세요'}
                </p>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>
                  DOCX, DOC, TXT, HTML 파일을 지원합니다
                </p>
              </div>
            </div>

            {/* 선택된 파일 목록 */}
            {files.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                  선택된 파일
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {files.map((file, index) => (
                    <div key={index} style={{ 
                      backgroundColor: '#f8fafc', 
                      borderRadius: '12px', 
                      padding: '16px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: '#e0e7ff', 
                          borderRadius: '8px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          <FileText size={20} style={{ color: '#667eea' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ 
                            fontSize: '14px', 
                            fontWeight: '600', 
                            color: '#1f2937', 
                            margin: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {file.name}
                          </p>
                          <p style={{ 
                            fontSize: '12px', 
                            color: '#6b7280', 
                            margin: 0 
                          }}>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          style={{
                            color: '#9ca3af',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLButtonElement).style.color = '#ef4444';
                            (e.target as HTMLButtonElement).style.backgroundColor = '#fef2f2';
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLButtonElement).style.color = '#9ca3af';
                            (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 변환 버튼 */}
            {files.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <Button
                  onClick={convertToPdf}
                  disabled={isConverting}
                  size="lg"
                  style={{ width: '100%' }}
                >
                  {isConverting ? (
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
                      변환 중...
                    </>
                  ) : (
                    <>
                      <Download size={20} style={{ marginRight: '8px' }} />
                      PDF로 변환하기
                    </>
                  )}
                </Button>
              </div>
            )}
          </Card>

          {/* 결과 섹션 */}
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Download size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                변환 결과
              </h2>
            </div>

            <div style={{ 
              backgroundColor: '#f8fafc', 
              borderRadius: '16px', 
              padding: '32px',
              textAlign: 'center',
              border: '2px dashed #e5e7eb'
            }}>
              <FileText size={64} style={{ color: '#9ca3af', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                변환된 PDF 파일
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                파일을 업로드하고 변환 버튼을 클릭하면<br />
                여기에 변환된 PDF 파일이 표시됩니다.
              </p>
            </div>

            {/* 사용법 안내 */}
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                사용법
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  '1. Word 문서(.docx, .doc) 또는 텍스트 파일(.txt, .html)을 업로드하세요',
                  '2. 파일이 정상적으로 업로드되었는지 확인하세요',
                  '3. "PDF로 변환하기" 버튼을 클릭하세요',
                  '4. 변환이 완료되면 자동으로 다운로드됩니다'
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
          </Card>
        </div>

        {/* 광고 배너 */}
        <div style={{ 
          marginTop: '48px', 
          padding: '24px', 
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
