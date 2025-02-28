import { PiSignIn, PiSignOut } from "react-icons/pi";
import { AuthUserResponse } from "../../../../types/auth";
import { navigationItems } from "./NavigationItems";
import { UserProfile } from "./UserProfile";

interface MobileMenuProps {
  isOpen: boolean;
  user: AuthUserResponse | null;
  isAuthenticated: boolean;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const MobileMenu = ({
  isOpen,
  user,
  isAuthenticated,
  onNavigate,
  onLogout,
  onClose,
}: MobileMenuProps) => {
  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* 메뉴 */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-[#1a1b1e] md:hidden transition-all duration-300 ease-out
        ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        style={{ height: "calc(100% - 56px)", top: "56px" }}
      >
        <div className="h-full overflow-y-auto">
          <div className="container mx-auto px-4 py-6 space-y-6">
            {isAuthenticated && user ? (
              <UserProfile user={user} onNavigate={onNavigate} />
            ) : (
              <div className="px-4 py-3">
                <button
                  onClick={() => onNavigate("/login")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white text-lg hover:bg-white/5 transition-colors rounded-lg"
                >
                  <PiSignIn className="text-2xl" />
                  <span>로그인</span>
                </button>
              </div>
            )}

            <div className="border-t border-[#2c2d32] pt-6 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white text-lg hover:bg-white/5 transition-colors rounded-lg"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {isAuthenticated && (
              <div className="border-t border-[#2c2d32] pt-6">
                <button
                  onClick={onLogout}
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
    </>
  );
};
