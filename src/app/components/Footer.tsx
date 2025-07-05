'use client';

import Link from 'next/link';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#f8fafc', 
      borderTop: '1px solid #e5e7eb',
      marginTop: '80px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px', marginBottom: '48px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}>
                <Heart size={16} style={{ color: '#ffffff' }} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>유틸박스</span>
            </div>
            <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '24px' }}>
              일상의 모든 디지털 작업을 더욱 쉽고 빠르게 만들어주는 온라인 도구 모음입니다.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#f3f4f6';
                (e.target as HTMLAnchorElement).style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#ffffff';
                (e.target as HTMLAnchorElement).style.color = '#6b7280';
              }}
              >
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#f3f4f6';
                (e.target as HTMLAnchorElement).style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#ffffff';
                (e.target as HTMLAnchorElement).style.color = '#6b7280';
              }}
              >
                <Twitter size={20} />
              </a>
              <a href="mailto:contact@utilbox.com" style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#f3f4f6';
                (e.target as HTMLAnchorElement).style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#ffffff';
                (e.target as HTMLAnchorElement).style.color = '#6b7280';
              }}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>도구</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: '이미지 압축', href: '/image-compressor' },
                { name: 'JPG to PDF', href: '/jpg-to-pdf' },
                { name: 'Word to PDF', href: '/word-to-pdf' },
                { name: 'QR 코드 생성', href: '/qr-code-generator' },
                { name: 'URL 단축', href: '/short-url-generator' }
              ].map((tool, index) => (
                <li key={`tool-${index}`} style={{ marginBottom: '12px' }}>
                  <Link href={tool.href} style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    transition: 'color 0.2s ease',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#3b82f6'}
                  onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#6b7280'}
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>지원</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: '도움말', href: '/help' },
                { name: '문의하기', href: '/contact' },
                { name: '피드백', href: '/feedback' },
                { name: '업데이트', href: '/updates' }
              ].map((item, index) => (
                <li key={`support-${index}`} style={{ marginBottom: '12px' }}>
                  <a href={item.href} style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    transition: 'color 0.2s ease',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#3b82f6'}
                  onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#6b7280'}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>법적 고지</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: '개인정보처리방침', href: '/privacy' },
                { name: '이용약관', href: '/terms' },
                { name: '쿠키 정책', href: '/cookies' }
              ].map((item, index) => (
                <li key={`legal-${index}`} style={{ marginBottom: '12px' }}>
                  <a href={item.href} style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    transition: 'color 0.2s ease',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#3b82f6'}
                  onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#6b7280'}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid #e5e7eb', 
          paddingTop: '24px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
            © 2024 유틸박스. 모든 권리 보유.
          </p>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
            Made with ❤️ for better productivity
          </p>
        </div>
      </div>
    </footer>
  );
} 