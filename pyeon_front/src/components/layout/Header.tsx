import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  PiList,
  PiX,
  PiUserCircle,
  PiNotePencil,
  PiSignOut,
  PiBriefcase,
  PiUsers,
  PiChatsCircle,
} from "react-icons/pi";
import Logo from "../common/Logo";
import { useAuth } from "../../contexts/AuthContext";
import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 모바일 메뉴가 열릴 때 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMobileMenuOpen]);

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
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

            {/* 데스크톱 네비게이션 */}
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

          {/* 데스크톱 유저 메뉴 */}
          <div className="hidden md:block">
            {isAuthenticated && user ? (
              <UserMenu user={user} />
            ) : (
              <LoginButton />
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-300 hover:text-white p-2 z-50 relative"
          >
            {isMobileMenuOpen ? (
              <PiX className="text-2xl" />
            ) : (
              <PiList className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* 모바일 메뉴 */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-[#1a1b1e] md:hidden transition-all duration-300 ease-out
        ${isMobileMenuOpen ? "translate-y-0" : "translate-y-full"}`}
        style={{ height: "calc(100% - 56px)", top: "56px" }}
      >
        <div className="h-full overflow-y-auto">
          <div className="container mx-auto px-4 py-6 space-y-6">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-4 px-4 py-3">
                  <img
                    src={user.profileImageUrl}
                    alt={user.nickname}
                    className="w-12 h-12 rounded-full border-2 border-gray-700"
                  />
                  <div>
                    <p className="text-white font-medium text-lg">
                      {user.nickname}
                    </p>
                    <p className="text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="border-t border-[#2c2d32] pt-6">
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white text-lg hover:bg-white/5 transition-colors rounded-lg"
                  >
                    <PiUserCircle className="text-2xl" />
                    <span>프로필 수정</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-posts")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white text-lg hover:bg-white/5 transition-colors rounded-lg"
                  >
                    <PiNotePencil className="text-2xl" />
                    <span>내가 쓴 글</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 py-3">
                <LoginButton />
              </div>
            )}

            <div className="border-t border-[#2c2d32] pt-6 space-y-1">
              <button
                onClick={() => handleNavigation("/hire")}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white text-lg hover:bg-white/5 transition-colors rounded-lg"
              >
                <PiBriefcase className="text-2xl" />
                <span>구인</span>
              </button>
              <button
                onClick={() => handleNavigation("/recruit")}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white text-lg hover:bg-white/5 transition-colors rounded-lg"
              >
                <PiUsers className="text-2xl" />
                <span>구직</span>
              </button>
              <button
                onClick={() => handleNavigation("/community")}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white text-lg hover:bg-white/5 transition-colors rounded-lg"
              >
                <PiChatsCircle className="text-2xl" />
                <span>커뮤니티</span>
              </button>
            </div>

            {isAuthenticated && (
              <div className="border-t border-[#2c2d32] pt-6">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white text-lg hover:bg-white/5 transition-colors rounded-lg"
                >
                  <PiSignOut className="text-2xl" />
                  <span>로그아웃</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
