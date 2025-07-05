'use client';

import { useState } from 'react';
import { ClipboardCopy, ClipboardCheck, Type } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const toUpperCase = () => {
    setOutputText(inputText.toUpperCase());
    setCopied(false);
  };

  const toLowerCase = () => {
    setOutputText(inputText.toLowerCase());
    setCopied(false);
  };

  const toCapitalize = () => {
    setOutputText(inputText.replace(/(^|\s)\S/g, (char) => char.toUpperCase()));
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Type size={40} style={{ color: '#ffffff' }} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
            대소문자 변환
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            텍스트의 대소문자를 원하는 형식으로 변환하여 일관된 문서를 만드세요
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
          {/* Input Section */}
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
                <Type size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                텍스트 입력
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
                원본 텍스트
              </label>
              <textarea
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                placeholder="여기에 대소문자를 변환할 텍스트를 입력하세요..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              <Button 
                onClick={toUpperCase}
                disabled={!inputText.trim()}
                style={{ fontSize: '14px' }}
              >
                모두 대문자로
              </Button>
              <Button 
                onClick={toLowerCase}
                disabled={!inputText.trim()}
                style={{ fontSize: '14px' }}
              >
                모두 소문자로
              </Button>
              <Button 
                onClick={toCapitalize}
                disabled={!inputText.trim()}
                style={{ fontSize: '14px' }}
              >
                첫 글자만 대문자로
              </Button>
            </div>
          </Card>

          {/* Output Section */}
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
                <ClipboardCheck size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                변환 결과
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
                변환된 텍스트
              </label>
              <div style={{ position: 'relative' }}>
                <textarea
                  readOnly
                  style={{
                    width: '100%',
                    minHeight: '200px',
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    backgroundColor: '#f9fafb',
                    color: '#374151'
                  }}
                  placeholder="변환된 텍스트가 여기에 표시됩니다."
                  value={outputText}
                />
                {outputText && (
                  <button
                    onClick={handleCopy}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#ffffff',
                      color: copied ? '#10b981' : '#6b7280',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title="클립보드에 복사"
                  >
                    {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
                  </button>
                )}
              </div>
              {copied && (
                <p style={{ 
                  color: '#10b981', 
                  fontSize: '14px', 
                  marginTop: '8px', 
                  textAlign: 'right',
                  fontWeight: '500'
                }}>
                  클립보드에 복사되었습니다!
                </p>
              )}
            </div>

            {/* Usage Instructions */}
            <div style={{ 
              backgroundColor: '#f8fafc', 
              padding: '20px', 
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                사용법
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    backgroundColor: '#667eea',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    1
                  </div>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    텍스트를 입력하거나 붙여넣기 하세요
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    backgroundColor: '#667eea',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    2
                  </div>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    원하는 변환 버튼을 클릭하세요
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    backgroundColor: '#667eea',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    3
                  </div>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    결과를 복사하여 사용하세요
                  </span>
                </div>
              </div>
            </div>
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
              다양한 변환 옵션
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              텍스트의 용도에 맞는 최적의 대소문자 형식을 선택하세요
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
                <Type size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                모두 대문자
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                제목, 강조, 공지사항 등에 적합합니다
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
                <Type size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                모두 소문자
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                일반 텍스트, 이메일, 메모 등에 적합합니다
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
                <Type size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                첫 글자만 대문자
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                문장, 제목, 이름 등에 적합합니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
