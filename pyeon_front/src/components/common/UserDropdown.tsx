import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AuthUserResponse } from "../../types/auth";
import { PiUserCircleGear, PiNotePencil, PiSignOut } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

interface UserDropdownProps {
  user: AuthUserResponse;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <div
      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 
      border border-gray-200 z-50 
      opacity-0 translate-y-[-10px] animate-dropdown"
    >
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-sm font-semibold text-gray-900">{user.nickname}</p>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>

      <div className="py-1">
        <Link
          to="/profile"
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 
          hover:bg-gray-100 transition-colors"
        >
          <PiUserCircleGear className="text-lg" />
          <span>프로필 수정</span>
        </Link>

        <Link
          to="/my-posts"
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 
          hover:bg-gray-100 transition-colors"
        >
          <PiNotePencil className="text-lg" />
          <span>내가 쓴 글</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 
          hover:bg-gray-100 transition-colors"
        >
          <PiSignOut className="text-lg" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
