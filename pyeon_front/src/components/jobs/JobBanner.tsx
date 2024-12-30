import React from "react";

const JobBanner = () => {
  return (
    <div className="mb-6 mt-6">
      <div className="w-full h-[200px] sm:h-[160px] md:h-[200px] rounded-lg overflow-hidden">
        {/* 모바일 버전 배너 이미지 */}
        <img
          src="https://ifh.cc/g/r9v1dP.jpg"
          alt="배너 이미지"
          className="w-full h-full object-cover block sm:hidden"
        />
        {/* 데스크톱 버전 배너 이미지 */}
        <img
          src="https://ifh.cc/g/a3SCgJ.jpg"
          alt="배너 이미지"
          className="w-full h-full object-cover hidden sm:block"
        />
      </div>
    </div>
  );
};

export default JobBanner;
