'use client';

import Link from 'next/link';
import { Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ showSearch = true, searchQuery = '', onSearchChange }: HeaderProps) {
  return (
    <header style={{ 
      borderBottom: '1px solid #e5e7eb', 
      position: 'sticky', 
      top: 0, 
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}>
              <Sparkles size={24} style={{ color: '#ffffff' }} />
            </div>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>유틸박스</span>
          </Link>
          
          {showSearch && (
            <div style={{ flex: 1, maxWidth: '600px', margin: '0 48px' }}>
              <div style={{ position: 'relative' }}>
                <Search 
                  style={{ 
                    position: 'absolute', 
                    left: '20px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} 
                  size={20} 
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder="필요한 도구를 검색해보세요..."
                  style={{
                    width: '100%',
                    paddingLeft: '56px',
                    paddingRight: '20px',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '16px',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    fontSize: '16px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = '#3b82f6';
                    (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = '#e5e7eb';
                    (e.target as HTMLInputElement).style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ 
              color: '#6b7280', 
              border: 'none', 
              background: 'none', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'transparent'}
            >
              피드백
            </button>
            <button style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.transform = 'translateY(0)'}
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 