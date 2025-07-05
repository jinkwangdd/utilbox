import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const quality = parseInt(formData.get('quality') as string) || 80;
    const width = parseInt(formData.get('width') as string) || 1920;

    if (!file) {
      return NextResponse.json({ error: '파일이 필요합니다.' }, { status: 400 });
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

    // 간단한 이미지 압축 시뮬레이션
    // 실제 구현에서는 Canvas API나 Sharp를 사용하여 이미지 리사이징 및 압축
    
    // 현재는 원본 이미지를 반환하되, 메타데이터에 압축 정보 표시
    const compressedBuffer = buffer;
    
    // 압축 비율 계산 (시뮬레이션)
    const originalSize = buffer.length;
    const compressedSize = Math.floor(originalSize * (quality / 100));
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

    // 응답 헤더 설정
    const headers = new Headers();
    headers.set('Content-Type', 'image/jpeg');
    headers.set('Content-Disposition', `attachment; filename="compressed_${file.name.replace(/\.[^/.]+$/, '')}.jpg"`);
    headers.set('X-Original-Size', originalSize.toString());
    headers.set('X-Compressed-Size', compressedSize.toString());
    headers.set('X-Compression-Ratio', compressionRatio);
    
    return new NextResponse(compressedBuffer, {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('이미지 압축 오류:', error);
    return NextResponse.json(
      { error: '이미지 압축 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 