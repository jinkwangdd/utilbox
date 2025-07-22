'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, Download, Trash2, ArrowLeft, Settings, FileText, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import AdSlot from '../../components/AdSlot';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Head from 'next/head';

interface FileWithPreview {
  file: File;
  preview?: string;
}

export default function ImgToPdfPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState('A4');
  const [copied, setCopied] = useState(false);

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
    
    setFiles([newFile]);
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
      
      // 파일이 없어지면 다운로드 URL 초기화
      if (newFiles.length === 0) {
        setDownloadUrl(null);
      }
      
      return newFiles;
    });
  };

  const convertToPdf = async () => {
    if (files.length === 0) {
      toast.error('변환할 이미지를 선택해주세요.');
      return;
    }

    // 파일 크기 체크
    if (files[0].file.size > 10 * 1024 * 1024) {
      toast.error('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    setIsConverting(true);
    toast.loading('PDF 변환 중... (최대 10초 소요될 수 있습니다)');

    try {
      const formData = new FormData();
      formData.append('file', files[0].file);
      formData.append('pageSize', pageSize);

      console.log('API 호출 시작');
      const response = await fetch('/api/convert/img-to-pdf', {
        method: 'POST',
        body: formData,
      });

      console.log('API 응답 상태:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '변환에 실패했습니다.');
      }

      const data = await response.json();
      console.log('API 응답 데이터:', data);

      if (!data.success) {
        throw new Error('서버에서 변환에 실패했습니다.');
      }

      // 클라이언트에서 PDF 생성
      console.log('클라이언트에서 PDF 생성 시작');
      
      // 임시 div 생성하여 HTML 렌더링
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data.html;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      document.body.appendChild(tempDiv);

      // html2canvas로 캔버스 생성
      const canvas = await html2canvas(tempDiv, {
        useCORS: true,
        allowTaint: true,
        scale: 2, // 고해상도
        backgroundColor: '#ffffff'
      });

      // 임시 div 제거
      document.body.removeChild(tempDiv);

      // jsPDF로 PDF 생성
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: pageSize === 'A4' ? 'a4' : 'letter'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      // PDF를 blob으로 변환
      const pdfBlob = pdf.output('blob');
      
      if (pdfBlob.size === 0) {
        throw new Error('생성된 PDF 파일이 비어있습니다.');
      }

      const url = window.URL.createObjectURL(pdfBlob);
      setDownloadUrl(url);

      console.log('PDF 생성 완료, 크기:', pdfBlob.size);
      toast.success('PDF 변환이 완료되었습니다!');
      
    } catch (error) {
      console.error('변환 오류:', error);
      
      let errorMessage = '변환 중 오류가 발생했습니다.';
      
      if (error instanceof Error) {
        if (error.message.includes('memory')) {
          errorMessage = '이미지가 너무 큽니다. 더 작은 이미지를 사용해주세요.';
        } else if (error.message.includes('format')) {
          errorMessage = '지원되지 않는 이미지 형식입니다.';
        } else if (error.message.includes('timeout')) {
          errorMessage = '처리 시간이 초과되었습니다. 더 작은 이미지를 사용해주세요.';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsConverting(false);
    }
  };

  const downloadPdf = () => {
    if (downloadUrl && files.length > 0) {
      // 광고 표시 후 다운로드 실행
      toast.success('광고를 확인해주세요! 잠시 후 다운로드가 시작됩니다.');
      
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `converted_${files[0].file.name.replace(/\.[^/.]+$/, '')}.pdf`;
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

  return (
    <Layout>
      <Head>
        <title>IMG to PDF 변환 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스</title>
        <meta name="description" content="막내사원 대신하는 IMG to PDF 변환 도구! JPG, PNG, GIF, BMP, WebP 이미지를 빠르고 쉽게 PDF로 변환하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <meta name="keywords" content="IMG to PDF, 이미지 PDF 변환, 업무 끝판왕, 막내사원, 사무실 필수, 무료 도구, 이미지 PDF, JPG PDF, PNG PDF, 온라인 PDF 변환, 웹 유틸리티, 업무 자동화" />
        <meta property="og:title" content="IMG to PDF 변환 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
        <meta property="og:description" content="막내사원 대신하는 IMG to PDF 변환 도구! JPG, PNG, GIF, BMP, WebP 이미지를 빠르고 쉽게 PDF로 변환하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilbox-mu.vercel.app/img-to-pdf" />
        <meta property="og:site_name" content="유틸박스" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IMG to PDF 변환 - 막내사원 대신하는 업무 끝판왕, 사무실 필수 무료 도구 | 유틸박스" />
        <meta name="twitter:description" content="막내사원 대신하는 IMG to PDF 변환 도구! JPG, PNG, GIF, BMP, WebP 이미지를 빠르고 쉽게 PDF로 변환하세요. 사무실 필수, 업무 자동화, 무료 웹 유틸리티 끝판왕." />
        <link rel="canonical" href="https://utilbox-mu.vercel.app/img-to-pdf" />
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
              IMG to PDF 변환
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#6b7280', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              이미지 파일을 PDF 문서로 변환하세요. JPG, PNG, GIF, BMP, WebP 형식을 지원합니다.
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
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>
                  최대 파일 크기: 10MB
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

            {/* 변환 옵션 */}
            {files.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                  <Settings size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  변환 옵션
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
                      페이지 크기
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[
                        { value: 'A4', label: 'A4', desc: '일반 문서' },
                        { value: 'A3', label: 'A3', desc: '큰 문서' },
                        { value: 'Letter', label: 'Letter', desc: '미국 표준' }
                      ].map((size) => (
                        <button
                          key={size.value}
                          onClick={() => setPageSize(size.value)}
                          style={{
                            flex: 1,
                            padding: '12px 8px',
                            border: pageSize === size.value ? '2px solid #667eea' : '1px solid #e5e7eb',
                            borderRadius: '8px',
                            backgroundColor: pageSize === size.value ? '#f0f4ff' : '#ffffff',
                            color: pageSize === size.value ? '#667eea' : '#6b7280',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ fontSize: '14px', marginBottom: '2px' }}>{size.label}</div>
                          <div style={{ fontSize: '10px', opacity: 0.7 }}>{size.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
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
                      <FileText size={20} style={{ marginRight: '8px' }} />
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
                    <FileText size={32} style={{ color: '#ffffff' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0c4a6e', marginBottom: '8px' }}>
                    변환 완료!
                  </h3>
                  <p style={{ color: '#0369a1', fontSize: '16px', margin: 0 }}>
                    이미지가 성공적으로 PDF로 변환되었습니다.
                  </p>
                </div>

                {/* 다운로드 버튼 */}
                <Button onClick={downloadPdf} size="lg" style={{ width: '100%' }}>
                  <Download size={20} style={{ marginRight: '8px' }} />
                  PDF 다운로드
                </Button>

                {/* 파일 정보 */}
                {files.length > 0 && (
                  <div style={{ 
                    backgroundColor: '#f8fafc', 
                    borderRadius: '12px', 
                    padding: '16px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                      파일 정보
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280', fontSize: '14px' }}>원본 파일:</span>
                        <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                          {files[0].file.name}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280', fontSize: '14px' }}>파일 크기:</span>
                        <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                          {formatFileSize(files[0].file.size)}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280', fontSize: '14px' }}>페이지 크기:</span>
                        <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                          {pageSize}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
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
                  변환된 PDF
                </h3>
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                  이미지를 업로드하고 변환 버튼을 클릭하면<br />
                  여기에 변환 결과가 표시됩니다.
                </p>
              </div>
            )}

            {/* 광고 섹션 */}
            {downloadUrl && (
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
                  title: '지원 형식',
                  content: 'JPG, PNG, GIF, BMP, WebP 등 다양한 이미지 형식을 PDF로 변환할 수 있습니다.',
                  icon: '🖼️'
                },
                {
                  title: '페이지 크기',
                  content: 'A4, A3, Letter 등 다양한 페이지 크기 중에서 선택할 수 있습니다.',
                  icon: '📄'
                },
                {
                  title: '고품질 변환',
                  content: '원본 이미지의 품질을 최대한 유지하면서 PDF로 변환됩니다.',
                  icon: '✨'
                },
                {
                  title: '빠른 처리',
                  content: '서버에서 빠르게 처리되어 즉시 다운로드할 수 있습니다.',
                  icon: '⚡'
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
        {/* 추천 도구(내부링크) 섹션 */}
        <div style={{ marginTop: '48px', padding: '32px', background: '#f8fafc', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
            이런 도구도 함께 써보세요
          </h2>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/image-compressor" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>이미지 압축</Link>
            <Link href="/pdf-tools" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>PDF 도구</Link>
            <Link href="/qr-code-generator" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>QR 코드 생성</Link>
            <Link href="/file-converter" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>파일 형식 변환</Link>
            <Link href="/background-remover" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>배경 제거</Link>
            <Link href="/remove-line-breaks" style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>줄바꿈 제거</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 