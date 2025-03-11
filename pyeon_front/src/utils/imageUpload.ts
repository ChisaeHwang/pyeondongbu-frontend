import axiosInstance from "./axios";
import axios from "axios";

/**
 * Presigned URL을 사용하여 이미지를 업로드하는 함수
 *
 * @param file 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // 1. Presigned URL 요청
    const presignedUrlResponse = await axiosInstance.post(
      "/api/images/presigned-url",
      null,
      {
        headers: {
          "Content-Type": file.type,
        },
      }
    );

    const { preSignedUrl, fileName } = presignedUrlResponse.data;

    // 2. S3에 직접 업로드 (기본 axios 사용, Authorization 헤더 없이)
    await axios.put(preSignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    // 3. 이미지 URL 생성 및 반환
    return `https://pyeon.s3.ap-northeast-2.amazonaws.com/images/${fileName}`;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    throw error;
  }
};

/**
 * 이미지 파일 유효성 검사 함수
 *
 * @param file 검사할 파일
 * @param maxSizeMB 최대 파일 크기 (MB)
 * @returns 유효성 검사 결과 및 오류 메시지
 */
export const validateImageFile = (
  file: File,
  maxSizeMB: number = 10
): { isValid: boolean; message?: string } => {
  // 파일 타입 검사
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      message:
        "지원하지 않는 이미지 형식입니다. JPEG, PNG, GIF, WebP 형식만 지원합니다.",
    };
  }

  // 파일 크기 검사 (MB 단위)
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > maxSizeMB) {
    return {
      isValid: false,
      message: `이미지 크기가 너무 큽니다. 최대 ${maxSizeMB}MB까지 업로드 가능합니다.`,
    };
  }

  return { isValid: true };
};

/**
 * 이미지 업로드를 위한 함수
 *
 * @param file 업로드할 이미지 파일
 * @param onSuccess 업로드 성공 시 콜백
 * @param onError 업로드 실패 시 콜백
 * @param maxSizeMB 최대 파일 크기 (MB)
 */
export const handleImageUpload = async (
  file: File,
  onSuccess: (imageUrl: string) => void,
  onError: (error: Error) => void,
  maxSizeMB: number = 10
): Promise<void> => {
  try {
    // 파일 유효성 검사
    const validation = validateImageFile(file, maxSizeMB);
    if (!validation.isValid && validation.message) {
      throw new Error(validation.message);
    }

    // 이미지 업로드
    const imageUrl = await uploadImage(file);
    onSuccess(imageUrl);
  } catch (error) {
    onError(
      error instanceof Error
        ? error
        : new Error("이미지 업로드 중 오류가 발생했습니다.")
    );
  }
};
