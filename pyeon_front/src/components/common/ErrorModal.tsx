import React from "react";
import { useNavigate } from "react-router-dom";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  subMessage?: string;
  actionText?: string;
  actionLink?: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  subMessage,
  actionText = "홈으로 돌아가기",
  actionLink = "/",
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleAction = () => {
    onClose();
    if (actionLink) {
      navigate(actionLink);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-[#1E1F22] rounded-lg p-6 max-w-md w-full shadow-xl">
        <h3 className="text-xl font-bold text-red-500 mb-2">{title}</h3>
        <div className="my-4 text-gray-300">
          <p className="mb-2">{message}</p>
          {subMessage && <p className="text-sm text-gray-400">{subMessage}</p>}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-sm text-gray-300 hover:bg-gray-700"
          >
            닫기
          </button>
          <button
            onClick={handleAction}
            className="px-4 py-2 bg-blue-600 rounded text-sm text-white hover:bg-blue-700"
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
