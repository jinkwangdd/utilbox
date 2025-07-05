# 🛠️ 유틸박스 (UtilBox)

온라인 PDF 도구 및 이미지 변환 서비스

## ✨ 주요 기능

### 📄 PDF 도구
- **PDF 분할**: 페이지별로 PDF 파일 분할
- **PDF 합병**: 여러 PDF 파일을 하나로 합치기
- **PDF 정보 확인**: 파일 크기, 페이지 수, 메타데이터 등

### 🖼️ 이미지 변환
- **이미지 to PDF**: JPG, PNG, GIF, BMP, WebP → PDF 변환
- **다중 이미지 지원**: 여러 이미지를 하나의 PDF로 변환
- **고품질 변환**: Sharp 라이브러리 기반 고품질 처리

## 🚀 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **PDF 처리**: pdf-lib, jsPDF
- **이미지 처리**: Sharp, Jimp
- **UI 컴포넌트**: Lucide React
- **배포**: Vercel/Netlify

## 📦 설치 및 실행

### 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/yourusername/utilbox.git
cd utilbox

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 프로덕션 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 🌐 배포

### Vercel 배포 (추천)
1. [vercel.com](https://vercel.com) 접속
2. GitHub 저장소 연결
3. 자동 배포 완료

### Netlify 배포
1. [netlify.com](https://netlify.com) 접속
2. "New site from Git" 선택
3. GitHub 저장소 연결

## 📱 사용법

### PDF 분할
1. PDF 파일 업로드
2. "PDF 분할" 선택
3. "처리하기" 클릭
4. ZIP 파일 다운로드

### 이미지 to PDF 변환
1. 이미지 파일 업로드 (여러 개 가능)
2. "변환하기" 클릭
3. PDF 파일 다운로드

## 🎯 특징

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- **드래그 앤 드롭**: 직관적인 파일 업로드
- **실시간 미리보기**: 업로드된 파일 미리보기
- **광고 수익화**: Google AdSense, 쿠팡파트너스 지원
- **고성능**: 클라이언트 사이드 처리로 빠른 속도

## 🔧 환경 변수

```env
# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx

# 쿠팡파트너스
NEXT_PUBLIC_COUPANG_PARTNER_ID=your-partner-id
```

## 📄 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
