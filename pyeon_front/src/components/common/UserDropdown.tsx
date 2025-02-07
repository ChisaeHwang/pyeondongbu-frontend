import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AuthUserResponse } from "../../types/auth";

interface UserDropdownProps {
  user: AuthUserResponse;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div
      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 
    border border-gray-200 z-50"
    >
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-sm font-semibold text-gray-900">{user.nickname}</p>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 
        hover:bg-gray-100 transition-colors"
      >
        로그아웃
      </button>
    </div>
  );
};

export default UserDropdown;
