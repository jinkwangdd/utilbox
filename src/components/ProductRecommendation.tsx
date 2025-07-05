'use client';

import { useState } from 'react';

interface ProductRecommendationProps {
  category?: 'office' | 'tech' | 'home' | 'general';
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ProductRecommendation({ 
  category = 'general', 
  title = '추천 상품',
  className = '',
  style = {}
}: ProductRecommendationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 실제 쿠팡파트너스 제품 데이터로 교체하세요
  const getProductsByCategory = (cat: string) => {
    switch (cat) {
      case 'office':
        return [
          { 
            name: '프린터', 
            price: '89,000원', 
            image: '🖨️', 
            link: '#' // 실제 쿠팡파트너스 링크로 교체
          },
          { 
            name: '스캐너', 
            price: '129,000원', 
            image: '📄', 
            link: '#' // 실제 쿠팡파트너스 링크로 교체
          },
          { 
            name: '문서함', 
            price: '45,000원', 
            image: '📁', 
            link: '#' // 실제 쿠팡파트너스 링크로 교체
          }
        ];
      case 'tech':
        return [
          { 
            name: '태블릿', 
            price: '299,000원', 
            image: '📱', 
            link: '#' // 실제 쿠팡파트너스 링크로 교체
          },
          { 
            name: '노트북', 
            price: '899,000원', 
            image: '💻', 
            link: '#' // 실제 쿠팡파트너스 링크로 교체
          },
          { 
            name: '모니터', 
            price: '199,000원', 
            image: '🖥️', 
            link: '#' // 실제 쿠팡파트너스 링크로 교체
          }
        ];
      case 'home':
        return [
          { 
            name: '정리함', 
            price: '29,000원', 
            image: '🗂️', 
            link: '#' // 실제 쿠팡파트너스 링크로 교체
          },
          { 
            name: '책상', 
            price: '159,000원', 
            image: '🪑', 
            link: '#' // 실제 쿠팡파트너스 링크로 교체
          },
          { 
            name: '조명', 
            price: '39,000원', 
            image: '💡', 
            link: '#' // 실제 쿠팡파트너스 링크로 교체
          }
        ];
      default:
        return [
          { 
            name: '유용한 도구', 
            price: '19,000원', 
            image: '🛠️', 
            link: '#' // 실제 쿠팡파트너스 링크로 교체
          },
          { 
            name: '편리한 제품', 
            price: '29,000원', 
            image: '✨', 
            link: '#' // 실제 쿠팡파트너스 링크로 교체
          },
          { 
            name: '추천 상품', 
            price: '39,000원', 
            image: '🎯', 
            link: '#' // 실제 쿠팡파트너스 링크로 교체
          }
        ];
    }
  };

  const products = getProductsByCategory(category);

  return (
    <div 
      className={`product-recommendation ${className}`}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '20px',
        ...style
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#1f2937',
          margin: 0
        }}>
          {title}
        </h3>
        <span style={{ 
          fontSize: '12px', 
          color: '#9ca3af',
          backgroundColor: '#f3f4f6',
          padding: '4px 8px',
          borderRadius: '12px'
        }}>
          쿠팡파트너스
        </span>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px',
        marginBottom: '16px'
      }}>
        {products.slice(0, isExpanded ? products.length : 2).map((product, index) => (
          <div 
            key={index}
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f8fafc';
            }}
            onClick={() => {
              // 실제 쿠팡파트너스 링크로 교체하세요
              // window.open(product.link, '_blank');
              console.log('제품 클릭:', product.name);
            }}
          >
            <div style={{ 
              fontSize: '32px', 
              textAlign: 'center', 
              marginBottom: '12px' 
            }}>
              {product.image}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#1f2937',
                marginBottom: '4px'
              }}>
                {product.name}
              </div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: '700', 
                color: '#dc2626'
              }}>
                {product.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length > 2 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            color: '#6b7280',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#e5e7eb';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#f3f4f6';
          }}
        >
          {isExpanded ? '접기' : `더 보기 (${products.length - 2}개)`}
        </button>
      )}

      <div style={{ 
        fontSize: '12px', 
        color: '#9ca3af', 
        textAlign: 'center',
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid #e5e7eb'
      }}>
        상품을 클릭하면 수익이 발생합니다
        {process.env.NODE_ENV === 'development' && (
          <div style={{ fontSize: '10px', color: '#ef4444', marginTop: '4px' }}>
            ⚠️ 실제 쿠팡파트너스 링크로 교체 필요
          </div>
        )}
      </div>
    </div>
  );
} 