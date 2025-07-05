'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import AdSlot from '../../components/AdSlot';

interface LayoutProps {
  children: ReactNode;
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Layout({ 
  children, 
  showSearch = true, 
  searchQuery = '', 
  onSearchChange 
}: LayoutProps) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#ffffff'
    }}>
      <Header 
        showSearch={showSearch} 
        searchQuery={searchQuery} 
        onSearchChange={onSearchChange} 
      />
      
      {/* 검색창 하단 광고 */}
      {showSearch && (
        <div style={{ padding: '20px 24px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <AdSlot type="banner" />
          </div>
        </div>
      )}
      
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
} 