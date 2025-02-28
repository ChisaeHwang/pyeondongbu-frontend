import React, { useState } from "react";
import { SearchInput } from "../common/SearchInput";
import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
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
          <div className="w-full max-w-[180px] sm:max-w-[300px] md:max-w-[400px]">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={handleSubmit}
              placeholder="구인글 검색..."
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
