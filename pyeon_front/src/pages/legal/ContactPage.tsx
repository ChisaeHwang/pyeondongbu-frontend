import React from "react";
import LegalLayout from "./LegalLayout";
import AdBanner from "../../components/ads/AdBanner";

const ContactPage: React.FC = () => {
  const email = "pyeondongbu@gmail.com"; // 실제 이메일 주소로 변경해주세요

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <LegalLayout>
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">문의하기</h1>
        <p className="text-gray-400 mb-8">
          서비스 이용 중 궁금하신 점이나 건의사항이 있으시다면
          <br />
          아래 이메일로 연락해 주세요.
        </p>
        <button
          onClick={handleEmailClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2c2d32] hover:bg-[#3a3b40] transition-colors rounded-lg text-gray-100"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {email}
        </button>

        {/* 하단 배너 광고 */}
        <div className="mt-10">
          <AdBanner position="content-bottom" />
        </div>
      </div>
    </LegalLayout>
  );
};

export default ContactPage;
