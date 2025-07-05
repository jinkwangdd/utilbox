'use client';

import { useState } from 'react';
import { Globe, Type, ClipboardCopy, ClipboardCheck } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

// 한글 로마자 표기법 규칙 (간단한 버전)
const romanizationRules: { [key: string]: string } = {
  'ㄱ': 'g', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅅ': 's', 'ㅇ': '', 'ㅈ': 'j', 'ㅊ': 'ch', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
  'ㅏ': 'a', 'ㅑ': 'ya', 'ㅓ': 'eo', 'ㅕ': 'yeo', 'ㅗ': 'o', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅣ': 'i',
  'ㅐ': 'ae', 'ㅒ': 'yae', 'ㅔ': 'e', 'ㅖ': 'ye', 'ㅘ': 'wa', 'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅝ': 'wo', 'ㅞ': 'we', 'ㅟ': 'wi', 'ㅢ': 'ui'
};

const convertToRomanization = (koreanText: string): string => {
  let result = '';
  
  for (let i = 0; i < koreanText.length; i++) {
    const char = koreanText[i];
    const code = char.charCodeAt(0);
    
    if (code >= 44032 && code <= 55203) { // 한글 유니코드 범위
      const syllable = code - 44032;
      const final = syllable % 28;
      const medial = Math.floor((syllable % 588) / 28);
      const initial = Math.floor(syllable / 588);
      
      // 초성
      const initialConsonants = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
      const initialChar = initialConsonants[initial];
      
      // 중성
      const medialVowels = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
      const medialChar = medialVowels[medial];
      
      // 종성
      const finalConsonants = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
      const finalChar = finalConsonants[final];
      
      // 로마자 변환
      let romanized = '';
      
      // 초성 처리
      if (initialChar === 'ㄲ') romanized += 'kk';
      else if (initialChar === 'ㄸ') romanized += 'tt';
      else if (initialChar === 'ㅃ') romanized += 'pp';
      else if (initialChar === 'ㅆ') romanized += 'ss';
      else if (initialChar === 'ㅉ') romanized += 'jj';
      else if (romanizationRules[initialChar]) romanized += romanizationRules[initialChar];
      
      // 중성 처리
      if (romanizationRules[medialChar]) romanized += romanizationRules[medialChar];
      
      // 종성 처리
      if (finalChar && romanizationRules[finalChar]) {
        romanized += romanizationRules[finalChar];
      }
      
      result += romanized;
    } else {
      result += char; // 한글이 아닌 문자는 그대로 유지
    }
  }
  
  return result;
};

export default function RomanizationConverterPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!inputText.trim()) return;
    const romanized = convertToRomanization(inputText);
    setOutputText(romanized);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            margin: '0 auto 24px'
          }}>
            <Globe size={40} style={{ color: '#ffffff' }} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
            로마자 표기 변환
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            한글 이름을 로마자로 정확하게 변환합니다
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
          {/* Input Section */}
          <Card variant="elevated">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '10px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}>
                <Type size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                한글 입력
              </h2>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                한글 텍스트
              </label>
              <textarea
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                placeholder="한글 이름이나 텍스트를 입력하세요 (예: 김철수, 서울시)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <Button 
              onClick={handleConvert}
              disabled={!inputText.trim()}
              style={{ width: '100%' }}
            >
              <Globe size={20} style={{ marginRight: '8px' }} />
              로마자로 변환
            </Button>
          </Card>

          {/* Output Section */}
          <Card variant="elevated">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '10px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              }}>
                <Globe size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                로마자 결과
              </h2>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                변환된 로마자
              </label>
              <div style={{ position: 'relative' }}>
                <textarea
                  readOnly
                  style={{
                    width: '100%',
                    minHeight: '200px',
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    backgroundColor: '#f9fafb',
                    color: '#374151'
                  }}
                  placeholder="변환된 로마자가 여기에 표시됩니다."
                  value={outputText}
                />
                {outputText && (
                  <button
                    onClick={handleCopy}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#ffffff',
                      color: copied ? '#10b981' : '#6b7280',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title="클립보드에 복사"
                  >
                    {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
                  </button>
                )}
              </div>
              {copied && (
                <p style={{ 
                  color: '#10b981', 
                  fontSize: '14px', 
                  marginTop: '8px', 
                  textAlign: 'right',
                  fontWeight: '500'
                }}>
                  클립보드에 복사되었습니다!
                </p>
              )}
            </div>

            {/* Examples */}
            <div style={{ 
              backgroundColor: '#f8fafc', 
              padding: '20px', 
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                변환 예시
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#374151' }}>김철수</span>
                  <span style={{ color: '#6b7280', fontFamily: 'monospace' }}>Kim Cheolsu</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#374151' }}>이영희</span>
                  <span style={{ color: '#6b7280', fontFamily: 'monospace' }}>Lee Yeonghui</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#374151' }}>박민수</span>
                  <span style={{ color: '#6b7280', fontFamily: 'monospace' }}>Bak Minsu</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '48px 24px', 
          borderRadius: '16px',
          marginBottom: '48px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              로마자 변환의 활용
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              다양한 상황에서 로마자 변환을 활용하세요
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '24px' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                margin: '0 auto 16px'
              }}>
                <Globe size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                여권 및 신분증
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                해외 여행 시 필요한 공식 문서 작성
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                margin: '0 auto 16px'
              }}>
                <Globe size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                이메일 및 계정
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                해외 서비스 가입 시 사용자명 작성
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                margin: '0 auto 16px'
              }}>
                <Globe size={24} style={{ color: '#ffffff' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                학술 및 비즈니스
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                국제 학회나 비즈니스 문서 작성
              </p>
            </div>
          </div>
        </div>
    </div>
    </Layout>
  );
}
