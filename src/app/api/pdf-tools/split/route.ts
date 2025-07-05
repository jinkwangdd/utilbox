import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const splitType = formData.get('splitType') as string; // 'all' | 'range'
    const pageRange = formData.get('pageRange') as string; // '1-3,5,7-9'
    const downloadType = formData.get('downloadType') as string; // 'zip' | 'individual'

    if (!file) {
      return NextResponse.json({ error: '파일이 필요합니다.' }, { status: 400 });
    }

    // 파일 크기 제한 (50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: '파일 크기는 50MB 이하여야 합니다.' }, { status: 400 });
    }

    // PDF 파일 형식 검증
    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'PDF 파일만 처리할 수 있습니다.' }, { status: 400 });
    }

    console.log('PDF 분할 시작:', file.name, '크기:', file.size);

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pageCount = pdfDoc.getPageCount();

    console.log('PDF 페이지 수:', pageCount);

    if (pageCount === 0) {
      return NextResponse.json({ error: '빈 PDF 파일입니다.' }, { status: 400 });
    }

    let pagesToSplit: number[] = [];

    if (splitType === 'all') {
      // 모든 페이지를 개별 PDF로 분할
      pagesToSplit = Array.from({ length: pageCount }, (_, i) => i);
      console.log('전체 페이지 분할:', pagesToSplit.length, '페이지');
    } else if (splitType === 'range') {
      // 지정된 페이지 범위 분할
      if (!pageRange || pageRange.trim() === '') {
        return NextResponse.json({ error: '페이지 범위를 입력해주세요.' }, { status: 400 });
      }

      const ranges = pageRange.split(',').map(range => range.trim());
      
      for (const range of ranges) {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(num => parseInt(num.trim()));
          if (isNaN(start) || isNaN(end) || start < 1 || end > pageCount || start > end) {
            return NextResponse.json({ 
              error: `잘못된 페이지 범위입니다: ${range}. 유효한 범위는 1-${pageCount}입니다.` 
            }, { status: 400 });
          }
          for (let i = start - 1; i < end; i++) {
            pagesToSplit.push(i);
          }
        } else {
          const pageNum = parseInt(range);
          if (isNaN(pageNum) || pageNum < 1 || pageNum > pageCount) {
            return NextResponse.json({ 
              error: `잘못된 페이지 번호입니다: ${range}. 유효한 범위는 1-${pageCount}입니다.` 
            }, { status: 400 });
          }
          pagesToSplit.push(pageNum - 1);
        }
      }
      console.log('범위 분할:', pageRange, '->', pagesToSplit.length, '페이지');
    }

    if (pagesToSplit.length === 0) {
      return NextResponse.json({ error: '분할할 페이지를 선택해주세요.' }, { status: 400 });
    }

    // 중복 제거 및 정렬
    pagesToSplit = [...new Set(pagesToSplit)].sort((a, b) => a - b);

    console.log('분할 처리 중...');

    const results: { pageNumber: number; pdfBuffer: Buffer; fileName: string }[] = [];

    for (const pageIndex of pagesToSplit) {
      try {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
        newPdf.addPage(copiedPage);
        
        const pdfBytes = await newPdf.save();
        const fileName = `${file.name.replace(/\.pdf$/i, '')}_page_${pageIndex + 1}.pdf`;
        
        results.push({
          pageNumber: pageIndex + 1,
          pdfBuffer: Buffer.from(pdfBytes),
          fileName: fileName
        });
      } catch (pageError) {
        console.error(`페이지 ${pageIndex + 1} 처리 오류:`, pageError);
        return NextResponse.json({ 
          error: `페이지 ${pageIndex + 1} 처리 중 오류가 발생했습니다.` 
        }, { status: 500 });
      }
    }

    // 한글 파일명을 안전한 영문 파일명으로 변환
    const safeFileName = file.name
      .replace(/\.pdf$/i, '')
      .replace(/[^\w\s-]/g, '') // 특수문자 제거
      .replace(/\s+/g, '_') // 공백을 언더스코어로 변환
      .substring(0, 50); // 길이 제한

    if (downloadType === 'individual') {
      // 개별 PDF 다운로드 - 첫 번째 파일만 반환하고 나머지는 세션에 저장
      const firstResult = results[0];
      
      return new NextResponse(firstResult.pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${firstResult.fileName}"`,
          'X-Total-Files': results.length.toString(),
          'X-Current-File': '1',
          'X-File-Data': JSON.stringify(results.map((r, index) => ({
            pageNumber: r.pageNumber,
            fileName: r.fileName,
            index: index
          })))
        }
      });
    } else {
      // ZIP 다운로드
      console.log('ZIP 파일 생성 중...');
      
      const zip = new JSZip();

      results.forEach(({ pageNumber, pdfBuffer, fileName }) => {
        zip.file(fileName, pdfBuffer);
      });

      const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

      console.log('PDF 분할 완료, ZIP 크기:', zipBuffer.length);

      return new NextResponse(zipBuffer, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="split_${safeFileName}.zip"`,
        }
      });
    }

  } catch (error) {
    console.error('PDF 분할 오류:', error);
    
    // 더 구체적인 오류 메시지 제공
    if (error instanceof Error) {
      if (error.message.includes('Invalid PDF')) {
        return NextResponse.json({ error: '유효하지 않은 PDF 파일입니다.' }, { status: 400 });
      } else if (error.message.includes('Password')) {
        return NextResponse.json({ error: '암호화된 PDF 파일은 처리할 수 없습니다.' }, { status: 400 });
      }
    }
    
    return NextResponse.json({ error: 'PDF 분할 중 오류가 발생했습니다.' }, { status: 500 });
  }
} 