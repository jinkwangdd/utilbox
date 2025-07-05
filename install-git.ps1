# Git 설치 스크립트
Write-Host "Git 설치를 시작합니다..." -ForegroundColor Green

# Chocolatey 설치 (패키지 매니저)
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Chocolatey를 설치합니다..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}

# Git 설치
Write-Host "Git을 설치합니다..." -ForegroundColor Yellow
choco install git -y

# 환경 변수 새로고침
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "Git 설치가 완료되었습니다!" -ForegroundColor Green
Write-Host "PowerShell을 재시작한 후 다음 명령어를 실행하세요:" -ForegroundColor Cyan
Write-Host "git --version" -ForegroundColor White 