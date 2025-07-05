import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const pageNumber = parseInt(formData.get('pageNumber') as string);

    if (!file) {
      return NextResponse.json({ error: '파일이 필요합니다.' }, { status: 400 });
    }

    if (isNaN(pageNumber) || pageNumber < 1) {
      return NextResponse.json({ error: '유효한 페이지 번호를 입력해주세요.' }, { status: 400 });
    }

    // PDF 파일 형식 검증
    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'PDF 파일만 처리할 수 있습니다.' }, { status: 400 });
    }

    console.log('개별 페이지 다운로드:', file.name, '페이지:', pageNumber);

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pageCount = pdfDoc.getPageCount();

    if (pageNumber > pageCount) {
      return NextResponse.json({ 
        error: `페이지 번호가 범위를 벗어났습니다. 총 ${pageCount}페이지입니다.` 
      }, { status: 400 });
    }

    // 해당 페이지만 추출
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNumber - 1]);
    newPdf.addPage(copiedPage);
    
    const pdfBytes = await newPdf.save();
    const fileName = `${file.name.replace(/\.pdf$/i, '')}_page_${pageNumber}.pdf`;

    console.log('개별 페이지 다운로드 완료:', fileName);

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      }
    });

  } catch (error) {
    console.error('개별 페이지 다운로드 오류:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid PDF')) {
        return NextResponse.json({ error: '유효하지 않은 PDF 파일입니다.' }, { status: 400 });
      } else if (error.message.includes('Password')) {
        return NextResponse.json({ error: '암호화된 PDF 파일은 처리할 수 없습니다.' }, { status: 400 });
      }
    }
    
    return NextResponse.json({ error: '페이지 다운로드 중 오류가 발생했습니다.' }, { status: 500 });
  }
} 