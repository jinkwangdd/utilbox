import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ error: '이미지 파일이 필요합니다.' }, { status: 400 });
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: '파일 크기는 10MB 이하여야 합니다.' }, { status: 400 });
    }

    // 이미지 형식 검증
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: '유효한 이미지 파일이 아닙니다.' }, { status: 400 });
    }

    console.log('배경 제거 시작:', file.name, '크기:', file.size);

    // 파일을 Buffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const buffer = Buffer.from(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength);

    // 이미지 크기 제한 (너무 큰 이미지는 압축)
    const maxDimension = 800;
    let processedBuffer: Uint8Array = uint8Array;
    
    // sharp로 이미지 메타데이터 확인
    const metadata = await sharp(uint8Array).metadata();
    
    if (metadata.width && metadata.height && (metadata.width > maxDimension || metadata.height > maxDimension)) {
      console.log('이미지 크기 압축 중...');
      const compressedBuffer = await sharp(uint8Array)
        .resize(maxDimension, maxDimension, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .png()
        .toBuffer();
      processedBuffer = new Uint8Array(compressedBuffer);
    }

    console.log('배경 제거 처리 중...');

    // 배경 제거 처리
    const processedImageBuffer = await removeBackgroundWithSharp(processedBuffer);
    
    console.log('배경 제거 완료, 크기:', processedImageBuffer.length);

    // 응답 헤더 설정
    const headers = new Headers();
    headers.set('Content-Type', 'image/png');
    headers.set('Content-Disposition', 'attachment; filename="background-removed.png"');
    
    return new NextResponse(processedImageBuffer, {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('배경 제거 처리 오류:', error);
    return NextResponse.json(
      { error: '배경 제거 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// Sharp를 사용한 실제 배경 제거 함수
async function removeBackgroundWithSharp(buffer: Uint8Array): Promise<Buffer> {
  try {
    // 이미지 메타데이터 가져오기
    const metadata = await sharp(buffer).metadata();
    
    if (!metadata.width || !metadata.height) {
      throw new Error('이미지 메타데이터를 가져올 수 없습니다.');
    }

    console.log('이미지 크기:', metadata.width, 'x', metadata.height);

    // 1. 이미지를 RGBA로 변환하여 투명도 지원
    const rgbaBuffer = await sharp(buffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // 2. 픽셀 데이터를 Uint8Array로 변환
    const pixels = new Uint8Array(rgbaBuffer.data);
    const { width, height } = rgbaBuffer.info;
    
    // 3. 배경 제거 로직: 밝은 색상(흰색 계열)을 투명하게 만들기
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      // 밝기 계산 (RGB 평균)
      const brightness = (r + g + b) / 3;
      
      // 색상 유사도 계산 (RGB 값들이 비슷한지)
      const colorSimilarity = Math.max(r, g, b) - Math.min(r, g, b);
      
      // 배경 조건: 밝고 색상이 비슷한 경우 (흰색, 회색 계열)
      if (brightness > 200 && colorSimilarity < 30) {
        pixels[i + 3] = 0; // 알파값을 0으로 설정 (투명)
      }
      // 추가 조건: 매우 밝은 색상들
      else if (brightness > 240) {
        pixels[i + 3] = 0;
      }
    }

    // 4. 처리된 픽셀 데이터를 다시 이미지로 변환
    const resultBuffer = await sharp(pixels, {
      raw: {
        width,
        height,
        channels: 4
      }
    })
    .png()
    .toBuffer();

    return resultBuffer;
  } catch (error) {
    console.error('Sharp 배경 제거 오류:', error);
    // 오류 발생 시 원본 이미지를 PNG로 변환하여 반환
    return await sharp(buffer)
      .png()
      .toBuffer();
  }
} 