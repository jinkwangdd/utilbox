import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
              ← 홈으로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">이용약관</h1>
            <p className="text-gray-600">최종 업데이트: 2024년 12월 19일</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
              <p className="text-gray-700">
                이 약관은 유틸박스(이하 "회사")가 제공하는 온라인 도구 서비스(이하 "서비스")의 이용과 관련하여 
                회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">제2조 (정의)</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. "서비스"란</h3>
                  <p className="text-gray-700">
                    회사가 제공하는 이미지 압축, PDF 변환, QR 코드 생성 등 다양한 온라인 도구 서비스를 의미합니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. "이용자"란</h3>
                  <p className="text-gray-700">
                    회사의 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 자를 의미합니다.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">제3조 (서비스의 제공)</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  회사는 다음과 같은 서비스를 제공합니다:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>이미지 압축 및 변환 서비스</li>
                  <li>PDF 분할, 합병, 변환 서비스</li>
                  <li>QR 코드 생성 서비스</li>
                  <li>URL 단축 서비스</li>
                  <li>텍스트 변환 및 처리 서비스</li>
                  <li>기타 회사가 정하는 서비스</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">제4조 (서비스 이용)</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간 운영을 원칙으로 합니다.
                </p>
                <p className="text-gray-700">
                  회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스제공화면에 공지한 바에 따릅니다.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">제5조 (이용자의 의무)</h2>
              <div className="space-y-4">
                <p className="text-gray-700">이용자는 다음 행위를 하여서는 안 됩니다:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>서비스에 게시된 정보의 변경</li>
                  <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등)의 송신 또는 게시</li>
                  <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                  <li>회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                  <li>외설 또는 폭력적인 메시지, 화상, 음성 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
                  <li>불법적인 파일 업로드</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">제6조 (개인정보보호)</h2>
              <p className="text-gray-700">
                회사는 관련법령이 정하는 바에 따라 이용자의 개인정보를 보호하며, 
                개인정보의 보호 및 사용에 대해서는 관련법령 및 회사가 정하는 개인정보처리방침이 정한 바에 따릅니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">제7조 (회사의 의무)</h2>
              <div className="space-y-4">
                <p className="text-gray-700">회사는 다음과 같은 의무를 가집니다:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>안정적이고 지속적인 서비스 제공</li>
                  <li>이용자의 개인정보 보호</li>
                  <li>업로드된 파일의 안전한 처리 및 즉시 삭제</li>
                  <li>서비스 이용과 관련한 이용자의 불만사항 처리</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">제8조 (서비스의 중단)</h2>
              <p className="text-gray-700">
                회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 
                서비스의 제공을 일시적으로 중단할 수 있습니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">제9조 (면책조항)</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 
                  서비스 제공에 관한 책임이 면제됩니다.
                </p>
                <p className="text-gray-700">
                  회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">제10조 (약관의 변경)</h2>
              <p className="text-gray-700">
                회사는 약관의 규제에 관한 법률 등 관련법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                약관이 개정되는 경우 회사는 개정사항을 시행일자 7일 전부터 공지합니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">제11조 (관할법원)</h2>
              <p className="text-gray-700">
                서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 회사의 본사 소재지를 관할하는 법원을 전속관할법원으로 합니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 