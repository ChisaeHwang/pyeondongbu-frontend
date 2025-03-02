import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaCamera } from "react-icons/fa";
import axiosInstance from "../../utils/axios";

const ProfilePage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState(user?.nickname || "");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user?.profileImageUrl || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 프로필 이미지 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("이미지 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 이미지 파일 타입 확인
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드 가능합니다.");
      return;
    }

    setProfileImage(file);
    setError(null);

    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 프로필 수정 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // 프로필 이미지가 있다면 먼저 업로드
      let newProfileImageUrl = user?.profileImageUrl;
      if (profileImage) {
        const formData = new FormData();
        formData.append("image", profileImage);

        const imageResponse = await axiosInstance.post(
          "/api/images",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        newProfileImageUrl = imageResponse.data.imageUrl;
      }

      // 프로필 정보 업데이트
      await axiosInstance.put("/api/members/me", {
        nickname,
        profileImageUrl: newProfileImageUrl,
      });

      // 사용자 정보 새로고침
      await refreshUser();

      // 성공 메시지 표시
      alert("프로필이 성공적으로 업데이트되었습니다.");

      // 홈으로 리다이렉트
      navigate("/", { replace: true });
    } catch (error) {
      console.error("프로필 업데이트 중 오류가 발생했습니다:", error);
      setError("프로필 업데이트 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center text-gray-400 py-12">
          로그인이 필요합니다.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-[#25262b] rounded-lg p-6 border border-[#2c2d32]">
        <h1 className="text-2xl font-bold text-white mb-6">프로필 수정</h1>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 프로필 이미지 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div
                className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="프로필 미리보기"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-4xl">?</span>
                )}
                <div className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2">
                  <FaCamera className="text-white text-sm" />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              클릭하여 프로필 이미지 변경
            </p>
          </div>

          {/* 닉네임 입력 */}
          <div>
            <label
              htmlFor="nickname"
              className="block text-gray-300 font-medium mb-2"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-[#313338] text-white border border-[#404249] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="닉네임을 입력하세요"
            />
          </div>

          {/* 이메일 (수정 불가) */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 font-medium mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              disabled
              className="w-full bg-[#313338] text-gray-400 border border-[#404249] rounded-md px-4 py-2 cursor-not-allowed"
            />
            <p className="text-gray-500 text-sm mt-1">
              이메일은 변경할 수 없습니다
            </p>
          </div>

          {/* 제출 버튼 */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "저장 중..." : "변경사항 저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
