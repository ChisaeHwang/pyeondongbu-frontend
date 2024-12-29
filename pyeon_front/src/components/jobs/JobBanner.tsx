import React from "react";

const JobBanner = () => {
  return (
    <div className="mb-6 mt-6">
      <div className="w-full h-[200px] sm:h-[160px] md:h-[200px] rounded-lg overflow-hidden">
        <img
          src="https://ifh.cc/g/Dvzz2b.jpg"
          alt="배너 이미지"
          className="w-full h-full object-cover block sm:hidden"
        />
        <img
          src="https://ifh.cc/g/mr3J95.jpg"
          alt="배너 이미지"
          className="w-full h-full object-cover hidden sm:block"
        />
      </div>
    </div>
  );
};

export default JobBanner;
