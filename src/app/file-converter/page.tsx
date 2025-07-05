'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Download, Trash2, ArrowLeft, Settings, FileImage, FileAudio, FileVideo, FileArchive } from 'lucide-react';
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
  targetFormat: string;
  downloadUrl?: string;
}

const FILE_TYPES = {
  'image': {
    name: '이미지',
    icon: FileImage,
    formats: ['jpg', 'png', 'webp', 'gif', 'bmp'],
    extensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp']
  },
  'document': {
    name: '문서',
    icon: FileText,
    formats: ['pdf', 'docx', 'txt', 'rtf'],
    extensions: ['.pdf', '.docx', '.txt', '.rtf']
  },
  'audio': {
    name: '오디오',
    icon: FileAudio,
    formats: ['mp3', 'wav', 'ogg', 'aac'],
    extensions: ['.mp3', '.wav', '.ogg', '.aac']
  },
  'video': {
    name: '비디오',
    icon: FileVideo,
    formats: ['mp4', 'avi', 'mov', 'mkv'],
    extensions: ['.mp4', '.avi', '.mov', '.mkv']
  },
  'archive': {
    name: '압축파일',
    icon: FileArchive,
    formats: ['zip', 'rar', '7z', 'tar'],
    extensions: ['.zip', '.rar', '.7z', '.tar']
  }
};

export default function FileConverterPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFileType, setSelectedFileType] = useState('image');
  const [targetFormat, setTargetFormat] = useState('png');

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
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.aac'],
      'video/*': ['.mp4', '.avi', '.mov', '.mkv'],
      'application/zip': ['.zip'],
      'application/x-rar-compressed': ['.rar']
    },
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      return newFiles;
    });
  };

  const convertFiles = async () => {
    if (files.length === 0) {
      toast.error('변환할 파일을 선택해주세요.');
      return;
    }

    setIsProcessing(true);
    toast.loading('파일 변환 중...');

    try {
      const newProcessedFiles: ProcessedFile[] = [];

      for (const file of files) {
        // 실제 변환 로직은 여기에 구현
        // 현재는 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 변환된 파일의 다운로드 URL 생성 (실제로는 변환된 파일)
        const downloadUrl = URL.createObjectURL(file);
        
        newProcessedFiles.push({
          original: file,
          targetFormat,
          downloadUrl
        });
      }

      setProcessedFiles(prev => [...prev, ...newProcessedFiles]);
      setFiles([]);
      toast.success('파일 변환이 완료되었습니다!');
    } catch (error) {
      console.error('변환 오류:', error);
      toast.error('변환 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (processedFile: ProcessedFile) => {
    if (processedFile.downloadUrl) {
      const link = document.createElement('a');
      link.href = processedFile.downloadUrl;
      const originalName = processedFile.original.name;
      const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
      link.download = `${nameWithoutExt}.${processedFile.targetFormat}`;
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

  const getFileTypeIcon = (fileType: string) => {
    const IconComponent = FILE_TYPES[fileType as keyof typeof FILE_TYPES]?.icon || FileText;
    return <IconComponent size={20} />;
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
              파일 형식 변환기
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#6b7280', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              다양한 파일 형식을 원하는 형식으로 변환하세요. 이미지, 문서, 오디오, 비디오 등 모든 파일을 지원합니다.
            </p>
          </div>
        </div>

        {/* 파일 타입 및 형식 선택 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '32px',
          marginBottom: '48px'
        }}>
          {/* 파일 타입 선택 */}
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Settings size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                파일 타입 선택
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {Object.entries(FILE_TYPES).map(([key, type]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedFileType(key);
                    setTargetFormat(type.formats[0]);
                  }}
                  style={{
                    padding: '16px',
                    border: selectedFileType === key ? '2px solid #667eea' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    backgroundColor: selectedFileType === key ? '#f0f4ff' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{ color: selectedFileType === key ? '#667eea' : '#6b7280' }}>
                    {getFileTypeIcon(key)}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                      {type.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {type.formats.join(', ')}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* 대상 형식 선택 */}
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <FileText size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                변환할 형식
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '12px' }}>
              {FILE_TYPES[selectedFileType as keyof typeof FILE_TYPES]?.formats.map((format) => (
                <button
                  key={format}
                  onClick={() => setTargetFormat(format)}
                  style={{
                    padding: '12px 16px',
                    border: targetFormat === format ? '2px solid #667eea' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    backgroundColor: targetFormat === format ? '#f0f4ff' : '#ffffff',
                    color: targetFormat === format ? '#667eea' : '#6b7280',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    textTransform: 'uppercase'
                  }}
                >
                  {format}
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
              {isDragActive ? '여기에 파일을 놓으세요' : '파일을 드래그 앤 드롭하거나 클릭하여 선택하세요'}
            </h3>
            <p style={{ 
              fontSize: '16px', 
              color: '#6b7280', 
              marginBottom: '16px' 
            }}>
              지원 형식: {FILE_TYPES[selectedFileType as keyof typeof FILE_TYPES]?.extensions.join(', ')}
            </p>
            <Button variant="primary" size="lg">
              파일 선택
            </Button>
          </div>
        </Card>

        {/* 업로드된 파일 목록 */}
        {files.length > 0 && (
          <Card variant="default" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                업로드된 파일 ({files.length})
              </h3>
              <Button 
                variant="secondary" 
                onClick={convertFiles}
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
                    변환 중...
                  </>
                ) : (
                  <>
                    <FileText size={16} />
                    {targetFormat.toUpperCase()}로 변환
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
                  <div style={{ 
                    width: '100%', 
                    height: '100px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: '#e5e7eb'
                  }}>
                    {getFileTypeIcon(selectedFileType)}
                  </div>
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

        {/* 변환된 파일 목록 */}
        {processedFiles.length > 0 && (
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                변환된 파일 ({processedFiles.length})
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
                      <div style={{ 
                        width: '100%', 
                        height: '80px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '8px'
                      }}>
                        {getFileTypeIcon(selectedFileType)}
                      </div>
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
                      <div style={{ 
                        width: '100%', 
                        height: '80px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: '#e0f2fe',
                        borderRadius: '8px'
                      }}>
                        <FileText size={24} style={{ color: '#0284c7' }} />
                      </div>
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#6b7280', 
                        margin: '8px 0 0 0' 
                      }}>
                        {processedFile.targetFormat.toUpperCase()}
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
                        margin: 0 
                      }}>
                        변환 형식: {processedFile.targetFormat.toUpperCase()}
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