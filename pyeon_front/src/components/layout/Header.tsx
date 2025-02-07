import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import { useAuth } from "../../contexts/AuthContext";
import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="bg-[#25262b] border-b border-[#2c2d32] sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between h-14">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <Logo className="h-6 w-auto" />
          </div>

          {!isLoading && (user ? <UserMenu user={user} /> : <LoginButton />)}
        </div>
      </div>
    </header>
  );
};

export default Header;
