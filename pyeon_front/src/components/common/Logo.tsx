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
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src="https://ifh.cc/g/PDRy1k.png"
        alt="편동부 로고"
        className={`object-contain ${className}`}
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
