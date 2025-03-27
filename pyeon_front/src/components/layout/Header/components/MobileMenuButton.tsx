import { PiList, PiX } from "react-icons/pi";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileMenuButton = ({
  isOpen,
  onClick,
}: MobileMenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden text-gray-300 hover:text-white p-2 z-50 relative"
    >
      {isOpen ? <PiX className="text-2xl" /> : <PiList className="text-2xl" />}
    </button>
  );
};
