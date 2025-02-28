import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../common/Logo";
import { useAuth } from "../../contexts/AuthContext";
import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="bg-[#25262b] border-b border-[#2c2d32] sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <div
              className="flex items-center gap-2 cursor-pointer mr-8"
              onClick={handleLogoClick}
            >
              <Logo className="h-6 w-auto" />
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/hire"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                구인
              </Link>
              <Link
                to="/recruit"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                구직
              </Link>
              <Link
                to="/community"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                커뮤니티
              </Link>
            </nav>
          </div>

          {isAuthenticated && user ? <UserMenu user={user} /> : <LoginButton />}
        </div>
      </div>
    </header>
  );
};

export default Header;
