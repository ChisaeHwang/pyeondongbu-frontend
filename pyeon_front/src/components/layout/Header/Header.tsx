import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../common/Logo";
import { useAuth } from "../../../contexts/AuthContext";
import UserMenu from "../UserMenu";
import LoginButton from "../LoginButton";
import { useScrollLock } from "../../../hooks/useScrollLock";
import { DesktopNav } from "./components/DesktopNav";
import { MobileMenuButton } from "./components/MobileMenuButton";
import { MobileMenu } from "./components/MobileMenu";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 스크롤 잠금 훅 사용
  useScrollLock(isMobileMenuOpen);

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      setIsMobileMenuOpen(false);
      await logout();
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  // 인증 상태 로딩 중 표시할 컴포넌트
  const renderAuthLoadingState = () => (
    <div className="w-8 h-8 flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></div>
    </div>
  );

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
            <DesktopNav />
          </div>

          <div className="hidden md:block">
            {isLoading ? (
              renderAuthLoadingState()
            ) : isAuthenticated && user ? (
              <UserMenu user={user} />
            ) : (
              <LoginButton />
            )}
          </div>

          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        user={user}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;