import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function GET() {
  return NextResponse.json({ message: 'PDF 합병 API가 정상적으로 작동합니다.' });
}

export async function POST(request: NextRequest) {
  try {
    console.log('PDF 합병 API 호출됨');
    console.log('요청 헤더:', Object.fromEntries(request.headers.entries()));
    
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    console.log('받은 파일 수:', files.length);
    console.log('FormData 키들:', Array.from(formData.keys()));

    if (!files || files.length === 0) {
      console.log('파일이 없음');
      return NextResponse.json({ error: 'PDF 파일이 필요합니다.' }, { status: 400 });
    }

    if (files.length < 2) {
      console.log('파일이 2개 미만:', files.length);
      return NextResponse.json({ error: '합병하려면 최소 2개의 PDF 파일이 필요합니다.' }, { status: 400 });
    }

    console.log('PDF 합병 시작:', files.length, '개 파일');

    // 파일 크기 제한 (총 100MB)
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    console.log('총 파일 크기:', totalSize);
    
    if (totalSize > 100 * 1024 * 1024) {
      return NextResponse.json({ error: '총 파일 크기는 100MB 이하여야 합니다.' }, { status: 400 });
    }

    // PDF 파일 검증 및 페이지 수 확인
    const fileInfo = [];
    for (const file of files) {
      console.log('파일 검증:', file.name, '타입:', file.type, '크기:', file.size);
      if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
        return NextResponse.json({ 
          error: `"${file.name}"은 PDF 파일이 아닙니다. PDF 파일만 업로드 가능합니다.` 
        }, { status: 400 });
      }
      
      // 각 파일의 페이지 수 미리 확인
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();
        fileInfo.push({ name: file.name, pages: pageCount });
        console.log(`파일 "${file.name}" 페이지 수: ${pageCount}페이지`);
      } catch (error) {
        console.error(`파일 "${file.name}" 페이지 수 확인 실패:`, error);
        fileInfo.push({ name: file.name, pages: 'unknown' });
      }
    }
    
    console.log('파일 정보 요약:', fileInfo);

    console.log('PDF 문서 생성 시작');
    const mergedPdf = await PDFDocument.create();
    let totalPages = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        console.log(`파일 ${i + 1}/${files.length} 처리 중:`, file.name);
        
        const arrayBuffer = await file.arrayBuffer();
        console.log(`파일 ${file.name} ArrayBuffer 크기:`, arrayBuffer.byteLength);
        
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();

        if (pageCount === 0) {
          console.warn(`빈 PDF 파일 건너뜀: ${file.name}`);
          continue;
        }

        const copiedPages = await mergedPdf.copyPages(pdfDoc, Array.from({ length: pageCount }, (_, i) => i));
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        totalPages += pageCount;

        console.log(`파일 "${file.name}" 처리 완료: ${pageCount}페이지`);

      } catch (error) {
        console.error(`PDF 파일 처리 오류 (${file.name}):`, error);
        
        // 더 구체적인 오류 메시지 제공
        if (error instanceof Error) {
          if (error.message.includes('Invalid PDF')) {
            return NextResponse.json({ 
              error: `"${file.name}"은 유효하지 않은 PDF 파일입니다.` 
            }, { status: 400 });
          } else if (error.message.includes('Password')) {
            return NextResponse.json({ 
              error: `"${file.name}"은 암호화된 PDF 파일입니다. 암호를 해제한 후 다시 시도해주세요.` 
            }, { status: 400 });
          }
        }
        
        return NextResponse.json({ 
          error: `파일 "${file.name}"을 처리할 수 없습니다. 유효한 PDF 파일인지 확인해주세요.` 
        }, { status: 400 });
      }
    }

    if (totalPages === 0) {
      return NextResponse.json({ error: '합병할 수 있는 페이지가 없습니다.' }, { status: 400 });
    }

    console.log('PDF 합병 완료, 총 페이지 수:', totalPages);
    console.log('합병 요약:');
    fileInfo.forEach(info => {
      console.log(`  - ${info.name}: ${info.pages}페이지`);
    });
    console.log(`  = 총 ${totalPages}페이지`);

    const mergedPdfBytes = await mergedPdf.save();
    const pdfBuffer = Buffer.from(mergedPdfBytes);

    console.log('합병된 PDF 크기:', pdfBuffer.length);

    // 한글 파일명을 안전한 영문 파일명으로 변환
    const safeBaseName = files[0].name
      .replace(/\.pdf$/i, '')
      .replace(/[^\w\s-]/g, '') // 특수문자 제거
      .replace(/\s+/g, '_') // 공백을 언더스코어로 변환
      .substring(0, 30); // 길이 제한

    const mergedFileName = files.length === 2 
      ? `${safeBaseName}_merged.pdf`
      : `merged_${new Date().toISOString().slice(0, 10)}.pdf`;

    console.log('최종 파일명:', mergedFileName);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${mergedFileName}"`,
      }
    });

  } catch (error) {
    console.error('PDF 합병 오류:', error);
    
    // 더 구체적인 오류 메시지 제공
    if (error instanceof Error) {
      if (error.message.includes('Invalid PDF')) {
        return NextResponse.json({ error: '유효하지 않은 PDF 파일이 포함되어 있습니다.' }, { status: 400 });
      } else if (error.message.includes('Password')) {
        return NextResponse.json({ error: '암호화된 PDF 파일이 포함되어 있습니다.' }, { status: 400 });
      }
    }
    
    return NextResponse.json({ error: 'PDF 합병 중 오류가 발생했습니다.' }, { status: 500 });
  }
} 