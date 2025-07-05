# GitHub 자동 업로드 스크립트
param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$true)]
    [string]$RepositoryName = "utilbox"
)

Write-Host "GitHub에 코드를 업로드합니다..." -ForegroundColor Green

# Git 초기화
Write-Host "1. Git 저장소 초기화..." -ForegroundColor Yellow
git init

# 파일 추가
Write-Host "2. 파일 추가..." -ForegroundColor Yellow
git add .

# 첫 번째 커밋
Write-Host "3. 첫 번째 커밋..." -ForegroundColor Yellow
git commit -m "Initial commit: 유틸박스 프로젝트"

# 메인 브랜치로 설정
Write-Host "4. 메인 브랜치 설정..." -ForegroundColor Yellow
git branch -M main

# GitHub 원격 저장소 연결
Write-Host "5. GitHub 원격 저장소 연결..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$GitHubUsername/$RepositoryName.git"
git remote add origin $remoteUrl

# GitHub에 업로드
Write-Host "6. GitHub에 업로드..." -ForegroundColor Yellow
git push -u origin main

Write-Host "업로드 완료!" -ForegroundColor Green
Write-Host "GitHub 저장소: https://github.com/$GitHubUsername/$RepositoryName" -ForegroundColor Cyan
Write-Host "이제 Vercel에서 배포할 수 있습니다!" -ForegroundColor Cyan 