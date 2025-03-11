import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { handleImageUpload, validateImageFile } from "../../utils/imageUpload";

interface DragDropImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  className?: string;
  previewClassName?: string;
  buttonText?: string;
  dropzoneText?: string;
  maxSizeMB?: number;
  accept?: string;
  initialImageUrl?: string;
  showPreview?: boolean;
}

const DragDropImageUploader: React.FC<DragDropImageUploaderProps> = ({
  onImageUpload,
  className = "",
  previewClassName = "",
  buttonText = "이미지 선택",
  dropzoneText = "이미지를 여기에 드래그하세요",
  maxSizeMB = 10,
  accept = "image/jpeg, image/png, image/gif, image/webp",
  initialImageUrl = "",
  showPreview = true,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(initialImageUrl);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    // 첫 번째 파일만 처리
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    processFile(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`drag-drop-image-uploader ${className}`}>
      {showPreview && previewUrl ? (
        <div className={`image-preview mb-3 ${previewClassName}`}>
          <img
            src={previewUrl}
            alt="이미지 미리보기"
            className="max-w-full h-auto rounded-md"
          />
        </div>
      ) : (
        <div
          className={`dropzone p-6 border-2 border-dashed rounded-md text-center mb-3 transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p className="text-gray-500">{dropzoneText}</p>
          <p className="text-sm text-gray-400 mt-2">또는</p>
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={isLoading}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {buttonText}
          </button>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />

      {previewUrl && (
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "업로드 중..." : "이미지 변경"}
        </button>
      )}

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default DragDropImageUploader;
