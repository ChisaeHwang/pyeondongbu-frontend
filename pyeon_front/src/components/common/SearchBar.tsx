import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "검색...",
}) => {
  return (
    <form onSubmit={onSubmit} className="flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-[#2c2d32] text-gray-100 rounded-lg pl-4 pr-10 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-200"
        >
          <FiSearch size={16} />
        </button>
      </div>
    </form>
  );
};
