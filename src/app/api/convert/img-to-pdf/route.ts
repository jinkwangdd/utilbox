import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    console.log('IMG to PDF API 호출됨');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const pageSize = (formData.get('pageSize') as string) || 'A4';

    if (!file) {
      console.log('파일이 없음');
      return NextResponse.json({ error: '파일이 필요합니다.' }, { status: 400 });
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.log('파일 크기 초과:', file.size);
      return NextResponse.json({ error: '파일 크기는 10MB 이하여야 합니다.' }, { status: 400 });
    }

    console.log('이미지 처리 시작:', file.name, '크기:', file.size, '타입:', file.type);

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      console.log('지원되지 않는 파일 타입:', file.type);
      return NextResponse.json({ error: '이미지 파일만 지원됩니다.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const buffer = Buffer.from(uint8Array);
    
    // 이미지 메타데이터 가져오기
    let metadata;
    try {
      metadata = await sharp(buffer).metadata();
    } catch (error) {
      console.error('이미지 메타데이터 읽기 실패:', error);
      return NextResponse.json({ error: '유효하지 않은 이미지 파일입니다.' }, { status: 400 });
    }
    
    if (!metadata.width || !metadata.height) {
      console.log('이미지 크기 정보 없음');
      return NextResponse.json({ error: '유효하지 않은 이미지 파일입니다.' }, { status: 400 });
    }

    console.log('이미지 메타데이터:', { 
      width: metadata.width, 
      height: metadata.height, 
      format: metadata.format,
      size: metadata.size 
    });

    // 이미지 크기 제한 및 최적화
    const maxDimension = 2000;
    let processedBuffer = buffer;
    
    if (metadata.width > maxDimension || metadata.height > maxDimension) {
      console.log('이미지 크기 압축 중...');
      try {
        processedBuffer = await sharp(buffer)
          .resize(maxDimension, maxDimension, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .jpeg({ quality: 85 })
          .toBuffer();
        console.log('이미지 압축 완료, 새 크기:', processedBuffer.length);
      } catch (error) {
        console.error('이미지 압축 실패:', error);
        return NextResponse.json({ error: '이미지 처리 중 오류가 발생했습니다.' }, { status: 500 });
      }
    }

    // 이미지를 JPEG로 변환하여 크기 최적화
    let optimizedBuffer;
    try {
      optimizedBuffer = await sharp(processedBuffer)
        .jpeg({ quality: 80 })
        .toBuffer();
      console.log('이미지 최적화 완료, 크기:', optimizedBuffer.length);
    } catch (error) {
      console.error('이미지 최적화 실패:', error);
      return NextResponse.json({ error: '이미지 최적화 중 오류가 발생했습니다.' }, { status: 500 });
    }

    // 이미지를 base64로 변환
    const base64Image = optimizedBuffer.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;

    console.log('HTML 생성 중...');

    // 페이지 크기 설정
    const pageWidth = pageSize === 'A4' ? 794 : 612; // A4: 794px, Letter: 612px
    const pageHeight = pageSize === 'A4' ? 1123 : 792;
    
    // HTML 생성 (클라이언트에서 처리할 수 있도록)
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              margin: 0;
              padding: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: white;
              width: ${pageWidth}px;
              height: ${pageHeight}px;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" alt="Converted Image">
        </body>
      </html>
    `;

    // 클라이언트에서 처리할 수 있도록 HTML을 반환
    // 실제 PDF 변환은 클라이언트에서 jsPDF와 html2canvas를 사용하여 처리
    console.log('HTML 생성 완료');

    return NextResponse.json({ 
      success: true,
      html: html,
      imageData: dataUrl,
      pageSize: pageSize,
      fileName: file.name
    });

  } catch (error) {
    console.error('IMG to PDF 변환 오류:', error);
    
    // 더 구체적인 에러 메시지
    let errorMessage = 'PDF 변환 중 오류가 발생했습니다.';
    
    if (error instanceof Error) {
      if (error.message.includes('memory')) {
        errorMessage = '이미지가 너무 큽니다. 더 작은 이미지를 사용해주세요.';
      } else if (error.message.includes('format')) {
        errorMessage = '지원되지 않는 이미지 형식입니다.';
      } else if (error.message.includes('timeout')) {
        errorMessage = '처리 시간이 초과되었습니다. 더 작은 이미지를 사용해주세요.';
      } else if (error.message.includes('ENOENT')) {
        errorMessage = 'PDF 생성 중 시스템 오류가 발생했습니다.';
      }
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 