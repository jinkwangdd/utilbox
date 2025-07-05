import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';
import PDFDocument from 'pdfkit';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: '파일이 필요합니다.' }, { status: 400 });
    }

    // 파일 크기 제한 (50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: '파일 크기는 50MB 이하여야 합니다.' }, { status: 400 });
    }

    // 지원하는 파일 형식 확인
    const supportedTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'text/html'
    ];

    if (!supportedTypes.includes(file.type)) {
      return NextResponse.json({ error: '지원하지 않는 파일 형식입니다.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    let text = '';
    
    if (file.type === 'text/plain') {
      text = buffer.toString('utf-8');
    } else if (file.type === 'text/html') {
      // HTML 태그 제거
      text = buffer.toString('utf-8').replace(/<[^>]*>/g, '');
    } else {
      // Word 문서 변환
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    }

    // PDF 생성
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
      }
    });

    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));

    // 폰트 설정
    doc.font('Helvetica');
    doc.fontSize(12);
    doc.lineGap(5);

    // 텍스트를 PDF에 추가
    const lines = text.split('\n');
    let y = 50;

    for (const line of lines) {
      if (y > doc.page.height - 100) {
        doc.addPage();
        y = 50;
      }
      
      if (line.trim()) {
        doc.text(line.trim(), 50, y);
        y += 20;
      } else {
        y += 10;
      }
    }

    doc.end();

    const pdfBuffer = Buffer.concat(chunks);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="converted_${file.name.replace(/\.[^/.]+$/, '')}.pdf"`,
      }
    });

  } catch (error) {
    console.error('Word to PDF 변환 오류:', error);
    return NextResponse.json({ error: 'PDF 변환 중 오류가 발생했습니다.' }, { status: 500 });
  }
} 