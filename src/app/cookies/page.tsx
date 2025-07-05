import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
              ← 홈으로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">쿠키 정책</h1>
            <p className="text-gray-600">최종 업데이트: 2024년 12월 19일</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 쿠키란 무엇인가요?</h2>
              <p className="text-gray-700 mb-4">
                쿠키는 웹사이트가 사용자의 컴퓨터나 모바일 기기에 저장하는 작은 텍스트 파일입니다. 
                쿠키는 사용자가 웹사이트를 방문할 때마다 브라우저를 통해 전송되어 사용자의 선호도와 
                행동 패턴을 기억하는 데 도움을 줍니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 유틸박스에서 사용하는 쿠키의 종류</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">필수 쿠키 (Essential Cookies)</h3>
                  <p className="text-gray-700 mb-2">
                    웹사이트의 기본 기능을 제공하기 위해 반드시 필요한 쿠키입니다.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>세션 관리</li>
                    <li>보안 기능</li>
                    <li>사용자 설정 저장</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">성능 쿠키 (Performance Cookies)</h3>
                  <p className="text-gray-700 mb-2">
                    웹사이트의 성능을 분석하고 개선하기 위해 사용되는 쿠키입니다.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>페이지 로딩 속도 측정</li>
                    <li>사용자 행동 분석</li>
                    <li>오류 발생 추적</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">광고 쿠키 (Advertising Cookies)</h3>
                  <p className="text-gray-700 mb-2">
                    사용자에게 관련성 높은 광고를 제공하기 위해 사용되는 쿠키입니다.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Google AdSense</li>
                    <li>쿠팡파트너스</li>
                    <li>광고 성과 측정</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 제3자 쿠키</h2>
              <p className="text-gray-700 mb-4">
                유틸박스는 다음과 같은 제3자 서비스의 쿠키를 사용합니다:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Google Analytics:</strong> 웹사이트 사용 통계 분석</li>
                <li><strong>Google AdSense:</strong> 광고 서비스 제공</li>
                <li><strong>쿠팡파트너스:</strong> 제품 추천 서비스</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 쿠키 관리 방법</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">브라우저 설정을 통한 쿠키 관리</h3>
                  <p className="text-gray-700 mb-2">
                    대부분의 웹 브라우저에서 쿠키 설정을 관리할 수 있습니다:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Chrome: 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터</li>
                    <li>Firefox: 설정 → 개인정보 및 보안 → 쿠키 및 사이트 데이터</li>
                    <li>Safari: 환경설정 → 개인정보 보호 → 쿠키 및 웹사이트 데이터</li>
                    <li>Edge: 설정 → 쿠키 및 사이트 권한 → 쿠키</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">쿠키 차단의 영향</h3>
                  <p className="text-gray-700">
                    쿠키를 차단하면 일부 서비스 기능이 제한될 수 있습니다. 
                    특히 필수 쿠키를 차단하면 웹사이트의 기본 기능이 정상적으로 작동하지 않을 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 쿠키 보유 기간</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">세션 쿠키</h3>
                  <p className="text-gray-700">
                    브라우저를 닫으면 자동으로 삭제되는 임시 쿠키입니다.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">영구 쿠키</h3>
                  <p className="text-gray-700">
                    설정된 만료일까지 또는 수동으로 삭제할 때까지 유지되는 쿠키입니다.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 쿠키 정책 변경</h2>
              <p className="text-gray-700">
                이 쿠키 정책은 법령 및 방침에 따라 변경될 수 있으며, 변경 시 사이트를 통해 공지합니다. 
                정기적으로 이 페이지를 확인하여 최신 정보를 확인하시기 바랍니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 문의사항</h2>
              <p className="text-gray-700">
                쿠키 사용에 대한 문의사항이 있으시면 다음 연락처로 문의해 주세요:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700">
                  <strong>이메일:</strong> privacy@utilbox.com<br />
                  <strong>전화:</strong> 02-1234-5678
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 