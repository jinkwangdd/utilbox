'use client';

import { useEffect, useRef } from 'react';

interface GoogleAdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid';
  style?: React.CSSProperties;
  className?: string;
}

export default function GoogleAdSense({ 
  adSlot, 
  adFormat = 'auto', 
  style = {}, 
  className = '' 
}: GoogleAdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Google AdSense가 로드되었는지 확인
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({});
      } catch (error) {
        console.error('AdSense 로드 오류:', error);
      }
    }
  }, []);

  return (
    <div 
      ref={adRef}
      className={`google-adsense ${className}`}
      style={{
        display: 'block',
        textAlign: 'center',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* 
        실제 AdSense 코드로 교체하세요:
        1. AdSense 대시보드에서 광고 단위 생성
        2. data-ad-client를 실제 클라이언트 ID로 교체
        3. data-ad-slot을 실제 슬롯 ID로 교체
        
        예시:
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-1234567890123456"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX"}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
      
      {/* 개발 환경에서는 플레이스홀더 표시 */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          backgroundColor: '#f8fafc',
          border: '2px dashed #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
          color: '#6b7280',
          fontSize: '14px',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '8px' }}>📢 Google AdSense</div>
          <div style={{ fontSize: '12px', color: '#9ca3af' }}>
            Ad Slot: {adSlot} | Format: {adFormat}
          </div>
          <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>
            프로덕션 환경에서 실제 광고가 표시됩니다
          </div>
          <div style={{ fontSize: '10px', color: '#ef4444', marginTop: '8px' }}>
            ⚠️ 실제 AdSense 코드로 교체 필요
          </div>
        </div>
      )}
    </div>
  );
} 