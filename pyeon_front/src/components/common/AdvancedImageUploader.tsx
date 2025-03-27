import React, { useState, useRef, ChangeEvent } from "react";
import { handleImageUpload, validateImageFile } from "../../utils/imageUpload";

interface AdvancedImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  className?: string;
  previewClassName?: string;
  buttonText?: string;
  maxSizeMB?: number;
  accept?: string;
  initialImageUrl?: string;
  showPreview?: boolean;
}

const AdvancedImageUploader: React.FC<AdvancedImageUploaderProps> = ({
  onImageUpload,
  className = "",
  previewClassName = "",
  buttonText = "이미지 업로드",
  maxSizeMB = 10,
  accept = "image/jpeg, image/png, image/gif, image/webp",
  initialImageUrl = "",
  showPreview = true,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(initialImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 유효성 검사
    const validation = validateImageFile(file, maxSizeMB);
    if (!validation.isValid) {
      setError(validation.message || "유효하지 않은 이미지입니다.");
      return;
    }

    // 미리보기 생성
    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(localPreviewUrl);

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
          // 로컬 미리보기 URL 해제
          URL.revokeObjectURL(localPreviewUrl);
          // 미리보기 초기화 (에러 발생 시)
          setPreviewUrl(initialImageUrl);
          // 파일 입력 초기화
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
        maxSizeMB
      );
    } catch (err) {
      setError("이미지 업로드 중 오류가 발생했습니다.");
      setIsLoading(false);
      // 로컬 미리보기 URL 해제
      URL.revokeObjectURL(localPreviewUrl);
      // 미리보기 초기화 (에러 발생 시)
      setPreviewUrl(initialImageUrl);
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
    <div className={`advanced-image-uploader ${className}`}>
      {showPreview && previewUrl && (
        <div className={`image-preview mb-3 ${previewClassName}`}>
          <img
            src={previewUrl}
            alt="이미지 미리보기"
            className="max-w-full h-auto rounded-md"
          />
        </div>
      )}

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

export default AdvancedImageUploader;
