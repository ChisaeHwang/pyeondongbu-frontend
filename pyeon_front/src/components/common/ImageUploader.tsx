import React, { useState, useRef, ChangeEvent } from "react";
import { handleImageUpload } from "../../utils/imageUpload";

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  className?: string;
  buttonText?: string;
  maxSizeMB?: number;
  accept?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  className = "",
  buttonText = "이미지 업로드",
  maxSizeMB = 10,
  accept = "image/jpeg, image/png, image/gif, image/webp",
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      await handleImageUpload(
        file,
        (imageUrl) => {
          onImageUpload(imageUrl);
          setIsLoading(false);
          // 파일 입력 초기화
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
          // 파일 입력 초기화
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
        maxSizeMB
      );
    } catch (err) {
      setError("이미지 업로드 중 오류가 발생했습니다");
      setIsLoading(false);
      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`image-uploader ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "업로드 중..." : buttonText}
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default ImageUploader;
