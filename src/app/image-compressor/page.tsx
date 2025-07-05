'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, Download, Trash2, ArrowLeft, Settings, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

interface FileWithPreview {
  file: File;
  preview?: string;
  originalWidth?: number;
  originalHeight?: number;
}

interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  downloadUrl: string;
}

export default function ImageCompressorPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [originalImageWidth, setOriginalImageWidth] = useState(1920);
  const [outputFormat, setOutputFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    // 기존 파일의 URL 정리
    setFiles(prev => {
      prev.forEach(f => {
        if (f.preview) {
          URL.revokeObjectURL(f.preview);
        }
      });
      return [];
    });
    
    const newFile: FileWithPreview = {
      file: file,
      preview: URL.createObjectURL(file)
    };
    
    setFiles([newFile]); // 새 파일로 교체
    
    // 이미지 크기 분석
    const img = new Image();
    img.onload = () => {
      const originalWidth = img.width;
      const originalHeight = img.height;
      
      // 원본 이미지 크기 정보 저장
      setOriginalImageWidth(originalWidth);
      
      // 최대 너비를 원본 너비로 설정 (최대 3840px 제한)
      const newMaxWidth = Math.min(originalWidth, 3840);
      setMaxWidth(newMaxWidth);
      
      // 파일 객체에 원본 크기 정보 추가
      setFiles(prev => prev.map(f => ({ ...f, originalWidth, originalHeight })));
      
      toast.success(`이미지 크기: ${originalWidth} × ${originalHeight}px`);
    };
    img.onerror = () => {
      toast.error('이미지 크기 분석에 실패했습니다.');
    };
    img.src = URL.createObjectURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false
  });

  const removeFile = (index: number) => {
    setFiles(prev => {
      // 제거할 파일의 URL 정리
      const fileToRemove = prev[index];
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      
      const newFiles = prev.filter((_, i) => i !== index);
      
      // 파일이 없어지면 압축 결과와 원본 이미지 정보 초기화
      if (newFiles.length === 0) {
        setCompressionResult(null);
        setOriginalImageWidth(1920);
        setMaxWidth(1920);
      }
      
      return newFiles;
    });
  };

  const compressImage = async () => {
    if (files.length === 0) {
      toast.error('압축할 이미지를 선택해주세요.');
      return;
    }

    setIsCompressing(true);
    toast.loading('이미지 압축 중...');

    try {
      const fileWithPreview = files[0];
      const file = fileWithPreview.file;
      const originalSize = file.size;

      // Canvas를 사용한 이미지 압축
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // 이미지 크기 계산
        const targetWidth = Math.min(img.width, maxWidth);
        const targetHeight = Math.min(img.height, (img.height * targetWidth) / img.width);
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // 이미지 그리기
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 압축된 이미지를 Blob으로 변환
        const mimeType = outputFormat === 'jpeg' ? 'image/jpeg' : outputFormat === 'png' ? 'image/png' : 'image/webp';
        canvas.toBlob((blob) => {
          if (blob) {
            const url = window.URL.createObjectURL(blob);
            const compressedSize = blob.size;
            const compressionRatio = ((originalSize - compressedSize) / originalSize * 100);

            setCompressionResult({
              originalSize,
              compressedSize,
              compressionRatio,
              downloadUrl: url
            });

            toast.success('이미지 압축이 완료되었습니다!');
          } else {
            toast.error('이미지 압축에 실패했습니다.');
          }
          setIsCompressing(false);
        }, mimeType, outputFormat === 'jpeg' ? quality / 100 : 1);
      };

      img.onerror = () => {
        toast.error('이미지 로드에 실패했습니다.');
        setIsCompressing(false);
      };

      // 파일 URL 생성
      img.src = URL.createObjectURL(file);

    } catch (error) {
      console.error('압축 오류:', error);
      toast.error('압축 중 오류가 발생했습니다.');
      setIsCompressing(false);
    }
  };

  const downloadCompressedImage = () => {
    if (compressionResult && files.length > 0) {
      const a = document.createElement('a');
      a.href = compressionResult.downloadUrl;
      const extension = outputFormat === 'jpeg' ? 'jpg' : outputFormat;
      const originalName = files[0].file.name;
      const nameWithoutExtension = originalName.replace(/\.[^/.]+$/, '');
      a.download = `compressed_${nameWithoutExtension}.${extension}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(compressionResult.downloadUrl);
      document.body.removeChild(a);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
              이미지 압축
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#6b7280', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              이미지 파일 크기를 줄여서 웹사이트 로딩 속도를 개선하세요. JPG, PNG, GIF, BMP, WebP 형식을 지원합니다.
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
              <Upload size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                이미지 업로드
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
                  JPG, PNG, GIF, BMP, WebP 파일을 지원합니다
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
                          <FileImage size={20} style={{ color: '#667eea' }} />
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
                            {file.file.name}
                          </p>
                          <p style={{ 
                            fontSize: '12px', 
                            color: '#6b7280', 
                            margin: 0 
                          }}>
                            {formatFileSize(file.file.size)}
                            {file.originalWidth && file.originalHeight && (
                              <span style={{ marginLeft: '8px' }}>
                                • {file.originalWidth} × {file.originalHeight}px
                              </span>
                            )}
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

            {/* 압축 옵션 */}
            {files.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                  <Settings size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  압축 옵션
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
                      품질: {quality}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(parseInt(e.target.value))}
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
                      <span>낮음</span>
                      <span>높음</span>
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
                      출력 형식
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[
                        { value: 'jpeg', label: 'JPEG', desc: '압축률 높음' },
                        { value: 'png', label: 'PNG', desc: '투명도 지원' },
                        { value: 'webp', label: 'WebP', desc: '최신 형식' }
                      ].map((format) => (
                        <button
                          key={format.value}
                          onClick={() => setOutputFormat(format.value as 'jpeg' | 'png' | 'webp')}
                          style={{
                            flex: 1,
                            padding: '12px 8px',
                            border: outputFormat === format.value ? '2px solid #667eea' : '1px solid #e5e7eb',
                            borderRadius: '8px',
                            backgroundColor: outputFormat === format.value ? '#f0f4ff' : '#ffffff',
                            color: outputFormat === format.value ? '#667eea' : '#6b7280',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ fontSize: '14px', marginBottom: '2px' }}>{format.label}</div>
                          <div style={{ fontSize: '10px', opacity: 0.7 }}>{format.desc}</div>
                        </button>
                      ))}
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
                      최대 너비: {maxWidth}px
                      {files.length > 0 && files[0].originalWidth && (
                        <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400', marginLeft: '8px' }}>
                          (원본: {files[0].originalWidth}px)
                        </span>
                      )}
                    </label>
                    <input
                      type="range"
                      min="320"
                      max={originalImageWidth}
                      step="160"
                      value={maxWidth}
                      onChange={(e) => setMaxWidth(parseInt(e.target.value))}
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
                      <span>320px</span>
                      <span>{originalImageWidth}px</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 압축 버튼 */}
            {files.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <Button
                  onClick={compressImage}
                  disabled={isCompressing}
                  size="lg"
                  style={{ width: '100%' }}
                >
                  {isCompressing ? (
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
                      압축 중...
                    </>
                  ) : (
                    <>
                      <BarChart3 size={20} style={{ marginRight: '8px' }} />
                      이미지 압축하기
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
                압축 결과
              </h2>
            </div>

            {compressionResult ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 압축 통계 */}
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '16px', 
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: '800', color: '#ef4444', marginBottom: '4px' }}>
                        {formatFileSize(compressionResult.originalSize)}
                      </div>
                      <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
                        원본 크기
                      </p>
                    </div>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', marginBottom: '4px' }}>
                        {formatFileSize(compressionResult.compressedSize)}
                      </div>
                      <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
                        압축 후 크기
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ 
                    backgroundColor: '#e0e7ff', 
                    borderRadius: '12px', 
                    padding: '16px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#667eea', marginBottom: '4px' }}>
                      {compressionResult.compressionRatio}%
                    </div>
                    <p style={{ color: '#667eea', fontSize: '14px', fontWeight: '600', margin: 0 }}>
                      압축률
                    </p>
                  </div>

                  <Button onClick={downloadCompressedImage} size="lg" style={{ width: '100%' }}>
                    <Download size={20} style={{ marginRight: '8px' }} />
                    압축된 이미지 다운로드
                  </Button>
                </div>

                {/* 압축 팁 */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                    압축 팁
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      '품질을 낮출수록 파일 크기가 줄어듭니다',
                      '최대 너비는 원본 이미지 크기를 기준으로 설정됩니다',
                      '원본보다 큰 크기로 설정하면 용량이 늘어날 수 있습니다',
                      '웹용 이미지는 80% 품질이 적당합니다',
                      'JPEG는 압축률이 높고, PNG는 투명도를 지원합니다',
                      'WebP는 최신 형식으로 더 나은 압축률을 제공합니다',
                      '원본 파일은 백업해두세요'
                    ].map((tip, index) => (
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
                          💡
                        </div>
                        <p style={{ 
                          color: '#374151', 
                          fontSize: '14px', 
                          lineHeight: '1.5',
                          margin: 0
                        }}>
                          {tip}
                        </p>
                      </div>
                    ))}
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
                <BarChart3 size={64} style={{ color: '#9ca3af', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  압축된 이미지
                </h3>
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                  이미지를 업로드하고 압축 버튼을 클릭하면<br />
                  여기에 압축 결과가 표시됩니다.
                </p>
              </div>
            )}
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
            JPG to PDF, QR 코드 생성, 시간대 변환 등 다양한 유틸리티를 제공합니다
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
