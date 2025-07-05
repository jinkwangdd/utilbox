'use client';

import { useEffect, useState } from 'react';

interface AdSlotProps {
  type: 'banner' | 'sidebar' | 'inline' | 'product';
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSlot({ type, position = 'bottom', className = '', style = {} }: AdSlotProps) {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [adContent, setAdContent] = useState<string>('');

  useEffect(() => {
    // 광고 로딩 시뮬레이션 (실제 AdSense 코드로 교체 필요)
    const timer = setTimeout(() => {
      setIsAdLoaded(true);
      setAdContent(getAdContent(type));
    }, 1000);

    return () => clearTimeout(timer);
  }, [type]);

  const getAdContent = (adType: string) => {
    switch (adType) {
      case 'banner':
        return '📢 광고 배너 (728x90)';
      case 'sidebar':
        return '📢 사이드바 광고 (300x250)';
      case 'inline':
        return '📢 인라인 광고 (468x60)';
      case 'product':
        return '🛒 추천 상품 (쿠팡파트너스)';
      default:
        return '📢 광고';
    }
  };

  const getAdStyles = () => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      color: '#6b7280',
      fontSize: '14px',
      fontWeight: '500',
      position: 'relative',
      overflow: 'hidden',
      ...style
    };

    switch (type) {
      case 'banner':
        return {
          ...baseStyles,
          width: '100%',
          height: '90px',
          maxWidth: '728px',
          margin: '20px auto'
        };
      case 'sidebar':
        return {
          ...baseStyles,
          width: '300px',
          height: '250px',
          margin: '20px 0'
        };
      case 'inline':
        return {
          ...baseStyles,
          width: '100%',
          height: '60px',
          maxWidth: '468px',
          margin: '16px auto'
        };
      case 'product':
        return {
          ...baseStyles,
          width: '100%',
          minHeight: '120px',
          padding: '16px',
          margin: '20px 0'
        };
      default:
        return baseStyles;
    }
  };

  if (!isAdLoaded) {
    return (
      <div 
        className={`ad-slot-loading ${className}`}
        style={{
          ...getAdStyles(),
          backgroundColor: '#f3f4f6',
          color: '#9ca3af'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid #d1d5db',
            borderTop: '2px solid #6b7280',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          광고 로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-slot ${className}`} style={getAdStyles()}>
      <div style={{ position: 'absolute', top: '4px', right: '8px', fontSize: '10px', color: '#9ca3af' }}>
        Sponsored
      </div>
      <div style={{ textAlign: 'center', padding: '8px' }}>
        {adContent}
        <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
          광고를 클릭하면 수익이 발생합니다
        </div>
      </div>
    </div>
  );
} 