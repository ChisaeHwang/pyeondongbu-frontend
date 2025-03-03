import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useAuth } from "../../contexts/AuthContext";
import TextEditor from "../../components/editor/TextEditor";
import CategorySelector from "../../components/editor/CategorySelector";
import {
  SUB_CATEGORIES,
  CATEGORY_COLORS,
  convertMainCategoryToEnum,
  convertSubCategoryToEnum,
  getPageTitle,
} from "../../utils/categoryUtils";
import { ExceptionResponse, PostFormData } from "../../types/post";

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // URL에서 초기 카테고리 가져오기 (예: /create?category=구인)
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get("category") || "커뮤니티";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainCategory, setMainCategory] = useState(initialCategory);
  const [subCategory, setSubCategory] = useState(
    SUB_CATEGORIES[initialCategory][0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // 로그인 체크
  useEffect(() => {
    if (!isAuthenticated) {
      setError("로그인이 필요합니다. 3초 후 로그인 페이지로 이동합니다.");
      setRedirectToLogin(true);

      const timer = setTimeout(() => {
        navigate("/login", {
          state: { from: location.pathname + location.search },
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate, location]);

  // 메인 카테고리 변경 시 서브 카테고리 초기화
  useEffect(() => {
    setSubCategory(SUB_CATEGORIES[mainCategory][0]);
  }, [mainCategory]);

  // 게시글 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("로그인이 필요합니다.");
      setRedirectToLogin(true);
      return;
    }

    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 백엔드 API 엔드포인트는 하나로 통일
      const endpoint = "/api/posts";

      const postData: PostFormData = {
        title,
        content,
        mainCategory: convertMainCategoryToEnum(mainCategory),
        subCategory: convertSubCategoryToEnum(mainCategory, subCategory),
      };

      await axiosInstance.post(endpoint, postData);

      // 성공 시 해당 카테고리 페이지로 이동
      if (mainCategory === "구인") {
        navigate("/hire");
      } else if (mainCategory === "구직") {
        navigate("/recruit");
      } else {
        navigate("/community");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ExceptionResponse>;
        if (axiosError.response) {
          if (axiosError.response.status === 401) {
            setError("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.");
            setRedirectToLogin(true);
          } else {
            setError(
              axiosError.response.data?.message ||
                "게시글 작성 중 오류가 발생했습니다."
            );
          }
        } else {
          setError("서버와의 통신 중 오류가 발생했습니다.");
        }
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="bg-[#25262b] rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          {getPageTitle(mainCategory)}
        </h1>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!redirectToLogin && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 제목 입력 */}
            <div>
              <input
                type="text"
                placeholder="제목을 입력하세요 (최대 50자)"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 50))}
                className="w-full bg-[#313338] text-white border border-[#404249] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                maxLength={50}
              />
              <div className="text-right text-gray-400 text-sm mt-1">
                {title.length}/50
              </div>
            </div>

            {/* 카테고리 선택 */}
            <CategorySelector
              mainCategory={mainCategory}
              subCategory={subCategory}
              setMainCategory={setMainCategory}
              setSubCategory={setSubCategory}
            />

            {/* 텍스트 에디터 */}
            <TextEditor
              content={content}
              setContent={setContent}
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
              setError={setError}
            />

            {/* 버튼 */}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (mainCategory === "구인") {
                    navigate("/hire");
                  } else if (mainCategory === "구직") {
                    navigate("/recruit");
                  } else {
                    navigate("/community");
                  }
                }}
                className="px-4 py-2 bg-[#313338] text-gray-300 rounded-md hover:bg-[#383A40] transition-colors text-sm"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 ${
                  CATEGORY_COLORS[mainCategory as keyof typeof CATEGORY_COLORS]
                    .main
                } text-white rounded-md ${
                  CATEGORY_COLORS[mainCategory as keyof typeof CATEGORY_COLORS]
                    .hover
                } transition-colors text-sm ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "게시 중..." : "게시하기"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreatePostPage;
