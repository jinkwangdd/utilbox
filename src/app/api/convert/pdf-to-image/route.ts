import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';
import JSZip from 'jszip';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: '파일이 필요합니다.' }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'PDF 파일만 지원됩니다.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    
    if (pages.length === 0) {
      return NextResponse.json({ error: 'PDF에 페이지가 없습니다.' }, { status: 400 });
    }

    // 모든 페이지를 이미지로 변환 (간단한 방법)
    const zip = new JSZip();
    for (let i = 0; i < pages.length; i++) {
      const singlePdf = await PDFDocument.create();
      const [copiedPage] = await singlePdf.copyPages(pdfDoc, [i]);
      singlePdf.addPage(copiedPage);
      const pdfBytes = await singlePdf.saveAsBase64({ dataUri: true });
      const base64Data = pdfBytes.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      const page = pages[i];
      const { width, height } = page.getSize();
      const processedImage = await sharp(buffer)
        .png()
        .resize(Math.round(width), Math.round(height), { 
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toBuffer();
      zip.file(`page_${i + 1}.png`, processedImage);
    }

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="pdf_images.zip"`,
      },
    });

  } catch (error) {
    console.error('PDF to Image 변환 오류:', error);
    return NextResponse.json({ error: 'PDF 변환 중 오류가 발생했습니다.' }, { status: 500 });
  }
} 