'use client';

import { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

export default function Card({ 
  children, 
  variant = 'default', 
  padding = 'md',
  className = '',
  onClick,
  style = {}
}: CardProps) {
  const baseStyles = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    transition: 'all 0.2s ease',
    cursor: onClick ? 'pointer' : 'default'
  };

  const variantStyles = {
    default: {
      border: '1px solid #e5e7eb',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
    },
    elevated: {
      border: 'none',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
    },
    outlined: {
      border: '2px solid #e5e7eb',
      boxShadow: 'none'
    }
  };

  const paddingStyles = {
    sm: { padding: '16px' },
    md: { padding: '24px' },
    lg: { padding: '32px' }
  };

  const hoverStyles = onClick ? {
    transform: 'translateY(-2px)',
    boxShadow: variant === 'default' 
      ? '0 8px 24px rgba(0, 0, 0, 0.08)' 
      : variant === 'elevated'
      ? '0 16px 48px rgba(0, 0, 0, 0.12)'
      : '0 4px 16px rgba(0, 0, 0, 0.08)'
  } : {};

  return (
    <div
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...paddingStyles[padding],
        ...style
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          const target = e.target as HTMLDivElement;
          target.style.transform = hoverStyles.transform || 'translateY(0)';
          target.style.boxShadow = hoverStyles.boxShadow || variantStyles[variant].boxShadow;
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          const target = e.target as HTMLDivElement;
          target.style.transform = 'translateY(0)';
          target.style.boxShadow = variantStyles[variant].boxShadow;
        }
      }}
      onClick={onClick}
      className={className}
    >
      {children}
    </div>
  );
} 