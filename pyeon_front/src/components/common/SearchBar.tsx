import React, { useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "검색어를 입력하세요...",
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative w-80">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#1e1f22] text-gray-200 pl-10 pr-4 py-1.5 rounded-md border-2 border-[#2c2d32] focus:outline-none focus:border-[#454545] text-sm shadow-sm"
          style={{
            boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.05)",
          }}
        />
        <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
      </div>
    </form>
  );
};

export default SearchBar;
