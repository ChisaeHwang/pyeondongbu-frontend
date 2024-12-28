import React, { useState } from "react";
import { SearchInput } from "../common/SearchInput";
import { useNavigate } from "react-router-dom";

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
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between h-14 px-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <img
              src="https://ifh.cc/g/PDRy1k.png"
              alt="편동부 로고"
              className="h-6 w-6 object-contain"
            />
            <h1 className="text-2xl font-bold text-gray-100 cursor-pointer hover:text-gray-300 transition-colors">
              편동부
            </h1>
          </div>
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={handleSubmit}
            placeholder="구인글 검색..."
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
