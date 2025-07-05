'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Copy, Check, Globe, Calendar, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

interface Timezone {
  name: string;
  offset: string;
  label: string;
  country: string;
  city: string;
}

const timezones: Timezone[] = [
  // 한국
  { name: 'Asia/Seoul', offset: '+09:00', label: '서울 (KST)', country: '대한민국', city: '서울' },
  
  // 일본
  { name: 'Asia/Tokyo', offset: '+09:00', label: '도쿄 (JST)', country: '일본', city: '도쿄' },
  { name: 'Asia/Osaka', offset: '+09:00', label: '오사카 (JST)', country: '일본', city: '오사카' },
  { name: 'Asia/Sapporo', offset: '+09:00', label: '삿포로 (JST)', country: '일본', city: '삿포로' },
  
  // 중국
  { name: 'Asia/Shanghai', offset: '+08:00', label: '상하이 (CST)', country: '중국', city: '상하이' },
  { name: 'Asia/Beijing', offset: '+08:00', label: '베이징 (CST)', country: '중국', city: '베이징' },
  { name: 'Asia/Chongqing', offset: '+08:00', label: '충칭 (CST)', country: '중국', city: '충칭' },
  { name: 'Asia/Urumqi', offset: '+08:00', label: '우루무치 (CST)', country: '중국', city: '우루무치' },
  
  // 홍콩
  { name: 'Asia/Hong_Kong', offset: '+08:00', label: '홍콩 (HKT)', country: '홍콩', city: '홍콩' },
  
  // 싱가포르
  { name: 'Asia/Singapore', offset: '+08:00', label: '싱가포르 (SGT)', country: '싱가포르', city: '싱가포르' },
  
  // 말레이시아
  { name: 'Asia/Kuala_Lumpur', offset: '+08:00', label: '쿠알라룸푸르 (MYT)', country: '말레이시아', city: '쿠알라룸푸르' },
  
  // 태국
  { name: 'Asia/Bangkok', offset: '+07:00', label: '방콕 (ICT)', country: '태국', city: '방콕' },
  
  // 베트남
  { name: 'Asia/Ho_Chi_Minh', offset: '+07:00', label: '호치민 (ICT)', country: '베트남', city: '호치민' },
  { name: 'Asia/Hanoi', offset: '+07:00', label: '하노이 (ICT)', country: '베트남', city: '하노이' },
  
  // 인도네시아
  { name: 'Asia/Jakarta', offset: '+07:00', label: '자카르타 (WIB)', country: '인도네시아', city: '자카르타' },
  { name: 'Asia/Makassar', offset: '+08:00', label: '마카사르 (WITA)', country: '인도네시아', city: '마카사르' },
  { name: 'Asia/Jayapura', offset: '+09:00', label: '자야푸라 (WIT)', country: '인도네시아', city: '자야푸라' },
  
  // 인도
  { name: 'Asia/Kolkata', offset: '+05:30', label: '뭄바이 (IST)', country: '인도', city: '뭄바이' },
  { name: 'Asia/New_Delhi', offset: '+05:30', label: '뉴델리 (IST)', country: '인도', city: '뉴델리' },
  { name: 'Asia/Chennai', offset: '+05:30', label: '첸나이 (IST)', country: '인도', city: '첸나이' },
  { name: 'Asia/Calcutta', offset: '+05:30', label: '콜카타 (IST)', country: '인도', city: '콜카타' },
  
  // 파키스탄
  { name: 'Asia/Karachi', offset: '+05:00', label: '카라치 (PKT)', country: '파키스탄', city: '카라치' },
  { name: 'Asia/Islamabad', offset: '+05:00', label: '이슬라마바드 (PKT)', country: '파키스탄', city: '이슬라마바드' },
  
  // UAE
  { name: 'Asia/Dubai', offset: '+04:00', label: '두바이 (GST)', country: 'UAE', city: '두바이' },
  { name: 'Asia/Abu_Dhabi', offset: '+04:00', label: '아부다비 (GST)', country: 'UAE', city: '아부다비' },
  
  // 러시아
  { name: 'Europe/Moscow', offset: '+03:00', label: '모스크바 (MSK)', country: '러시아', city: '모스크바' },
  { name: 'Europe/Kaliningrad', offset: '+02:00', label: '칼리닌그라드 (EET)', country: '러시아', city: '칼리닌그라드' },
  { name: 'Asia/Yekaterinburg', offset: '+05:00', label: '예카테린부르크 (YEKT)', country: '러시아', city: '예카테린부르크' },
  { name: 'Asia/Novosibirsk', offset: '+07:00', label: '노보시비르스크 (NOVT)', country: '러시아', city: '노보시비르스크' },
  { name: 'Asia/Vladivostok', offset: '+10:00', label: '블라디보스토크 (VLAT)', country: '러시아', city: '블라디보스토크' },
  
  // 터키
  { name: 'Europe/Istanbul', offset: '+03:00', label: '이스탄불 (TRT)', country: '터키', city: '이스탄불' },
  
  // 이집트
  { name: 'Africa/Cairo', offset: '+02:00', label: '카이로 (EET)', country: '이집트', city: '카이로' },
  
  // 남아프리카
  { name: 'Africa/Johannesburg', offset: '+02:00', label: '요하네스버그 (SAST)', country: '남아프리카', city: '요하네스버그' },
  { name: 'Africa/Cape_Town', offset: '+02:00', label: '케이프타운 (SAST)', country: '남아프리카', city: '케이프타운' },
  
  // 독일
  { name: 'Europe/Berlin', offset: '+01:00', label: '베를린 (CET)', country: '독일', city: '베를린' },
  { name: 'Europe/Munich', offset: '+01:00', label: '뮌헨 (CET)', country: '독일', city: '뮌헨' },
  
  // 프랑스
  { name: 'Europe/Paris', offset: '+01:00', label: '파리 (CET)', country: '프랑스', city: '파리' },
  
  // 이탈리아
  { name: 'Europe/Rome', offset: '+01:00', label: '로마 (CET)', country: '이탈리아', city: '로마' },
  { name: 'Europe/Milan', offset: '+01:00', label: '밀란 (CET)', country: '이탈리아', city: '밀란' },
  
  // 스페인
  { name: 'Europe/Madrid', offset: '+01:00', label: '마드리드 (CET)', country: '스페인', city: '마드리드' },
  { name: 'Europe/Barcelona', offset: '+01:00', label: '바르셀로나 (CET)', country: '스페인', city: '바르셀로나' },
  
  // 영국
  { name: 'Europe/London', offset: '+00:00', label: '런던 (GMT)', country: '영국', city: '런던' },
  { name: 'Europe/Edinburgh', offset: '+00:00', label: '에든버러 (GMT)', country: '영국', city: '에든버러' },
  
  // 아일랜드
  { name: 'Europe/Dublin', offset: '+00:00', label: '더블린 (GMT)', country: '아일랜드', city: '더블린' },
  
  // 네덜란드
  { name: 'Europe/Amsterdam', offset: '+01:00', label: '암스테르담 (CET)', country: '네덜란드', city: '암스테르담' },
  
  // 벨기에
  { name: 'Europe/Brussels', offset: '+01:00', label: '브뤼셀 (CET)', country: '벨기에', city: '브뤼셀' },
  
  // 스위스
  { name: 'Europe/Zurich', offset: '+01:00', label: '취리히 (CET)', country: '스위스', city: '취리히' },
  { name: 'Europe/Geneva', offset: '+01:00', label: '제네바 (CET)', country: '스위스', city: '제네바' },
  
  // 오스트리아
  { name: 'Europe/Vienna', offset: '+01:00', label: '비엔나 (CET)', country: '오스트리아', city: '비엔나' },
  
  // 폴란드
  { name: 'Europe/Warsaw', offset: '+01:00', label: '바르샤바 (CET)', country: '폴란드', city: '바르샤바' },
  
  // 체코
  { name: 'Europe/Prague', offset: '+01:00', label: '프라하 (CET)', country: '체코', city: '프라하' },
  
  // 헝가리
  { name: 'Europe/Budapest', offset: '+01:00', label: '부다페스트 (CET)', country: '헝가리', city: '부다페스트' },
  
  // 스웨덴
  { name: 'Europe/Stockholm', offset: '+01:00', label: '스톡홀름 (CET)', country: '스웨덴', city: '스톡홀름' },
  
  // 노르웨이
  { name: 'Europe/Oslo', offset: '+01:00', label: '오슬로 (CET)', country: '노르웨이', city: '오슬로' },
  
  // 덴마크
  { name: 'Europe/Copenhagen', offset: '+01:00', label: '코펜하겐 (CET)', country: '덴마크', city: '코펜하겐' },
  
  // 핀란드
  { name: 'Europe/Helsinki', offset: '+02:00', label: '헬싱키 (EET)', country: '핀란드', city: '헬싱키' },
  
  // 브라질
  { name: 'America/Sao_Paulo', offset: '-03:00', label: '상파울루 (BRT)', country: '브라질', city: '상파울루' },
  { name: 'America/Rio_Branco', offset: '-05:00', label: '히우브랑쿠 (ACT)', country: '브라질', city: '히우브랑쿠' },
  { name: 'America/Manaus', offset: '-04:00', label: '마나우스 (AMT)', country: '브라질', city: '마나우스' },
  
  // 아르헨티나
  { name: 'America/Argentina/Buenos_Aires', offset: '-03:00', label: '부에노스아이레스 (ART)', country: '아르헨티나', city: '부에노스아이레스' },
  
  // 칠레
  { name: 'America/Santiago', offset: '-03:00', label: '산티아고 (CLT)', country: '칠레', city: '산티아고' },
  
  // 멕시코
  { name: 'America/Mexico_City', offset: '-06:00', label: '멕시코시티 (CST)', country: '멕시코', city: '멕시코시티' },
  { name: 'America/Tijuana', offset: '-08:00', label: '티후아나 (PST)', country: '멕시코', city: '티후아나' },
  
  // 미국
  { name: 'America/New_York', offset: '-05:00', label: '뉴욕 (EST)', country: '미국', city: '뉴욕' },
  { name: 'America/Chicago', offset: '-06:00', label: '시카고 (CST)', country: '미국', city: '시카고' },
  { name: 'America/Denver', offset: '-07:00', label: '덴버 (MST)', country: '미국', city: '덴버' },
  { name: 'America/Los_Angeles', offset: '-08:00', label: '로스앤젤레스 (PST)', country: '미국', city: '로스앤젤레스' },
  { name: 'America/Anchorage', offset: '-09:00', label: '앵커리지 (AKST)', country: '미국', city: '앵커리지' },
  { name: 'Pacific/Honolulu', offset: '-10:00', label: '호놀룰루 (HST)', country: '미국', city: '호놀룰루' },
  
  // 캐나다
  { name: 'America/Toronto', offset: '-05:00', label: '토론토 (EST)', country: '캐나다', city: '토론토' },
  { name: 'America/Vancouver', offset: '-08:00', label: '밴쿠버 (PST)', country: '캐나다', city: '밴쿠버' },
  { name: 'America/Edmonton', offset: '-07:00', label: '에드먼턴 (MST)', country: '캐나다', city: '에드먼턴' },
  { name: 'America/Montreal', offset: '-05:00', label: '몬트리올 (EST)', country: '캐나다', city: '몬트리올' },
  
  // 호주
  { name: 'Australia/Sydney', offset: '+10:00', label: '시드니 (AEST)', country: '호주', city: '시드니' },
  { name: 'Australia/Melbourne', offset: '+10:00', label: '멜버른 (AEST)', country: '호주', city: '멜버른' },
  { name: 'Australia/Perth', offset: '+08:00', label: '퍼스 (AWST)', country: '호주', city: '퍼스' },
  { name: 'Australia/Adelaide', offset: '+09:30', label: '애들레이드 (ACST)', country: '호주', city: '애들레이드' },
  { name: 'Australia/Darwin', offset: '+09:30', label: '다윈 (ACST)', country: '호주', city: '다윈' },
  
  // 뉴질랜드
  { name: 'Pacific/Auckland', offset: '+12:00', label: '오클랜드 (NZST)', country: '뉴질랜드', city: '오클랜드' },
  { name: 'Pacific/Chatham', offset: '+12:45', label: '채텀 (CHAST)', country: '뉴질랜드', city: '채텀' },
  
  // 피지
  { name: 'Pacific/Fiji', offset: '+12:00', label: '피지 (FJT)', country: '피지', city: '수바' }
];

export default function TimezoneConverterPage() {
  const [sourceTimezone, setSourceTimezone] = useState('Asia/Seoul');
  const [targetTimezone, setTargetTimezone] = useState('America/New_York');
  const [sourceTime, setSourceTime] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [copied, setCopied] = useState(false);
  const [sourceSearch, setSourceSearch] = useState('');
  const [targetSearch, setTargetSearch] = useState('');

  // 현재 시간으로 초기화 (서울 시간 기준)
  useEffect(() => {
    const now = new Date();
    const seoulTime = now.toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    // 형식을 YYYY/MM/DD HH:MM:SS로 변환
    const formattedTime = seoulTime.replace(/\. /g, '/').replace(/\./g, '').replace(/\/(\d{2}):/, ' $1:');
    setSourceTime(formattedTime);
  }, []); // sourceTimezone 변경 시마다 실행하지 않도록 빈 배열

  // 검색 필터링 함수
  const filterTimezones = (searchTerm: string) => {
    if (!searchTerm) return timezones;
    const lowerSearch = searchTerm.toLowerCase();
    return timezones.filter(tz => 
      tz.country.toLowerCase().includes(lowerSearch) ||
      tz.city.toLowerCase().includes(lowerSearch) ||
      tz.label.toLowerCase().includes(lowerSearch) ||
      tz.name.toLowerCase().includes(lowerSearch)
    );
  };

  // 국가별로 그룹화
  const groupByCountry = (timezones: Timezone[]) => {
    const groups: { [key: string]: Timezone[] } = {};
    timezones.forEach(tz => {
      if (!groups[tz.country]) {
        groups[tz.country] = [];
      }
      groups[tz.country].push(tz);
    });
    return groups;
  };

  const convertTime = () => {
    if (!sourceTime) {
      toast.error('변환할 시간을 입력해주세요.');
      return;
    }

    try {
      // 입력된 시간을 파싱 (YYYY/MM/DD HH:MM:SS 형식)
      const [datePart, timePart] = sourceTime.split(' ');
      if (!datePart || !timePart) {
        toast.error('올바른 시간 형식을 입력해주세요. (YYYY/MM/DD HH:MM:SS)');
        return;
      }

      const [year, month, day] = datePart.split('/').map(Number);
      const [hour, minute, second] = timePart.split(':').map(Number);
      
      // 유효성 검사
      if (!year || !month || !day || hour === undefined || minute === undefined || second === undefined) {
        toast.error('올바른 시간 형식을 입력해주세요. (YYYY/MM/DD HH:MM:SS)');
        return;
      }

      // 소스 시간대의 시간을 Date 객체로 생성
      const sourceDate = new Date(year, month - 1, day, hour, minute, second);
      
      // 유효한 날짜인지 확인
      if (isNaN(sourceDate.getTime())) {
        toast.error('유효하지 않은 날짜입니다.');
        return;
      }

      // 소스 시간대의 시간을 UTC로 변환
      const sourceOffset = getTimezoneOffsetMinutes(sourceTimezone);
      const utcTime = new Date(sourceDate.getTime() - sourceOffset * 60000);
      
      // UTC 시간을 타겟 시간대로 변환
      const targetOffset = getTimezoneOffsetMinutes(targetTimezone);
      const targetDate = new Date(utcTime.getTime() + targetOffset * 60000);
      
      // 타겟 시간대의 시간을 포맷팅
      const convertedTime = targetDate.toLocaleString('ko-KR', {
        timeZone: targetTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      setTargetTime(convertedTime);
    } catch (error) {
      console.error('시간 변환 오류:', error);
      toast.error('시간 변환 중 오류가 발생했습니다.');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('클립보드에 복사되었습니다!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('클립보드 복사에 실패했습니다.');
    }
  };

  const getCurrentTime = (timezone: string) => {
    return new Date().toLocaleString('ko-KR', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  // 시간대 오프셋을 분 단위로 계산
  const getTimezoneOffsetMinutes = (timezone: string) => {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const targetTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const targetOffset = targetTime.getTime() - utcTime;
    return Math.round(targetOffset / 60000);
  };

  // 시간대 간 시차를 시간 단위로 계산
  const getTimezoneOffset = (sourceTz: string, targetTz: string) => {
    const sourceOffset = getTimezoneOffsetMinutes(sourceTz);
    const targetOffset = getTimezoneOffsetMinutes(targetTz);
    const diff = targetOffset - sourceOffset;
    return diff > 0 ? `+${diff}` : `${diff}`;
  };

  return (
    <Layout>
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{ marginBottom: '48px' }}>
          <Link href="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            color: '#6b7280', 
            textDecoration: 'none',
            marginBottom: '24px',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            <ArrowLeft size={20} style={{ marginRight: '8px' }} />
            홈으로 돌아가기
          </Link>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              color: '#1f2937', 
              marginBottom: '16px',
              lineHeight: '1.2'
            }}>
              시간대 변환기
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#6b7280', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              전 세계 주요 도시의 시간을 실시간으로 변환하고 비교하세요.
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '48px',
          alignItems: 'start'
        }}>
          {/* 입력 섹션 */}
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Clock size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                시간 변환
              </h2>
            </div>

            {/* 소스 시간대 선택 */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1f2937', 
                marginBottom: '8px' 
              }}>
                <MapPin size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                변환할 시간대
              </label>
              
              {/* 검색 입력 */}
              <div style={{ position: 'relative', marginBottom: '8px' }}>
                <Search size={16} style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#9ca3af' 
                }} />
                <input
                  type="text"
                  placeholder="국가, 도시, 시간대 검색..."
                  value={sourceSearch}
                  onChange={(e) => setSourceSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* 드롭다운 */}
              <div style={{ 
                maxHeight: '200px', 
                overflowY: 'auto', 
                border: '2px solid #e5e7eb', 
                borderRadius: '8px',
                backgroundColor: '#ffffff'
              }}>
                {Object.entries(groupByCountry(filterTimezones(sourceSearch))).map(([country, cities]) => (
                  <div key={country}>
                    <div style={{ 
                      padding: '8px 12px', 
                      backgroundColor: '#f8fafc', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      {country}
                    </div>
                    {cities.map((tz) => (
                      <div
                        key={tz.name}
                        onClick={() => setSourceTimezone(tz.name)}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          borderBottom: '1px solid #f3f4f6',
                          backgroundColor: sourceTimezone === tz.name ? '#e0e7ff' : 'transparent',
                          color: sourceTimezone === tz.name ? '#3730a3' : '#1f2937'
                        }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = sourceTimezone === tz.name ? '#e0e7ff' : '#f8fafc'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = sourceTimezone === tz.name ? '#e0e7ff' : 'transparent'}
                      >
                        <div style={{ fontWeight: '500' }}>{tz.city}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {tz.label} (UTC{tz.offset})
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* 소스 시간 입력 */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1f2937', 
                marginBottom: '8px' 
              }}>
                <Calendar size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                변환할 시간
              </label>
              <input
                type="text"
                value={sourceTime}
                onChange={(e) => setSourceTime(e.target.value)}
                placeholder="2024/01/01 12:00:00"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                형식: YYYY/MM/DD HH:MM:SS
              </p>
            </div>

            {/* 타겟 시간대 선택 */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1f2937', 
                marginBottom: '8px' 
              }}>
                <Globe size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                변환할 시간대
              </label>
              
              {/* 검색 입력 */}
              <div style={{ position: 'relative', marginBottom: '8px' }}>
                <Search size={16} style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#9ca3af' 
                }} />
                <input
                  type="text"
                  placeholder="국가, 도시, 시간대 검색..."
                  value={targetSearch}
                  onChange={(e) => setTargetSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* 드롭다운 */}
              <div style={{ 
                maxHeight: '200px', 
                overflowY: 'auto', 
                border: '2px solid #e5e7eb', 
                borderRadius: '8px',
                backgroundColor: '#ffffff'
              }}>
                {Object.entries(groupByCountry(filterTimezones(targetSearch))).map(([country, cities]) => (
                  <div key={country}>
                    <div style={{ 
                      padding: '8px 12px', 
                      backgroundColor: '#f8fafc', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      {country}
                    </div>
                    {cities.map((tz) => (
                      <div
                        key={tz.name}
                        onClick={() => setTargetTimezone(tz.name)}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          borderBottom: '1px solid #f3f4f6',
                          backgroundColor: targetTimezone === tz.name ? '#e0e7ff' : 'transparent',
                          color: targetTimezone === tz.name ? '#3730a3' : '#1f2937'
                        }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = targetTimezone === tz.name ? '#e0e7ff' : '#f8fafc'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = targetTimezone === tz.name ? '#e0e7ff' : 'transparent'}
                      >
                        <div style={{ fontWeight: '500' }}>{tz.city}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {tz.label} (UTC{tz.offset})
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* 변환 버튼 */}
            <Button onClick={convertTime} size="lg" style={{ width: '100%' }}>
              <Clock size={20} style={{ marginRight: '8px' }} />
              시간 변환하기
            </Button>

            {/* 현재 시간 표시 */}
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                현재 시간
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>소스 시간대:</span>
                  <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                    {getCurrentTime(sourceTimezone)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>타겟 시간대:</span>
                  <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                    {getCurrentTime(targetTimezone)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* 결과 섹션 */}
          <Card variant="default">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Clock size={24} style={{ color: '#667eea', marginRight: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                변환 결과
              </h2>
            </div>

            {targetTime ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 변환 결과 */}
                <div style={{ 
                  backgroundColor: '#f0fdf4', 
                  borderRadius: '16px', 
                  padding: '24px',
                  textAlign: 'center',
                  border: '1px solid #bbf7d0'
                }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    backgroundColor: '#dcfce7', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <Clock size={32} style={{ color: '#16a34a' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#16a34a', marginBottom: '8px' }}>
                    변환 완료!
                  </h3>
                  <p style={{ color: '#15803d', fontSize: '14px', margin: 0 }}>
                    시간이 성공적으로 변환되었습니다.
                  </p>
                </div>

                {/* 변환된 시간 */}
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '12px', 
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937', marginBottom: '8px' }}>
                    {targetTime}
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                    {timezones.find(tz => tz.name === targetTimezone)?.label}
                  </p>
                </div>

                {/* 액션 버튼 */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(targetTime)}
                    style={{ flex: 1 }}
                  >
                    {copied ? (
                      <>
                        <Check size={16} style={{ marginRight: '4px' }} />
                        복사됨
                      </>
                    ) : (
                      <>
                        <Copy size={16} style={{ marginRight: '4px' }} />
                        시간 복사
                      </>
                    )}
                  </Button>
                </div>

                {/* 시간대 정보 */}
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '12px', 
                  padding: '16px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                    시간대 정보
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>소스:</span>
                      <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                        {timezones.find(tz => tz.name === sourceTimezone)?.label}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>타겟:</span>
                      <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                        {timezones.find(tz => tz.name === targetTimezone)?.label}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>시차:</span>
                      <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                        {getTimezoneOffset(sourceTimezone, targetTimezone)}시간
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ 
                backgroundColor: '#f8fafc', 
                borderRadius: '16px', 
                padding: '32px',
                textAlign: 'center',
                border: '2px dashed #e5e7eb'
              }}>
                <Clock size={64} style={{ color: '#9ca3af', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  변환된 시간
                </h3>
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                  시간을 입력하고 변환 버튼을 클릭하면<br />
                  여기에 변환 결과가 표시됩니다.
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* 주요 도시 시간 */}
        <div style={{ marginTop: '48px' }}>
          <Card variant="default">
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '24px', textAlign: 'center' }}>
              🌍 주요 도시 현재 시간
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {[
                'Asia/Seoul',
                'Asia/Tokyo',
                'Asia/Shanghai',
                'Asia/Hong_Kong',
                'Asia/Singapore',
                'Asia/Bangkok',
                'Asia/Jakarta',
                'Asia/Kolkata',
                'Asia/Dubai',
                'Europe/Moscow',
                'Europe/Istanbul',
                'Africa/Cairo',
                'Europe/London',
                'Europe/Paris',
                'Europe/Berlin',
                'Europe/Rome',
                'Europe/Madrid',
                'America/New_York',
                'America/Chicago',
                'America/Los_Angeles',
                'America/Toronto',
                'America/Mexico_City',
                'America/Sao_Paulo',
                'Australia/Sydney',
                'Australia/Melbourne',
                'Pacific/Auckland'
              ].map((timezone) => {
                const tz = timezones.find(t => t.name === timezone);
                const currentTime = getCurrentTime(timezone);
                return (
                  <div key={timezone} style={{ 
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
                      {currentTime}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>
                      {tz?.label}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#667eea', 
                      fontWeight: '500',
                      backgroundColor: '#e0e7ff',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      display: 'inline-block'
                    }}>
                      UTC{tz?.offset}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* 사용 팁 */}
        <div style={{ marginTop: '48px' }}>
          <Card variant="default">
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '24px', textAlign: 'center' }}>
              💡 시간대 변환 팁
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                {
                  title: '비즈니스 미팅',
                  description: '해외 파트너와의 미팅 시간을 정확히 맞춰보세요.',
                  icon: '🤝'
                },
                {
                  title: '여행 계획',
                  description: '여행지의 현재 시간을 확인하여 일정을 계획하세요.',
                  icon: '✈️'
                },
                {
                  title: '온라인 이벤트',
                  description: '글로벌 온라인 이벤트의 시작 시간을 확인하세요.',
                  icon: '🎥'
                },
                {
                  title: '친구 연락',
                  description: '해외 친구에게 연락하기 좋은 시간을 찾아보세요.',
                  icon: '📞'
                }
              ].map((tip, index) => (
                <div key={index} style={{ 
                  padding: '20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                    {tip.icon}
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                    {tip.title}
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 광고 배너 */}
        <div style={{ 
          marginTop: '48px', 
          padding: '24px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>
            더 많은 도구를 사용해보세요
          </h3>
          <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '24px' }}>
            이미지 압축, PDF 변환, QR 코드 생성 등 다양한 유틸리티를 제공합니다
          </p>
          <Button variant="outline" size="lg" style={{ 
            color: '#ffffff', 
            borderColor: '#ffffff',
            backgroundColor: 'transparent'
          }}>
            모든 도구 보기
          </Button>
        </div>
      </div>
    </Layout>
  );
}
