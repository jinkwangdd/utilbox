import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
              ← 홈으로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">개인정보처리방침</h1>
            <p className="text-gray-600">최종 업데이트: 2024년 12월 19일</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 개인정보 수집 및 이용 목적</h2>
              <p className="text-gray-700 mb-4">
                유틸박스는 다음과 같은 목적으로 개인정보를 수집하고 이용합니다:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>서비스 제공 및 운영</li>
                <li>사용자 경험 개선</li>
                <li>서비스 품질 향상</li>
                <li>광고 서비스 제공</li>
                <li>법적 의무 이행</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 수집하는 개인정보 항목</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">자동 수집 정보:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>IP 주소</li>
                  <li>브라우저 정보</li>
                  <li>접속 로그</li>
                  <li>쿠키 정보</li>
                  <li>사용자 에이전트</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">업로드 파일:</h3>
                <p className="text-gray-700">
                  사용자가 업로드한 파일들은 처리 후 즉시 삭제되며, 서버에 저장되지 않습니다.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 개인정보 보유 및 이용기간</h2>
              <p className="text-gray-700 mb-4">
                수집된 개인정보는 다음과 같은 기간 동안 보유 및 이용됩니다:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>서비스 이용 종료 시까지</li>
                <li>법정 보존기간이 있는 경우 해당 기간</li>
                <li>업로드된 파일: 처리 완료 후 즉시 삭제</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 개인정보의 제3자 제공</h2>
              <p className="text-gray-700 mb-4">
                유틸박스는 다음과 같은 경우에만 개인정보를 제3자에게 제공할 수 있습니다:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>사용자의 사전 동의가 있는 경우</li>
                <li>법령에 의해 요구되는 경우</li>
                <li>수사기관의 수사목적으로 법령에 정해진 절차에 따라 요구되는 경우</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 쿠키 사용</h2>
              <p className="text-gray-700 mb-4">
                유틸박스는 사용자 경험 향상을 위해 쿠키를 사용합니다:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>세션 관리</li>
                <li>사용자 설정 저장</li>
                <li>광고 서비스 제공</li>
                <li>서비스 이용 통계</li>
              </ul>
              <p className="text-gray-700 mt-4">
                브라우저 설정에서 쿠키 사용을 거부할 수 있으나, 일부 서비스 이용에 제한이 있을 수 있습니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 개인정보 보호책임자</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>이름:</strong> 개인정보보호책임자<br />
                  <strong>이메일:</strong> privacy@utilbox.com<br />
                  <strong>연락처:</strong> 02-1234-5678
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 개인정보 처리방침 변경</h2>
              <p className="text-gray-700">
                이 개인정보처리방침은 법령 및 방침에 따라 변경될 수 있으며, 변경 시 사이트를 통해 공지합니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 