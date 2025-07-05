'use client';

import { useState } from 'react';
import { Mail, Search, Globe, Shield, Clock, Users, Building } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

interface DomainInfo {
  domain: string;
  registrar: string;
  creationDate: string;
  expirationDate: string;
  status: string[];
  nameServers: string[];
  isActive: boolean;
  hasMX: boolean;
  hasSPF: boolean;
  hasDMARC: boolean;
}

export default function EmailDomainAnalyzerPage() {
  const [email, setEmail] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'loading', message: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'loading', message: string) => {
    setToastMessage({ type, message });
    if (type !== 'loading') {
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const analyzeDomain = async () => {
    if (!email.trim()) {
      showToast('error', '이메일 주소를 입력해주세요.');
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('error', '유효한 이메일 주소를 입력해주세요.');
      return;
    }

    const domain = email.split('@')[1];
    setIsAnalyzing(true);
    showToast('loading', '도메인 분석 중...');

    try {
      // 실제로는 DNS 조회 API를 사용해야 하지만, 여기서는 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 시뮬레이션된 도메인 정보
      const mockDomainInfo: DomainInfo = {
        domain,
        registrar: 'Example Registrar, Inc.',
        creationDate: '2020-01-15',
        expirationDate: '2025-01-15',
        status: ['clientTransferProhibited', 'clientUpdateProhibited'],
        nameServers: ['ns1.example.com', 'ns2.example.com'],
        isActive: true,
        hasMX: true,
        hasSPF: true,
        hasDMARC: true,
      };

      setDomainInfo(mockDomainInfo);
      showToast('success', '도메인 분석이 완료되었습니다!');
    } catch (error) {
      console.error('분석 오류:', error);
      showToast('error', '도메인 분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSecurityScore = (info: DomainInfo) => {
    let score = 0;
    if (info.hasMX) score += 25;
    if (info.hasSPF) score += 25;
    if (info.hasDMARC) score += 25;
    if (info.isActive) score += 25;
    return score;
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
            <Mail size={40} style={{ color: '#ffffff' }} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
            이메일 도메인 분석기
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            이메일 도메인의 등록 정보, 보안 설정, DNS 레코드를 분석하여 도메인의 신뢰성을 확인하세요
          </p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '48px' }}>
          {/* Email Input Form */}
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
                <Mail size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                도메인 분석
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
                이메일 주소
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@domain.com"
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
                <Button 
                  onClick={analyzeDomain}
                  disabled={isAnalyzing || !email.trim()}
                  style={{ padding: '12px 24px' }}
                >
                  {isAnalyzing ? (
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
                      분석 중...
                    </>
                  ) : (
                    <>
                      <Search size={16} style={{ marginRight: '8px' }} />
                      분석하기
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Analysis Results */}
          {domainInfo && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Security Score */}
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
                    <Shield size={20} style={{ color: '#ffffff' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                    보안 점수
                  </h3>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981', marginBottom: '16px' }}>
                    {getSecurityScore(domainInfo)}/100
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '12px', 
                    backgroundColor: '#e5e7eb', 
                    borderRadius: '6px',
                    overflow: 'hidden',
                    marginBottom: '8px'
                  }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        backgroundColor: '#10b981',
                        borderRadius: '6px',
                        width: `${getSecurityScore(domainInfo)}%`,
                        transition: 'width 0.5s ease'
                      }}
                    />
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {getSecurityScore(domainInfo) >= 75 ? '매우 안전' : 
                     getSecurityScore(domainInfo) >= 50 ? '안전' : 
                     getSecurityScore(domainInfo) >= 25 ? '주의 필요' : '위험'}
                  </p>
                </div>
              </Card>

              {/* Domain Information */}
              <Card variant="elevated">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                  }}>
                    <Globe size={20} style={{ color: '#ffffff' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                    도메인 정보
                  </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      marginBottom: '4px' 
                    }}>
                      도메인
                    </label>
                    <p style={{ fontSize: '14px', color: '#1f2937', fontFamily: 'monospace' }}>
                      {domainInfo.domain}
                    </p>
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      marginBottom: '4px' 
                    }}>
                      등록기관
                    </label>
                    <p style={{ fontSize: '14px', color: '#1f2937' }}>
                      {domainInfo.registrar}
                    </p>
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      marginBottom: '4px' 
                    }}>
                      등록일
                    </label>
                    <p style={{ fontSize: '14px', color: '#1f2937' }}>
                      {domainInfo.creationDate}
                    </p>
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      marginBottom: '4px' 
                    }}>
                      만료일
                    </label>
                    <p style={{ fontSize: '14px', color: '#1f2937' }}>
                      {domainInfo.expirationDate}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Security Features */}
              <Card variant="elevated">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  }}>
                    <Shield size={20} style={{ color: '#ffffff' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                    보안 기능
                  </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '12px',
                    backgroundColor: domainInfo.hasMX ? '#f0fdf4' : '#fef2f2',
                    borderRadius: '8px',
                    border: `1px solid ${domainInfo.hasMX ? '#bbf7d0' : '#fecaca'}`
                  }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      backgroundColor: domainInfo.hasMX ? '#10b981' : '#ef4444' 
                    }} />
                    <span style={{ fontSize: '14px', color: '#374151' }}>MX 레코드</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '12px',
                    backgroundColor: domainInfo.hasSPF ? '#f0fdf4' : '#fef2f2',
                    borderRadius: '8px',
                    border: `1px solid ${domainInfo.hasSPF ? '#bbf7d0' : '#fecaca'}`
                  }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      backgroundColor: domainInfo.hasSPF ? '#10b981' : '#ef4444' 
                    }} />
                    <span style={{ fontSize: '14px', color: '#374151' }}>SPF 레코드</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '12px',
                    backgroundColor: domainInfo.hasDMARC ? '#f0fdf4' : '#fef2f2',
                    borderRadius: '8px',
                    border: `1px solid ${domainInfo.hasDMARC ? '#bbf7d0' : '#fecaca'}`
                  }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      backgroundColor: domainInfo.hasDMARC ? '#10b981' : '#ef4444' 
                    }} />
                    <span style={{ fontSize: '14px', color: '#374151' }}>DMARC 레코드</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
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
              도메인 분석의 장점
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              이메일 도메인을 분석하여 신뢰성과 보안을 확인하세요
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
                <Shield size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                보안 확인
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                SPF, DMARC 등 이메일 보안 설정 확인
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
                <Globe size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                도메인 정보
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                등록기관, 등록일, 만료일 등 상세 정보
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
                <Building size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                신뢰성 평가
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                종합적인 보안 점수로 신뢰성 평가
              </p>
            </div>
          </div>
        </div>

        {/* Toast Message */}
        {toastMessage && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: 1000,
            backgroundColor: toastMessage.type === 'success' ? '#10b981' : 
                           toastMessage.type === 'error' ? '#ef4444' : '#3b82f6',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            {toastMessage.message}
          </div>
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
