'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, Download, Trash2, ArrowLeft, Scissors, Image, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

interface FileWithPreview extends File {
  preview?: string;
}

interface ProcessedFile {
  original: FileWithPreview;
  processed?: string;
  downloadUrl?: string;
}

export default function BackgroundRemoverPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

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
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp']
    },
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      return newFiles;
    });
  };

  const removeBackground = async () => {
    if (files.length === 0) {
      toast.error('처리할 이미지를 선택해주세요.');
      return;
    }

    setIsProcessing(true);
    toast.loading('배경 제거 중... (최대 30초 소요될 수 있습니다)');

    try {
      const newProcessedFiles: ProcessedFile[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // 진행 상황 업데이트
        toast.loading(`배경 제거 중... (${i + 1}/${files.length})`);
        
        const formData = new FormData();
        formData.append('image', file);

        // 타임아웃 설정 (30초)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch('/api/image/background-remove', {
          method: 'POST',
          body: formData,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '배경 제거 처리에 실패했습니다.');
        }

        const blob = await response.blob();
        
        if (blob.size === 0) {
          throw new Error('처리된 이미지가 비어있습니다.');
        }

        const downloadUrl = URL.createObjectURL(blob);
        
        newProcessedFiles.push({
          original: file,
          downloadUrl
        });
      }

      setProcessedFiles(prev => [...prev, ...newProcessedFiles]);
      setFiles([]);
      toast.success('배경 제거가 완료되었습니다!');
    } catch (error) {
      console.error('처리 오류:', error);
      
      let errorMessage = '처리 중 오류가 발생했습니다.';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = '처리 시간이 초과되었습니다. 더 작은 이미지를 사용해주세요.';
        } else if (error.message.includes('memory')) {
          errorMessage = '이미지가 너무 큽니다. 더 작은 이미지를 사용해주세요.';
        } else if (error.message.includes('format')) {
          errorMessage = '지원되지 않는 이미지 형식입니다.';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (processedFile: ProcessedFile) => {
    if (processedFile.downloadUrl) {
      const link = document.createElement('a');
      link.href = processedFile.downloadUrl;
      link.download = `background-removed-${processedFile.original.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('파일이 다운로드되었습니다.');
    }
  };

  const clearAll = () => {
    setFiles([]);
    setProcessedFiles([]);
    toast.success('모든 파일이 제거되었습니다.');
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
              배경 제거
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#6b7280', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              AI 기술을 활용하여 이미지의 배경을 자동으로 제거하세요. 투명 배경 이미지를 쉽게 만들 수 있습니다.
            </p>
          </div>
        </div>

        {/* 기능 설명 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '48px',
          alignItems: 'start',
          marginBottom: '48px'
        }}>
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Scissors size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                제공 기능
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                {
                  title: 'AI 자동 제거',
                  description: '고급 AI 모델로 배경을 자동으로 감지하고 제거',
                  icon: '🤖'
                },
                {
                  title: '고품질 결과',
                  description: '4K 해상도까지 지원하는 고품질 배경 제거',
                  icon: '✨'
                },
                {
                  title: '다양한 형식',
                  description: 'JPG, PNG, WebP 등 다양한 이미지 형식 지원',
                  icon: '🖼️'
                },
                {
                  title: '투명 배경',
                  description: 'PNG 형식으로 투명 배경 이미지 생성',
                  icon: '🎨'
                }
              ].map((feature, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px',
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px'
                }}>
                  <div style={{ fontSize: '24px' }}>{feature.icon}</div>
                  <div>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      margin: '0 0 4px 0' 
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#6b7280', 
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 사용법 */}
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Image size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                사용 방법
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                {
                  step: '1',
                  title: '이미지 업로드',
                  description: '배경을 제거할 이미지를 드래그 앤 드롭하거나 클릭하여 선택하세요.'
                },
                {
                  step: '2',
                  title: '배경 제거',
                  description: 'AI가 자동으로 배경을 감지하고 제거합니다. 처리 시간은 이미지 크기에 따라 달라집니다.'
                },
                {
                  step: '3',
                  title: '결과 다운로드',
                  description: '처리된 투명 배경 이미지를 PNG 형식으로 다운로드하세요.'
                }
              ].map((step, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '16px',
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px'
                }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: '#667eea', 
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    flexShrink: 0
                  }}>
                    {step.step}
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      margin: '0 0 4px 0' 
                    }}>
                      {step.title}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#6b7280', 
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 파일 업로드 영역 */}
        <Card variant="default" style={{ marginBottom: '32px' }}>
          <div style={{ 
            border: '2px dashed #d1d5db', 
            borderRadius: '16px', 
            padding: '48px 24px',
            textAlign: 'center',
            backgroundColor: isDragActive ? '#f3f4f6' : '#ffffff',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }} {...getRootProps()}>
            <input {...getInputProps()} />
            <Upload size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#1f2937', 
              marginBottom: '8px' 
            }}>
              {isDragActive ? '여기에 파일을 놓으세요' : '이미지를 드래그 앤 드롭하거나 클릭하여 선택하세요'}
            </h3>
            <p style={{ 
              fontSize: '16px', 
              color: '#6b7280', 
              marginBottom: '16px' 
            }}>
              JPG, PNG, GIF, BMP 형식 지원 (최대 10MB)
            </p>
            <Button variant="primary" size="lg">
              이미지 선택
            </Button>
          </div>
        </Card>

        {/* 업로드된 파일 목록 */}
        {files.length > 0 && (
          <Card variant="default" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                업로드된 이미지 ({files.length})
              </h3>
              <Button 
                variant="secondary" 
                onClick={removeBackground}
                disabled={isProcessing}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {isProcessing ? (
                  <>
                    <div style={{ 
                      width: '16px', 
                      height: '16px', 
                      border: '2px solid #ffffff', 
                      borderTop: '2px solid transparent', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite' 
                    }} />
                    처리 중...
                  </>
                ) : (
                  <>
                    <Scissors size={16} />
                    배경 제거 시작
                  </>
                )}
              </Button>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
              gap: '16px' 
            }}>
              {files.map((file, index) => (
                <div key={index} style={{ 
                  position: 'relative',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#f9fafb'
                }}>
                  <img 
                    src={file.preview} 
                    alt={file.name}
                    style={{ 
                      width: '100%', 
                      height: '150px', 
                      objectFit: 'cover' 
                    }} 
                  />
                  <div style={{ padding: '12px' }}>
                    <p style={{ 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#1f2937', 
                      margin: '0 0 4px 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {file.name}
                    </p>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#6b7280', 
                      margin: '0 0 8px 0' 
                    }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => removeFile(index)}
                      style={{ width: '100%' }}
                    >
                      <Trash2 size={14} />
                      제거
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 처리된 파일 목록 */}
        {processedFiles.length > 0 && (
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                처리된 이미지 ({processedFiles.length})
              </h3>
              <Button variant="secondary" onClick={clearAll}>
                모두 지우기
              </Button>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '24px' 
            }}>
              {processedFiles.map((processedFile, index) => (
                <div key={index} style={{ 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff'
                }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '1px',
                    backgroundColor: '#e5e7eb'
                  }}>
                    <div style={{ 
                      position: 'relative',
                      backgroundColor: '#f9fafb',
                      padding: '16px',
                      textAlign: 'center'
                    }}>
                      <img 
                        src={processedFile.original.preview} 
                        alt="원본"
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '150px', 
                          objectFit: 'contain' 
                        }} 
                      />
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#6b7280', 
                        margin: '8px 0 0 0' 
                      }}>
                        원본
                      </p>
                    </div>
                    <div style={{ 
                      position: 'relative',
                      backgroundColor: '#f9fafb',
                      padding: '16px',
                      textAlign: 'center'
                    }}>
                      <img 
                        src={processedFile.downloadUrl} 
                        alt="처리됨"
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '150px', 
                          objectFit: 'contain' 
                        }} 
                      />
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#6b7280', 
                        margin: '8px 0 0 0' 
                      }}>
                        배경 제거됨
                      </p>
                    </div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#1f2937', 
                      margin: '0 0 12px 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {processedFile.original.name}
                    </p>
                    <Button 
                      variant="primary" 
                      onClick={() => downloadFile(processedFile)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                      <Download size={16} />
                      다운로드
                    </Button>
                  </div>
                </div>
              ))}
        </div>
          </Card>
        )}

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
