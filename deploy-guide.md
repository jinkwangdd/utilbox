# 유틸박스 배포 가이드

## 1. Vercel 배포 (추천)

### 1-1. GitHub에 코드 업로드
1. GitHub에서 새 저장소 생성 (예: `utilbox`)
2. 로컬에서 다음 명령어 실행:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/utilbox.git
git push -u origin main
```

### 1-2. Vercel 배포
1. [vercel.com](https://vercel.com) 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. GitHub 저장소 선택
5. 자동으로 배포 완료!

## 2. Netlify 배포

### 2-1. GitHub에 코드 업로드 (위와 동일)

### 2-2. Netlify 배포
1. [netlify.com](https://netlify.com) 접속
2. "New site from Git" 클릭
3. GitHub 저장소 선택
4. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. "Deploy site" 클릭

## 3. 환경 변수 설정

### Vercel에서 환경 변수 설정
1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. 다음 변수 추가:
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: 실제 AdSense 클라이언트 ID
   - `NEXT_PUBLIC_COUPANG_PARTNER_ID`: 쿠팡파트너스 ID

### Netlify에서 환경 변수 설정
1. Netlify 대시보드 → Site settings → Environment variables
2. 동일한 변수 추가

## 4. 배포 후 확인사항

1. **도메인 확인**: 제공된 도메인으로 접속 테스트
2. **기능 테스트**: PDF 도구, 이미지 변환 등 모든 기능 확인
3. **광고 표시**: 실제 광고 코드로 교체 후 표시 확인
4. **모바일 반응형**: 모바일에서도 정상 작동 확인

## 5. 커스텀 도메인 설정 (선택사항)

### Vercel
1. 프로젝트 → Settings → Domains
2. "Add Domain" 클릭
3. 도메인 입력 및 DNS 설정

### Netlify
1. Site settings → Domain management
2. "Add custom domain" 클릭
3. 도메인 입력 및 DNS 설정

## 6. 자동 배포 설정

GitHub에 코드를 푸시하면 자동으로 배포됩니다:
```bash
git add .
git commit -m "Update features"
git push
```

## 7. 문제 해결

### 빌드 오류
- `npm run build` 로컬에서 먼저 테스트
- 환경 변수 설정 확인
- 의존성 설치 확인

### 광고 표시 안됨
- AdSense/쿠팡파트너스 승인 상태 확인
- 환경 변수 설정 확인
- 광고 차단기 비활성화 확인 