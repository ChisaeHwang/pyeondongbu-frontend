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
          <a
            href="https://beneficial-sole-f84.notion.site/1b3af3bea2e280a3a713fbb1c5652c57?pvs=74"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-blue-200 transition-colors"
          >
            <span className="text-lg mb-2">📋 개인정보처리방침 보기</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          <p className="text-sm mt-2">외부 노션 페이지로 이동합니다</p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPage;
