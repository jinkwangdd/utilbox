/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // 블루
        mint: '#10b981',
        dark: '#1f1f1f',
        light: '#f5f6fa',
        'gray-50': '#f9fafb',
        'gray-100': '#f3f4f6',
        'gray-200': '#e5e7eb',
        'gray-300': '#d1d5db',
        'gray-400': '#9ca3af',
        'gray-500': '#6b7280',
        'gray-600': '#4b5563',
        'gray-700': '#374151',
        'gray-800': '#1f2937',
        'gray-900': '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'Pretendard', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-blue-100', 'text-blue-700',
    'bg-green-100', 'text-green-700',
    'bg-purple-100', 'text-purple-700',
    'bg-yellow-100', 'text-yellow-700',
    'bg-red-100', 'text-red-700',
    'bg-indigo-100', 'text-indigo-700',
    'bg-pink-100', 'text-pink-700',
    'bg-teal-100', 'text-teal-700',
    'bg-orange-100', 'text-orange-700',
    'bg-cyan-100', 'text-cyan-700',
    'bg-lime-100', 'text-lime-700',
    'bg-fuchsia-100', 'text-fuchsia-700',
    'bg-emerald-100', 'text-emerald-700',
    'bg-rose-100', 'text-rose-700',
    'bg-violet-100', 'text-violet-700',
  ],
};
