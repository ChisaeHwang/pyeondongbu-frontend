import { useState, useCallback } from "react";
import { uploadImage, validateImageFile } from "../utils/imageUpload";

interface UseImageUploadOptions {
  maxSizeMB?: number;
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: Error) => void;
}

interface UseImageUploadResult {
  imageUrl: string;
  isLoading: boolean;
  error: string | null;
  uploadImage: (file: File) => Promise<string>;
  resetImage: () => void;
}

/**
 * 이미지 업로드를 위한 커스텀 훅
 *
 * @param options 옵션 객체
 * @returns 이미지 업로드 관련 상태 및 함수
 */
const useImageUpload = (
  options: UseImageUploadOptions = {}
): UseImageUploadResult => {
  const { maxSizeMB = 10, onSuccess, onError } = options;

  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback(
    async (file: File): Promise<string> => {
      // 파일 유효성 검사
      const validation = validateImageFile(file, maxSizeMB);
      if (!validation.isValid) {
        const errorMessage =
          validation.message || "유효하지 않은 이미지입니다.";
        const error = new Error(errorMessage);
        setError(errorMessage);
        onError?.(error);
        throw error;
      }

      setIsLoading(true);
      setError(null);

      try {
        const url = await uploadImage(file);
        setImageUrl(url);
        setIsLoading(false);
        onSuccess?.(url);
        return url;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("이미지 업로드 중 오류가 발생했습니다.");

        setError(error.message);
        setIsLoading(false);
        onError?.(error);
        throw error;
      }
    },
    [maxSizeMB, onSuccess, onError]
  );

  const resetImage = useCallback(() => {
    setImageUrl("");
    setError(null);
  }, []);

  return {
    imageUrl,
    isLoading,
    error,
    uploadImage: handleUpload,
    resetImage,
  };
};

export default useImageUpload;
