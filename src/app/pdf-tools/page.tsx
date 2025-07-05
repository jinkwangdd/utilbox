'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  FileText, 
  Download, 
  Trash2, 
  ArrowLeft, 
  Settings, 
  Scissors, 
  Merge, 
  Info,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import AdSlot from '../../components/AdSlot';


interface FileWithPreview {
  file: File;
  preview?: string;
  info?: {
    pageCount: number;
    fileSize: number;
    fileName: string;
  };
}

interface PdfInfo {
  fileName: string;
  fileSize: number;
  pageCount: number;
  pageSizes: { width: number; height: number }[];
  isEncrypted: boolean;
  title: string | null;
  author: string | null;
  subject: string | null;
  creator: string | null;
  producer: string | null;
  creationDate: string | null;
  modificationDate: string | null;
}

type ToolMode = 'split' | 'merge' | 'info';

export default function PdfToolsPage() {
  const [mode, setMode] = useState<ToolMode>('split');
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [pdfInfo, setPdfInfo] = useState<PdfInfo | null>(null);
  const [splitType, setSplitType] = useState<'all' | 'range'>('all');
  const [pageRange, setPageRange] = useState('');
  const [downloadType, setDownloadType] = useState<'zip' | 'individual'>('zip');
  const [splitResults, setSplitResults] = useState<Array<{pageNumber: number, fileName: string}>>([]);
  const [copied, setCopied] = useState(false);

  const getPdfInfo = useCallback(async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/pdf-tools/info', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'PDF 정보를 가져올 수 없습니다.');
      }

      const info = await response.json();
      return info;
    } catch (error) {
      console.error('PDF 정보 가져오기 오류:', error);
      throw error; // 오류를 다시 던져서 상위에서 처리하도록 함
    }
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    // 기존 파일의 URL 정리
    setFiles(prev => {
      prev.forEach(f => {
        if (f.preview) {
          URL.revokeObjectURL(f.preview);
        }
      });
      return [];
    });
    
    const newFiles: FileWithPreview[] = acceptedFiles.map(file => ({
      file: file,
      preview: URL.createObjectURL(file)
    }));
    
    setFiles(newFiles);
    setDownloadUrl(null);
    setPdfInfo(null);
    setSplitResults([]);

    // PDF 정보 자동 가져오기 (합병 모드와 분할 모드에서)
    if (mode === 'merge' || mode === 'split') {
      try {
        const filesWithInfo = await Promise.all(
          newFiles.map(async (fileWithPreview) => {
            try {
              const info = await getPdfInfo(fileWithPreview.file);
              return {
                ...fileWithPreview,
                info: {
                  pageCount: info.pageCount,
                  fileSize: info.fileSize,
                  fileName: info.fileName
                }
              };
            } catch (error) {
              console.warn(`파일 ${fileWithPreview.file.name} 정보 가져오기 실패:`, error);
              return fileWithPreview;
            }
          })
        );
        setFiles(filesWithInfo);
      } catch (error) {
        console.error('PDF 정보 가져오기 오류:', error);
      }
    }
  }, [mode, getPdfInfo]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: mode === 'merge'
  });

  const removeFile = (index: number) => {
    setFiles(prev => {
      const fileToRemove = prev[index];
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      
      const newFiles = prev.filter((_, i) => i !== index);
      
      if (newFiles.length === 0) {
        setDownloadUrl(null);
        setPdfInfo(null);
        setSplitResults([]);
      }
      
      return newFiles;
    });
  };

  const downloadIndividualPage = async (pageNumber: number) => {
    try {
      const formData = new FormData();
      formData.append('file', files[0].file);
      formData.append('pageNumber', pageNumber.toString());

      const response = await fetch('/api/pdf-tools/download-page', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '페이지 다운로드에 실패했습니다.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${files[0].file.name.replace(/\.pdf$/i, '')}_page_${pageNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`페이지 ${pageNumber} 다운로드 완료!`);
    } catch (error) {
      console.error('개별 페이지 다운로드 오류:', error);
      toast.error(error instanceof Error ? error.message : '페이지 다운로드 중 오류가 발생했습니다.');
    }
  };

  const processFiles = async () => {
    if (files.length === 0) {
      toast.error('PDF 파일을 선택해주세요.');
      return;
    }

    setIsProcessing(true);
    toast.loading('처리 중...');

    try {
      if (mode === 'split') {
        if (files.length !== 1) {
          throw new Error('분할하려면 하나의 PDF 파일만 선택해주세요.');
        }

        const formData = new FormData();
        formData.append('file', files[0].file);
        formData.append('splitType', splitType);
        formData.append('downloadType', downloadType);
        if (splitType === 'range') {
          formData.append('pageRange', pageRange);
        }

        const response = await fetch('/api/pdf-tools/split', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '분할에 실패했습니다.');
        }

        if (downloadType === 'individual') {
          // 개별 다운로드 모드 - 분할된 페이지 목록을 저장
          const totalFiles = response.headers.get('X-Total-Files');
          const fileData = response.headers.get('X-File-Data');
          
          if (totalFiles && fileData) {
            const fileList = JSON.parse(fileData);
            setSplitResults(fileList);
            setDownloadUrl(null);
            toast.success(`PDF 분할 완료! ${totalFiles}개 페이지를 개별 다운로드할 수 있습니다.`);
          } else {
            throw new Error('분할 결과를 가져올 수 없습니다.');
          }
                  } else {
            // ZIP 다운로드 모드
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setDownloadUrl(url);
            setSplitResults([]);
            
            // 총 페이지 수 정보 포함
            const totalPages = files[0].info?.pageCount || 0;
            const successMessage = totalPages > 0 
              ? `PDF 분할이 완료되었습니다! (총 ${totalPages}페이지)`
              : 'PDF 분할이 완료되었습니다!';
            
            toast.success(successMessage);
          }

      } else if (mode === 'merge') {
        if (files.length < 2) {
          throw new Error('합병하려면 최소 2개의 PDF 파일이 필요합니다.');
        }

        console.log('PDF 합병 시작, 파일 수:', files.length);
        
        const formData = new FormData();
        files.forEach((file, index) => {
          console.log(`파일 ${index + 1} 추가:`, file.file.name, '크기:', file.file.size);
          formData.append('files', file.file);
        });

        console.log('API 호출 시작');
        
        try {
          const response = await fetch('/api/pdf-tools/merge', {
            method: 'POST',
            body: formData,
          });

          console.log('API 응답 상태:', response.status, response.statusText);
          console.log('응답 헤더:', Object.fromEntries(response.headers.entries()));

          if (!response.ok) {
            let errorMessage = '합병에 실패했습니다.';
            try {
              const errorData = await response.json();
              errorMessage = errorData.error || errorMessage;
              console.error('서버 오류 응답:', errorData);
            } catch (parseError) {
              console.error('오류 응답 파싱 실패:', parseError);
              errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            }
            throw new Error(errorMessage);
          }

          console.log('PDF 합병 성공, blob 생성 중');
          const blob = await response.blob();
          console.log('생성된 blob 크기:', blob.size, '타입:', blob.type);
          
          if (blob.size === 0) {
            throw new Error('생성된 PDF 파일이 비어있습니다.');
          }
          
          const url = window.URL.createObjectURL(blob);
          setDownloadUrl(url);
          
          // 총 페이지 수 계산
          const totalPages = files.reduce((sum, f) => sum + (f.info?.pageCount || 0), 0);
          const successMessage = totalPages > 0 
            ? `PDF 합병이 완료되었습니다! (총 ${totalPages}페이지)`
            : 'PDF 합병이 완료되었습니다!';
          
          toast.success(successMessage);
          
        } catch (fetchError) {
          console.error('네트워크 요청 오류:', fetchError);
          if (fetchError instanceof TypeError && fetchError.message.includes('fetch')) {
            throw new Error('네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.');
          }
          throw fetchError;
        }

      } else if (mode === 'info') {
        if (files.length !== 1) {
          throw new Error('정보를 확인하려면 하나의 PDF 파일만 선택해주세요.');
        }

        const info = await getPdfInfo(files[0].file);
        if (info) {
          setPdfInfo(info);
          toast.success('PDF 정보를 가져왔습니다!');
        } else {
          throw new Error('PDF 정보를 가져올 수 없습니다.');
        }
      }

    } catch (error) {
      console.error('처리 오류:', error);
      toast.error(error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = () => {
    if (downloadUrl) {
      // 광고 표시 후 다운로드 실행
      toast.success('광고를 확인해주세요! 잠시 후 다운로드가 시작됩니다.');
      
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = downloadUrl;
        
        if (mode === 'split') {
          a.download = `split_${files[0].file.name.replace(/\.pdf$/i, '')}.zip`;
        } else if (mode === 'merge') {
          const baseName = files[0].file.name.replace(/\.pdf$/i, '');
          a.download = files.length === 2 
            ? `${baseName}_merged.pdf`
            : `merged_${new Date().toISOString().slice(0, 10)}.pdf`;
        }
        
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
        
        toast.success('다운로드가 시작되었습니다!');
      }, 3000); // 3초 후 다운로드 실행
    }
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '없음';
    try {
      return new Date(dateString).toLocaleString('ko-KR');
    } catch {
      return dateString;
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
              PDF 도구
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#6b7280', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              PDF 파일을 분할하고, 합병하고, 정보를 확인하세요. 강력한 PDF 편집 도구를 제공합니다.
            </p>
          </div>
        </div>

        {/* 도구 선택 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { value: 'split', label: 'PDF 분할', icon: Scissors, desc: '페이지별로 분할' },
              { value: 'merge', label: 'PDF 합병', icon: Merge, desc: '여러 PDF 합치기' },
              { value: 'info', label: 'PDF 정보', icon: Info, desc: '파일 정보 확인' }
            ].map((tool) => (
              <button
                key={tool.value}
                onClick={() => {
                  setMode(tool.value as ToolMode);
                  setFiles([]);
                  setDownloadUrl(null);
                  setPdfInfo(null);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px 24px',
                  border: mode === tool.value ? '2px solid #667eea' : '1px solid #e5e7eb',
                  borderRadius: '12px',
                  backgroundColor: mode === tool.value ? '#f0f4ff' : '#ffffff',
                  color: mode === tool.value ? '#667eea' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minWidth: '120px'
                }}
              >
                <tool.icon size={24} style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                  {tool.label}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.7, textAlign: 'center' }}>
                  {tool.desc}
                </div>
              </button>
            ))}
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
                PDF 업로드
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
                  {mode === 'merge' ? '여러 PDF 파일을 선택하세요' : 'PDF 파일을 선택하세요'}
                </p>
              </div>
            </div>

            {/* 선택된 파일 목록 */}
            {files.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                  선택된 파일 ({files.length}개)
                  {(mode === 'merge' || mode === 'split') && files.every(f => f.info?.pageCount) && (
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#667eea',
                      marginLeft: '8px'
                    }}>
                      • 총 {files.reduce((sum, f) => sum + (f.info?.pageCount || 0), 0)}페이지
                    </span>
                  )}
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
                            {file.file.name}
                          </p>
                          <p style={{ 
                            fontSize: '12px', 
                            color: '#6b7280', 
                            margin: 0 
                          }}>
                            {formatFileSize(file.file.size)}
                            {file.info?.pageCount && (
                              <span style={{ marginLeft: '8px', color: '#667eea', fontWeight: '500' }}>
                                • {file.info.pageCount}페이지
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

            {/* 분할 옵션 */}
            {mode === 'split' && files.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                  <Settings size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  분할 옵션
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
                      분할 방식
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[
                        { value: 'all', label: '모든 페이지', desc: '각 페이지를 개별 PDF로' },
                        { value: 'range', label: '페이지 범위', desc: '지정된 페이지만' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setSplitType(option.value as 'all' | 'range')}
                          style={{
                            flex: 1,
                            padding: '12px 8px',
                            border: splitType === option.value ? '2px solid #667eea' : '1px solid #e5e7eb',
                            borderRadius: '8px',
                            backgroundColor: splitType === option.value ? '#f0f4ff' : '#ffffff',
                            color: splitType === option.value ? '#667eea' : '#6b7280',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ fontSize: '14px', marginBottom: '2px' }}>{option.label}</div>
                          <div style={{ fontSize: '10px', opacity: 0.7 }}>{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {splitType === 'range' && (
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: '#1f2937', 
                        marginBottom: '8px' 
                      }}>
                        페이지 범위
                      </label>
                      <input
                        type="text"
                        value={pageRange}
                        onChange={(e) => setPageRange(e.target.value)}
                        placeholder="예: 1-3, 5, 7-9"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.2s ease'
                        }}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = '#667eea';
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = '#e5e7eb';
                        }}
                      />
                      <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                        쉼표로 구분하여 여러 범위를 지정할 수 있습니다.
                      </p>
                    </div>
                  )}

                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      marginBottom: '8px' 
                    }}>
                      다운로드 방식
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[
                        { value: 'zip', label: 'ZIP 파일', desc: '모든 페이지를 압축' },
                        { value: 'individual', label: '개별 다운로드', desc: '페이지별로 선택' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setDownloadType(option.value as 'zip' | 'individual')}
                          style={{
                            flex: 1,
                            padding: '12px 8px',
                            border: downloadType === option.value ? '2px solid #667eea' : '1px solid #e5e7eb',
                            borderRadius: '8px',
                            backgroundColor: downloadType === option.value ? '#f0f4ff' : '#ffffff',
                            color: downloadType === option.value ? '#667eea' : '#6b7280',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ fontSize: '14px', marginBottom: '2px' }}>{option.label}</div>
                          <div style={{ fontSize: '10px', opacity: 0.7 }}>{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 처리 버튼 */}
            {files.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <Button
                  onClick={processFiles}
                  disabled={isProcessing}
                  size="lg"
                  style={{ width: '100%' }}
                >
                  {isProcessing ? (
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
                      처리 중...
                    </>
                  ) : (
                    <>
                      {mode === 'split' && <Scissors size={20} style={{ marginRight: '8px' }} />}
                      {mode === 'merge' && <Merge size={20} style={{ marginRight: '8px' }} />}
                      {mode === 'info' && <Info size={20} style={{ marginRight: '8px' }} />}
                      {mode === 'split' && 'PDF 분할하기'}
                      {mode === 'merge' && 'PDF 합병하기'}
                      {mode === 'info' && '정보 확인하기'}
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
                결과
              </h2>
            </div>

            {downloadUrl ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 성공 메시지 */}
                <div style={{ 
                  backgroundColor: '#f0f9ff', 
                  borderRadius: '16px', 
                  padding: '24px',
                  textAlign: 'center',
                  border: '1px solid #0ea5e9'
                }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    backgroundColor: '#0ea5e9', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <Download size={32} style={{ color: '#ffffff' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0c4a6e', marginBottom: '8px' }}>
                    처리 완료!
                  </h3>
                  <p style={{ color: '#0369a1', fontSize: '16px', margin: 0 }}>
                    {mode === 'split' && 'PDF가 성공적으로 분할되었습니다.'}
                    {mode === 'merge' && 'PDF가 성공적으로 합병되었습니다.'}
                  </p>
                </div>

                {/* 다운로드 버튼 */}
                <Button onClick={downloadFile} size="lg" style={{ width: '100%' }}>
                  <Download size={20} style={{ marginRight: '8px' }} />
                  {mode === 'split' ? 'ZIP 파일 다운로드' : 'PDF 다운로드'}
                </Button>
              </div>
            ) : splitResults.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 개별 다운로드 성공 메시지 */}
                <div style={{ 
                  backgroundColor: '#f0f9ff', 
                  borderRadius: '16px', 
                  padding: '24px',
                  textAlign: 'center',
                  border: '1px solid #0ea5e9'
                }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    backgroundColor: '#0ea5e9', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <Download size={32} style={{ color: '#ffffff' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0c4a6e', marginBottom: '8px' }}>
                    분할 완료!
                  </h3>
                  <p style={{ color: '#0369a1', fontSize: '16px', margin: 0 }}>
                    {splitResults.length}개 페이지를 개별 다운로드할 수 있습니다.
                  </p>
                </div>

                {/* 개별 페이지 다운로드 목록 */}
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '12px', 
                  padding: '20px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                    분할된 페이지 목록
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {splitResults.map((result, index) => (
                      <div key={index} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '12px',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ 
                            width: '32px', 
                            height: '32px', 
                            backgroundColor: '#e0e7ff', 
                            borderRadius: '6px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <FileText size={16} style={{ color: '#667eea' }} />
                          </div>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                            페이지 {result.pageNumber}
                          </span>
                        </div>
                        <button
                          onClick={() => downloadIndividualPage(result.pageNumber)}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#667eea',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLButtonElement).style.backgroundColor = '#5a67d8';
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLButtonElement).style.backgroundColor = '#667eea';
                          }}
                        >
                          <Download size={14} style={{ marginRight: '4px' }} />
                          다운로드
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : pdfInfo ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* PDF 정보 */}
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '12px', 
                  padding: '20px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                    PDF 정보
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>파일명:</span>
                      <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                        {pdfInfo.fileName}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>파일 크기:</span>
                      <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                        {formatFileSize(pdfInfo.fileSize)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>페이지 수:</span>
                      <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                        {pdfInfo.pageCount}페이지
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>암호화:</span>
                      <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                        {pdfInfo.isEncrypted ? '예' : '아니오'}
                      </span>
                    </div>
                  </div>

                  {/* 메타데이터 */}
                  {(pdfInfo.title || pdfInfo.author || pdfInfo.subject) && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                        메타데이터
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {pdfInfo.title && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6b7280', fontSize: '14px' }}>제목:</span>
                            <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                              {pdfInfo.title}
                            </span>
                          </div>
                        )}
                        {pdfInfo.author && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6b7280', fontSize: '14px' }}>작성자:</span>
                            <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                              {pdfInfo.author}
                            </span>
                          </div>
                        )}
                        {pdfInfo.subject && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6b7280', fontSize: '14px' }}>주제:</span>
                            <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                              {pdfInfo.subject}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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
                <FileText size={64} style={{ color: '#9ca3af', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  {mode === 'split' && '분할된 PDF'}
                  {mode === 'merge' && '합병된 PDF'}
                  {mode === 'info' && 'PDF 정보'}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                  PDF 파일을 업로드하고 처리 버튼을 클릭하면<br />
                  여기에 결과가 표시됩니다.
                </p>
              </div>
            )}

            {/* 광고 섹션 */}
            {(downloadUrl || splitResults.length > 0 || pdfInfo) && (
              <div style={{ marginTop: '24px' }}>
                <AdSlot type="inline" />
              </div>
            )}
          </Card>
        </div>

        {/* 사용 팁 */}
        <div style={{ marginTop: '48px' }}>
          <Card variant="default">
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '24px' }}>
              사용 팁
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                {
                  title: 'PDF 분할',
                  content: '큰 PDF 파일을 페이지별로 나누어 관리하기 쉽게 만들 수 있습니다.',
                  icon: '✂️'
                },
                {
                  title: 'PDF 합병',
                  content: '여러 개의 PDF 파일을 하나로 합쳐서 문서를 정리할 수 있습니다.',
                  icon: '🔗'
                },
                {
                  title: 'PDF 정보',
                  content: 'PDF 파일의 페이지 수, 크기, 메타데이터 등 상세 정보를 확인할 수 있습니다.',
                  icon: '📋'
                },
                {
                  title: '안전한 처리',
                  content: '모든 처리는 서버에서 안전하게 이루어지며, 원본 파일은 보존됩니다.',
                  icon: '🔒'
                }
              ].map((tip, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '16px',
                  padding: '20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ 
                    fontSize: '24px',
                    flexShrink: 0
                  }}>
                    {tip.icon}
                  </div>
                  <div>
                    <h4 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      marginBottom: '8px' 
                    }}>
                      {tip.title}
                    </h4>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '14px', 
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {tip.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
} 