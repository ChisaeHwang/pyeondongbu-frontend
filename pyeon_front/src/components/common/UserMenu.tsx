import React, { useState, useRef, useEffect } from "react";
import { AuthUserResponse } from "../../types/auth";
import ProfileImage from "../common/ProfileImage";
import UserDropdown from "./UserDropdown";

interface UserMenuProps {
  user: AuthUserResponse;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-8 h-8 rounded-full bg-white flex items-center justify-center 
        overflow-hidden border-2 border-transparent hover:border-gray-300 transition-colors"
      >
        <ProfileImage user={user} />
      </button>

      {isDropdownOpen && <UserDropdown user={user} />}
    </div>
  );
};

export default UserMenu;
