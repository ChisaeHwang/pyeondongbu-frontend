import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = "h-6 w-6",
  showText = true,
}) => {
  const logoUrl = "/images/logo.png";

  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src={logoUrl}
        alt="편동부 - 유튜브 편집자 구인구직 플랫폼 로고"
        className="h-7 w-7 object-contain"
      />
      {showText && (
        <span className="text-lg sm:text-2xl font-bold text-gray-100">
          편동부
        </span>
      )}
    </Link>
  );
};

export default Logo;
