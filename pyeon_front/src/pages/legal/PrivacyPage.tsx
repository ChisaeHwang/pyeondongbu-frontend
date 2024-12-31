import React from "react";
import LegalLayout from "./LegalLayout";

const PrivacyPage: React.FC = () => {
  return (
    <LegalLayout>
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-100 mb-4">
          개인정보처리방침
        </h1>
        <div className="bg-blue-500/20 text-blue-300 p-4 rounded-lg border border-blue-500/30 mt-6">
          <p className="text-lg mb-2">🔄 업데이트 예정</p>
          <p className="text-sm">
            현재 로그인 기능 개발 진행 중입니다.
            <br />
            개인정보처리방침은 로그인 기능 추가 후 업데이트될 예정입니다.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPage;
