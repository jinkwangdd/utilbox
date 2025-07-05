import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

// 간단한 메모리 저장소 (실제로는 데이터베이스 사용)
const urlStore = new Map<string, { originalUrl: string; createdAt: Date }>();

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL이 필요합니다.' }, { status: 400 });
    }

    // URL 유효성 검사
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: '유효하지 않은 URL입니다.' }, { status: 400 });
    }

    // 짧은 코드 생성 (6자리)
    const shortCode = nanoid(6);
    
    // URL 저장
    urlStore.set(shortCode, {
      originalUrl: url,
      createdAt: new Date()
    });

    // 짧은 URL 생성
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const shortUrl = `${baseUrl}/r/${shortCode}`;

    return NextResponse.json({
      shortUrl,
      originalUrl: url,
      shortCode
    });

  } catch (error) {
    console.error('URL 단축 오류:', error);
    return NextResponse.json({ error: 'URL 단축 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// URL 리다이렉트를 위한 GET 핸들러
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const shortCode = searchParams.get('code');

    if (!shortCode) {
      return NextResponse.json({ error: '단축 코드가 필요합니다.' }, { status: 400 });
    }

    const urlData = urlStore.get(shortCode);
    if (!urlData) {
      return NextResponse.json({ error: '유효하지 않은 단축 코드입니다.' }, { status: 404 });
    }

    return NextResponse.json({
      originalUrl: urlData.originalUrl,
      shortCode,
      createdAt: urlData.createdAt
    });

  } catch (error) {
    console.error('URL 조회 오류:', error);
    return NextResponse.json({ error: 'URL 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
} 