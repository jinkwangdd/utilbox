import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: '파일이 필요합니다.' }, { status: 400 });
    }

    // PDF 파일 형식 검증
    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'PDF 파일만 처리 가능합니다.' }, { status: 400 });
    }

    console.log('PDF 정보 확인 시작:', file.name, '크기:', file.size);

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    const pageCount = pdfDoc.getPageCount();
    const fileSize = file.size;
    const fileName = file.name;

    console.log('PDF 페이지 수:', pageCount);

    if (pageCount === 0) {
      return NextResponse.json({ error: '빈 PDF 파일입니다.' }, { status: 400 });
    }

    // 페이지 크기 정보 가져오기
    const pageSizes: { width: number; height: number }[] = [];
    for (let i = 0; i < pageCount; i++) {
      try {
        const page = pdfDoc.getPage(i);
        const { width, height } = page.getSize();
        pageSizes.push({ width, height });
      } catch (pageError) {
        console.error(`페이지 ${i + 1} 크기 정보 가져오기 오류:`, pageError);
        pageSizes.push({ width: 0, height: 0 });
      }
    }

    const info = {
      fileName,
      fileSize,
      pageCount,
      pageSizes,
      isEncrypted: pdfDoc.isEncrypted,
      title: pdfDoc.getTitle() || null,
      author: pdfDoc.getAuthor() || null,
      subject: pdfDoc.getSubject() || null,
      creator: pdfDoc.getCreator() || null,
      producer: pdfDoc.getProducer() || null,
      creationDate: pdfDoc.getCreationDate() || null,
      modificationDate: pdfDoc.getModificationDate() || null
    };

    console.log('PDF 정보 확인 완료:', info);

    return NextResponse.json(info);

  } catch (error) {
    console.error('PDF 정보 가져오기 오류:', error);
    
    // 더 구체적인 오류 메시지 제공
    if (error instanceof Error) {
      if (error.message.includes('Invalid PDF')) {
        return NextResponse.json({ error: '유효하지 않은 PDF 파일입니다.' }, { status: 400 });
      } else if (error.message.includes('Password')) {
        return NextResponse.json({ error: '암호화된 PDF 파일입니다. 암호를 해제한 후 다시 시도해주세요.' }, { status: 400 });
      }
    }
    
    return NextResponse.json({ error: 'PDF 정보를 가져올 수 없습니다.' }, { status: 500 });
  }
} 