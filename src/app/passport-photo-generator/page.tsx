'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Camera, Download, Trash2, ArrowLeft, Settings, CheckCircle, Globe } from 'lucide-react';
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
  country: string;
  background: string;
  downloadUrl?: string;
}

const COUNTRIES = [
  { code: 'korea', name: '대한민국', size: '35x45mm' },
  { code: 'usa', name: '미국', size: '50x50mm' },
  { code: 'japan', name: '일본', size: '35x45mm' },
  { code: 'china', name: '중국', size: '33x48mm' },
  { code: 'uk', name: '영국', size: '35x45mm' },
  { code: 'schengen', name: '유럽(스켕겐)', size: '35x45mm' }
];

const BACKGROUNDS = [
  { value: 'white', name: '흰색 배경' },
  { value: 'blue', name: '파란색 배경' },
  { value: 'gray', name: '회색 배경' }
];

export default function PassportPhotoGeneratorPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('korea');
  const [selectedBackground, setSelectedBackground] = useState('white');

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
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      return newFiles;
    });
  };

  const generatePassportPhoto = async () => {
    if (files.length === 0) {
      toast.error('처리할 이미지를 선택해주세요.');
      return;
    }

    setIsProcessing(true);
    toast.loading('여권사진 생성 중...');

    try {
      const newProcessedFiles: ProcessedFile[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('country', selectedCountry);
        formData.append('background', selectedBackground);

        const response = await fetch('/api/image/passport-photo', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('여권사진 생성에 실패했습니다.');
        }

        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        
        newProcessedFiles.push({
          original: file,
          country: selectedCountry,
          background: selectedBackground,
          downloadUrl
        });
      }

      setProcessedFiles(prev => [...prev, ...newProcessedFiles]);
      setFiles([]);
      toast.success('여권사진 생성이 완료되었습니다!');
    } catch (error) {
      console.error('처리 오류:', error);
      toast.error('처리 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (processedFile: ProcessedFile) => {
    if (processedFile.downloadUrl) {
      const link = document.createElement('a');
      link.href = processedFile.downloadUrl;
      link.download = `passport-photo-${processedFile.country}.jpg`;
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

  const getCountryName = (code: string) => {
    return COUNTRIES.find(country => country.code === code)?.name || code;
  };

  const getCountrySize = (code: string) => {
    return COUNTRIES.find(country => country.code === code)?.size || '';
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
              여권사진 생성
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#6b7280', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              사진을 각국 여권 규격에 맞게 편집하고 생성하세요. 정확한 크기와 배경으로 여권사진을 만들 수 있습니다.
            </p>
          </div>
        </div>

        {/* 설정 영역 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '32px',
          marginBottom: '48px'
        }}>
          {/* 국가 선택 */}
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Globe size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                국가 선택
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country.code)}
                  style={{
                    padding: '12px 16px',
                    border: selectedCountry === country.code ? '2px solid #667eea' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    backgroundColor: selectedCountry === country.code ? '#f0f4ff' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                    {country.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {country.size}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* 배경 선택 */}
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Settings size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                배경 선택
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {BACKGROUNDS.map((bg) => (
                <button
                  key={bg.value}
                  onClick={() => setSelectedBackground(bg.value)}
                  style={{
                    padding: '12px 16px',
                    border: selectedBackground === bg.value ? '2px solid #667eea' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    backgroundColor: selectedBackground === bg.value ? '#f0f4ff' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                    {bg.name}
                  </div>
                </button>
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
              {isDragActive ? '여기에 파일을 놓으세요' : '사진을 드래그 앤 드롭하거나 클릭하여 선택하세요'}
            </h3>
            <p style={{ 
              fontSize: '16px', 
              color: '#6b7280', 
              marginBottom: '16px' 
            }}>
              JPG, PNG 형식 지원 (최대 10MB)
            </p>
            <Button variant="primary" size="lg">
              사진 선택
            </Button>
          </div>
        </Card>

        {/* 업로드된 파일 목록 */}
        {files.length > 0 && (
          <Card variant="default" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                업로드된 사진 ({files.length})
              </h3>
              <Button 
                variant="secondary" 
                onClick={generatePassportPhoto}
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
                    생성 중...
                  </>
                ) : (
                  <>
                    <Camera size={16} />
                    여권사진 생성
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
                생성된 여권사진 ({processedFiles.length})
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
                        alt="여권사진"
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
                        여권사진
                      </p>
                    </div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#1f2937', 
                        margin: '0 0 4px 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {processedFile.original.name}
                      </p>
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#6b7280', 
                        margin: '0 0 4px 0' 
                      }}>
                        {getCountryName(processedFile.country)} ({getCountrySize(processedFile.country)})
                      </p>
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#6b7280', 
                        margin: 0 
                      }}>
                        배경: {BACKGROUNDS.find(bg => bg.value === processedFile.background)?.name}
                      </p>
                    </div>
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
