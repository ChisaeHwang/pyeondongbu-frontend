import React from "react";
import { IoSearchOutline } from "react-icons/io5";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  placeholder,
}) => {
  return (
    <div className="relative flex items-center w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-[#2c2d32] text-white rounded-md 
        placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSubmit}
        className="absolute right-2 text-gray-400 hover:text-white 
        transition-colors p-1"
      >
        <IoSearchOutline size={20} />
      </button>
    </div>
  );
};

export default SearchInput;
