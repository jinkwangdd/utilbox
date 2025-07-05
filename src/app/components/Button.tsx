'use client';

import { ReactNode, CSSProperties } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: CSSProperties;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  style = {}
}: ButtonProps) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    outline: 'none',
    position: 'relative' as const,
    overflow: 'hidden'
  };

  const sizeStyles = {
    sm: {
      padding: '8px 16px',
      fontSize: '14px',
      minHeight: '36px'
    },
    md: {
      padding: '12px 24px',
      fontSize: '16px',
      minHeight: '48px'
    },
    lg: {
      padding: '16px 32px',
      fontSize: '18px',
      minHeight: '56px'
    }
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
      border: 'none'
    },
    secondary: {
      background: '#f3f4f6',
      color: '#374151',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      border: '1px solid #e5e7eb'
    },
    outline: {
      background: 'transparent',
      color: '#3b82f6',
      boxShadow: 'none',
      border: '2px solid #3b82f6'
    },
    ghost: {
      background: 'transparent',
      color: '#6b7280',
      boxShadow: 'none',
      border: 'none'
    },
    danger: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
      border: 'none'
    }
  };

  const disabledStyles = disabled ? {
    opacity: 0.5,
    cursor: 'not-allowed'
  } : {};

  const hoverStyles = !disabled ? {
    transform: 'translateY(-1px)',
    boxShadow: variant === 'primary' 
      ? '0 8px 24px rgba(102, 126, 234, 0.4)' 
      : variant === 'secondary'
      ? '0 4px 12px rgba(0, 0, 0, 0.08)'
      : variant === 'outline'
      ? '0 4px 12px rgba(59, 130, 246, 0.1)'
      : variant === 'danger'
      ? '0 8px 24px rgba(239, 68, 68, 0.4)'
      : 'none'
  } : {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...disabledStyles,
        ...style
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          const target = e.target as HTMLButtonElement;
          target.style.transform = hoverStyles.transform || 'translateY(0)';
          target.style.boxShadow = hoverStyles.boxShadow || variantStyles[variant].boxShadow;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          const target = e.target as HTMLButtonElement;
          target.style.transform = 'translateY(0)';
          target.style.boxShadow = variantStyles[variant].boxShadow;
        }
      }}
      className={className}
    >
      {children}
    </button>
  );
} 