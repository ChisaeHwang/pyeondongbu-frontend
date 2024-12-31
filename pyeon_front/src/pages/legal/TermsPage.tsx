import React from "react";
import LegalLayout from "./LegalLayout";

const TermsPage: React.FC = () => {
  return (
    <LegalLayout>
      <h1 className="text-2xl font-bold text-gray-100 mb-6">이용약관</h1>
      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-xl font-semibold text-gray-100 mb-3">
            제 1 조 (목적)
          </h2>
          <p className="text-gray-400 leading-relaxed">
            본 약관은 편동부(이하 "서비스")의 이용조건 및 절차, 기타 필요한
            사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-100 mb-3">
            제 2 조 (용어의 정의)
          </h2>
          <p className="text-gray-400 leading-relaxed">
            본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-100 mb-3">
            제 3 조 (약관의 효력과 변경)
          </h2>
          <p className="text-gray-400 leading-relaxed">
            1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을
            발생합니다.
          </p>
          <p className="text-gray-400 leading-relaxed mt-2">
            2. 본 약관의 내용은 서비스의 필요에 따라 변경될 수 있으며, 변경된
            약관은 서비스 내에 공지함으로써 효력이 발생됩니다.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default TermsPage;
