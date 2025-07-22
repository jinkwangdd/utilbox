'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { 
  Image, 
  FileText, 
  QrCode, 
  Link as LinkIcon, 
  FileDown, 
  Palette,
  Clock,
  Globe,
  Type,
  Scissors,
  Zap,
  Star,
  TrendingUp,
  Users,
  Shield,
  Smartphone,
  Lock,
  FileImage
} from 'lucide-react';
import Layout from './components/Layout';
import Card from './components/Card';
import Button from './components/Button';
import AdSlot from '../components/AdSlot';
import ProductRecommendation from '../components/ProductRecommendation';


const tools = [
  {
    name: '이미지 압축',
    description: '이미지 파일 크기를 줄여서 웹사이트 로딩 속도를 개선하세요',
    icon: FileDown,
    href: '/image-compressor',
    category: '이미지',
    popular: true
  },
  {
    name: 'IMG to PDF',
    description: '이미지 파일을 PDF 문서로 변환하여 공유하기 쉽게 만드세요',
    icon: FileText,
    href: '/img-to-pdf',
    category: '변환',
    popular: true
  },
  {
    name: 'Word to PDF',
    description: 'Word 문서를 PDF로 변환하여 호환성 문제를 해결하세요',
    icon: FileText,
    href: '/word-to-pdf',
    category: '변환',
    popular: true
  },
  {
    name: 'QR 코드 생성',
    description: 'URL, 텍스트, 연락처 정보를 QR 코드로 변환하세요',
    icon: QrCode,
    href: '/qr-code-generator',
    category: '생성',
    popular: false
  },
  {
    name: 'URL 단축',
    description: '긴 URL을 짧고 기억하기 쉬운 링크로 변환하세요',
    icon: LinkIcon,
    href: '/short-url-generator',
    category: '생성',
    popular: false
  },
  {
    name: '배경 제거',
    description: '이미지에서 배경을 자동으로 제거하여 투명 배경을 만드세요',
    icon: Palette,
    href: '/background-remover',
    category: '이미지',
    popular: false
  },
  {
    name: '시간대 변환',
    description: '전 세계 시간대를 쉽게 변환하여 일정을 관리하세요',
    icon: Clock,
    href: '/timezone-converter',
    category: '유틸리티',
    popular: false
  },
  {
    name: '대소문자 변환',
    description: '텍스트의 대소문자를 원하는 형식으로 변환하세요',
    icon: Type,
    href: '/case-converter',
    category: '텍스트',
    popular: false
  },
  {
    name: '줄바꿈 제거',
    description: '불필요한 줄바꿈을 제거하여 텍스트를 정리하세요',
    icon: Scissors,
    href: '/remove-line-breaks',
    category: '텍스트',
    popular: false
  },

  {
    name: '파일 형식 변환',
    description: '다양한 파일 형식을 원하는 형식으로 변환하세요',
    icon: FileImage,
    href: '/file-converter',
    category: '변환',
    popular: false
  },
  {
    name: 'PDF 도구',
    description: 'PDF 분할, 합병, 정보 확인 등 다양한 PDF 작업을 수행하세요',
    icon: FileText,
    href: '/pdf-tools',
    category: '변환',
    popular: true
  }
];

const categories = [
  { name: '전체', value: 'all' },
  { name: '이미지', value: '이미지' },
  { name: '변환', value: '변환' },
  { name: '생성', value: '생성' },
  { name: '텍스트', value: '텍스트' },
  { name: '유틸리티', value: '유틸리티' }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularTools = tools.filter(tool => tool.popular);

  return (
    <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <Head>
        <title>유틸박스 - 막내사원 대신하는 업무 끝판왕 무료 도구 모음, 사무실 필수 사이트</title>
        <meta name="description" content="사무실에서 꼭 필요한 PDF 변환, 이미지 압축, 배경 제거 등 막내사원 대신하는 무료 온라인 도구를 한 곳에! 업무 자동화, 사무실 필수 사이트, 무료 웹 유틸리티 끝판왕." />
        <meta name="keywords" content="유틸박스, 업무 끝판왕, 막내사원, 사무실 필수, 무료 도구, PDF 변환, 이미지 압축, 온라인 도구, 업무 자동화, 웹 유틸리티, 사무실 꿀팁, 문서 변환, 추천 사이트, 사무실 추천, 무료 웹사이트, 사무실 업무, 사무실 자동화, 사무실 사이트, 사무실 필수 사이트, 사무실 도구, 사무실 추천 도구, 사무실 업무 자동화, 사무실 무료 도구, 사무실 끝판왕, 사무실 막내사원, 사무실 업무 끝판왕, 사무실 무료 사이트, 사무실 업무 사이트, 사무실 자동화 사이트, 사무실 업무 추천, 사무실 업무 꿀팁, 사무실 업무 도구, 사무실 업무 사이트 추천, 사무실 업무 자동화 사이트, 사무실 업무 무료 사이트, 사무실 업무 끝판왕 사이트, 사무실 업무 필수 사이트, 사무실 업무 필수 도구, 사무실 업무 필수 사이트 추천, 사무실 업무 필수 도구 추천, 사무실 업무 필수 사이트 모음, 사무실 업무 필수 도구 모음, 사무실 업무 필수 사이트 리스트, 사무실 업무 필수 도구 리스트, 사무실 업무 필수 사이트 TOP, 사무실 업무 필수 도구 TOP, 사무실 업무 필수 사이트 BEST, 사무실 업무 필수 도구 BEST, 사무실 업무 필수 사이트 추천 리스트, 사무실 업무 필수 도구 추천 리스트, 사무실 업무 필수 사이트 추천 TOP, 사무실 업무 필수 도구 추천 TOP, 사무실 업무 필수 사이트 추천 BEST, 사무실 업무 필수 도구 추천 BEST" />
        <meta property="og:title" content="유틸박스 - 막내사원 대신하는 업무 끝판왕 무료 도구 모음, 사무실 필수 사이트" />
        <meta property="og:description" content="사무실에서 꼭 필요한 PDF 변환, 이미지 압축, 배경 제거 등 막내사원 대신하는 무료 온라인 도구를 한 곳에! 업무 자동화, 사무실 필수 사이트, 무료 웹 유틸리티 끝판왕." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilbox-mu.vercel.app" />
        <meta property="og:site_name" content="유틸박스" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="유틸박스 - 막내사원 대신하는 업무 끝판왕 무료 도구 모음, 사무실 필수 사이트" />
        <meta name="twitter:description" content="사무실에서 꼭 필요한 PDF 변환, 이미지 압축, 배경 제거 등 막내사원 대신하는 무료 온라인 도구를 한 곳에! 업무 자동화, 사무실 필수 사이트, 무료 웹 유틸리티 끝판왕." />
        <link rel="canonical" href="https://utilbox-mu.vercel.app" />
      </Head>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 24px',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            모든 디지털 작업을<br />
            <span style={{ color: '#fbbf24' }}>한 곳에서</span> 해결하세요
          </h1>
          <p style={{ 
            fontSize: '20px', 
            marginBottom: '40px', 
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            이미지 압축부터 PDF 변환까지, 일상의 모든 디지털 작업을 더욱 쉽고 빠르게
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button size="lg" onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}>
              <Zap size={20} />
              도구 둘러보기
            </Button>
            <Button variant="outline" size="lg" style={{ color: '#ffffff', borderColor: '#ffffff' }}>
              <Star size={20} />
              인기 도구
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              인기 도구
            </h2>
            <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              가장 많이 사용되는 도구들을 빠르게 접근하세요
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px',
            marginBottom: '60px'
          }}>
            {popularTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
                  <Card variant="elevated" style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '12px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        flexShrink: 0
                      }}>
                        <IconComponent size={24} style={{ color: '#ffffff' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                            {tool.name}
                          </h3>
                          <span style={{ 
                            backgroundColor: '#fbbf24', 
                            color: '#ffffff', 
                            padding: '2px 8px', 
                            borderRadius: '12px', 
                            fontSize: '12px', 
                            fontWeight: '600' 
                          }}>
                            인기
                          </span>
                        </div>
                        <p style={{ color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
          </div>
        </section>

      {/* Advertisement Section */}
      <section style={{ padding: '40px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <AdSlot type="banner" />
                  </div>
      </section>

      {/* All Tools Section */}
      <section id="tools" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              모든 도구
            </h2>
            <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              카테고리별로 정리된 다양한 도구들을 찾아보세요
            </p>
                </div>

          {/* Category Filter */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'center', 
            marginBottom: '48px',
            flexWrap: 'wrap'
          }}>
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '24px',
                  border: selectedCategory === category.value ? 'none' : '2px solid #e5e7eb',
                  backgroundColor: selectedCategory === category.value 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : 'transparent',
                  color: selectedCategory === category.value ? '#ffffff' : '#6b7280',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.value) {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.value) {
                    (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '24px' 
          }}>
            {filteredTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
                  <Card variant="default" style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '12px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        flexShrink: 0
                      }}>
                        <IconComponent size={24} style={{ color: '#ffffff' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                            {tool.name}
                          </h3>
                          {tool.popular && (
                            <span style={{ 
                              backgroundColor: '#fbbf24', 
                              color: '#ffffff', 
                              padding: '2px 8px', 
                              borderRadius: '12px', 
                              fontSize: '12px', 
                              fontWeight: '600' 
                            }}>
                              인기
                            </span>
                          )}
                        </div>
                        <p style={{ color: '#6b7280', lineHeight: '1.5', margin: 0, marginBottom: '12px' }}>
                          {tool.description}
                        </p>
                        <span style={{ 
                          backgroundColor: '#f3f4f6', 
                          color: '#374151', 
                          padding: '4px 12px', 
                          borderRadius: '16px', 
                          fontSize: '12px', 
                          fontWeight: '500' 
                        }}>
                          {tool.category}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 24px' }}>
              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '24px' }}>
                검색 결과가 없습니다.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}>
                필터 초기화
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              왜 유틸박스를 선택해야 할까요?
            </h2>
            <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              사용자 중심의 디자인과 빠른 성능으로 최고의 경험을 제공합니다
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '32px' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                margin: '0 auto 24px'
              }}>
                <Zap size={32} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                빠른 처리
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                최적화된 알고리즘으로 빠른 처리 속도를 보장합니다
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                margin: '0 auto 24px'
              }}>
                <Shield size={32} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                안전한 처리
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                업로드된 파일은 처리 후 즉시 삭제되어 개인정보를 보호합니다
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                margin: '0 auto 24px'
              }}>
                <Smartphone size={32} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                반응형 디자인
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                모든 기기에서 완벽하게 작동하는 반응형 인터페이스
              </p>
            </div>
          </div>
          </div>
        </section>

      {/* Product Recommendation Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              추천 상품
            </h2>
            <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              작업 효율을 높여주는 유용한 제품들을 확인해보세요
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '32px' 
          }}>
            <ProductRecommendation 
              category="office" 
              title="사무용품 추천"
            />
            <ProductRecommendation 
              category="tech" 
              title="기술 제품 추천"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '24px' }}>
            지금 바로 시작하세요
          </h2>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '40px', lineHeight: '1.6' }}>
            무료로 제공되는 다양한 도구들을 사용하여 작업 효율성을 높여보세요
          </p>
          <Button size="lg" onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}>
            <Zap size={20} />
            도구 둘러보기
          </Button>
    </div>
      </section>
    </Layout>
  );
}

