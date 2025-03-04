import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useAuth } from "../../contexts/AuthContext";
import TextEditor from "../../components/editor/TextEditor";
import CategorySelector from "../../components/editor/CategorySelector";
import toast from "react-hot-toast";
import {
  SUB_CATEGORIES,
  CATEGORY_COLORS,
  convertMainCategoryToEnum,
  convertSubCategoryToEnum,
  convertEnumToMainCategory,
  convertEnumToSubCategory,
  getPageTitle,
} from "../../utils/categoryUtils";
import {
  ExceptionResponse,
  PostResponse,
  PostFormData,
} from "../../types/post";

const EditPostPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL 경로에서 id 파라미터 가져오기 (예: /edit/3, /edit/hire/3 등에서 3을 추출)
  const params = useParams<{ id: string }>();
  const postId = params.id;

  const { isAuthenticated, user } = useAuth();

  // URL 경로 분석
  const path = location.pathname;

  // 경로 패턴 확인
  const isHirePath = path.includes("/edit/hire/");
  const isRecruitPath = path.includes("/edit/recruit/");
  const isCommunityPath = path.includes("/edit/community/");

  // 카테고리 결정
  let initialCategory = "COMMUNITY"; // 기본값

  if (isHirePath) {
    initialCategory = "RECRUITMENT";
  } else if (isRecruitPath) {
    initialCategory = "JOB_SEEKING";
  } else if (isCommunityPath) {
    initialCategory = "COMMUNITY";
  } else {
    // 기존 방식 유지 (쿼리 파라미터에서 카테고리 가져오기)
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      initialCategory = categoryParam;
    }
  }

  // 디버깅을 위한 로그
  useEffect(() => {
    console.log("EditPostPage 초기화:", {
      postId,
      path,
      initialCategory,
      isHirePath,
      isRecruitPath,
      isCommunityPath,
    });
  }, [
    postId,
    path,
    initialCategory,
    isHirePath,
    isRecruitPath,
    isCommunityPath,
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainCategory, setMainCategory] = useState(
    convertEnumToMainCategory(initialCategory)
  );
  const [subCategory, setSubCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [originalPost, setOriginalPost] = useState<PostResponse | null>(null);

  // 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        console.error("게시글 ID를 찾을 수 없습니다.");
        toast.error("게시글 ID를 찾을 수 없습니다.");
        return;
      }

      try {
        setIsLoading(true);

        // 백엔드 API 호출
        const response = await axiosInstance.get<PostResponse>(
          `/api/posts/${postId}`
        );

        setOriginalPost(response.data);

        // 폼 데이터 설정
        setTitle(response.data.title);
        setContent(response.data.content);

        const mainCat = convertEnumToMainCategory(response.data.mainCategory);
        setMainCategory(mainCat);

        const subCat = convertEnumToSubCategory(
          mainCat,
          response.data.subCategory
        );
        setSubCategory(subCat);

        // 이미지 URL 추출 (마크다운 형식: ![이미지](URL))
        const imageRegex = /!\[.*?\]\((.*?)\)/g;
        const images: string[] = [];
        let match;

        while ((match = imageRegex.exec(response.data.content)) !== null) {
          if (match[1]) {
            images.push(match[1]);
          }
        }

        setUploadedImages(images);

        // 작성자 또는 어드민 확인
        if (
          user?.email !== response.data.memberEmail &&
          user?.authority !== "ROLE_ADMIN"
        ) {
          toast.error("게시글 작성자 또는 관리자만 수정할 수 있습니다.");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        }
      } catch (error) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
        toast.error("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, user?.email, user?.authority, navigate]);

  // 로그인 체크
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("로그인이 필요합니다. 3초 후 로그인 페이지로 이동합니다.");
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
    if (SUB_CATEGORIES[mainCategory]) {
      setSubCategory(SUB_CATEGORIES[mainCategory][0]);
    }
  }, [mainCategory]);

  // 게시글 수정 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("로그인이 필요합니다.");
      setRedirectToLogin(true);
      return;
    }

    if (!postId) {
      console.error("게시글 ID를 찾을 수 없습니다.");
      toast.error("게시글 ID를 찾을 수 없습니다.");
      return;
    }

    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 백엔드 API 엔드포인트
      const endpoint = `/api/posts/${postId}`;

      const postData: PostFormData = {
        title,
        content,
        mainCategory: convertMainCategoryToEnum(mainCategory),
        subCategory: convertSubCategoryToEnum(mainCategory, subCategory),
      };

      // PUT 요청으로 게시글 수정
      const response = await axiosInstance.put(endpoint, postData);
      console.log("게시글 수정 성공:", response.data);

      // 성공 메시지 표시
      toast.success("게시글이 성공적으로 수정되었습니다.");

      // 성공 시 해당 게시글 상세 페이지로 이동
      const mainCategoryEnum = convertMainCategoryToEnum(mainCategory);

      if (mainCategoryEnum === "RECRUITMENT") {
        navigate(`/hire/posts/${postId}`);
      } else if (mainCategoryEnum === "JOB_SEEKING") {
        navigate(`/recruit/posts/${postId}`);
      } else {
        navigate(`/community/posts/${postId}`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ExceptionResponse>;
        if (axiosError.response) {
          if (axiosError.response.status === 401) {
            toast.error("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.");
            setRedirectToLogin(true);
          } else {
            toast.error(
              axiosError.response.data?.message ||
                "게시글 수정 중 오류가 발생했습니다."
            );
          }
        } else {
          toast.error("서버와의 통신 중 오류가 발생했습니다.");
        }
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="bg-[#25262b] rounded-lg p-6">
          <div className="text-center text-gray-400 py-12">
            게시글을 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="bg-[#25262b] rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          {getPageTitle(mainCategory, true)}
        </h1>

        {!redirectToLogin && originalPost && (
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
            />

            {/* 버튼 */}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  navigate(-1); // 이전 페이지로 돌아가기
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
                {isSubmitting ? "수정 중..." : "수정하기"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPostPage;
