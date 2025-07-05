import { NextRequest, NextResponse } from 'next/server';

interface PassportPhotoOptions {
  country: string;
  size: string;
  background: string;
}

const PASSPORT_SIZES = {
  'korea': { width: 35, height: 45 },
  'usa': { width: 50, height: 50 },
  'japan': { width: 35, height: 45 },
  'china': { width: 33, height: 48 },
  'uk': { width: 35, height: 45 },
  'schengen': { width: 35, height: 45 }
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const country = formData.get('country') as string;
    const background = formData.get('background') as string;
    
    if (!file) {
      return NextResponse.json({ error: '이미지 파일이 필요합니다.' }, { status: 400 });
    }

    if (!country || !PASSPORT_SIZES[country as keyof typeof PASSPORT_SIZES]) {
      return NextResponse.json({ error: '유효한 국가를 선택해주세요.' }, { status: 400 });
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: '파일 크기는 10MB 이하여야 합니다.' }, { status: 400 });
    }

    // 이미지 형식 검증
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: '유효한 이미지 파일이 아닙니다.' }, { status: 400 });
    }

    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 여기서는 실제 이미지 처리를 시뮬레이션
    // 실제 구현에서는 Canvas API나 Sharp를 사용하여 이미지 리사이징 및 배경 처리
    
    // 현재는 원본 이미지를 반환하되, 메타데이터에 처리 완료 표시
    const processedImageBuffer = buffer;
    
    // 응답 헤더 설정
    const headers = new Headers();
    headers.set('Content-Type', 'image/jpeg');
    headers.set('Content-Disposition', `attachment; filename="passport-photo-${country}.jpg"`);
    
    return new NextResponse(processedImageBuffer, {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('여권사진 생성 처리 오류:', error);
    return NextResponse.json(
      { error: '여권사진 생성 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 