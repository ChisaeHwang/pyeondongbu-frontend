import React, { useState, useEffect, useRef } from "react";
import { AxiosError } from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useAuth } from "../../contexts/AuthContext";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaHeading,
  FaImage,
  FaLink,
} from "react-icons/fa";

interface ExceptionResponse {
  status: number;
  message: string;
}

interface PostResponse {
  id: number;
  title: string;
  content: string;
  memberEmail: string;
  memberNickname: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
  mainCategory: string;
  subCategory: string;
  comments: any[];
  hasLiked: boolean;
}

// 카테고리 정의
const MAIN_CATEGORIES = ["구인", "구직", "커뮤니티"];

// 서브 카테고리 정의
const SUB_CATEGORIES: Record<string, string[]> = {
  구인: ["편집자", "썸네일러", "기타"],
  구직: ["편집자", "썸네일러", "기타"],
  커뮤니티: ["전체", "자유", "질문", "정보"],
};

// 카테고리별 색상 정의
const CATEGORY_COLORS = {
  구인: {
    main: "bg-cyan-600",
    hover: "bg-cyan-700",
    text: "text-cyan-300/90",
  },
  구직: {
    main: "bg-fuchsia-600",
    hover: "bg-fuchsia-700",
    text: "text-fuchsia-300/90",
  },
  커뮤니티: {
    main: "bg-purple-600",
    hover: "bg-purple-700",
    text: "text-purple-300/90",
  },
};

const MAX_IMAGES = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const EditPostPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL 경로에서 id 파라미터 가져오기 (예: /edit/3, /edit/hire/3 등에서 3을 추출)
  const params = useParams<{ id: string }>();
  const postId = params.id;

  const { isAuthenticated, user } = useAuth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  const [error, setError] = useState<string | null>(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [originalPost, setOriginalPost] = useState<PostResponse | null>(null);

  // 백엔드 enum을 프론트엔드 카테고리로 변환
  function convertEnumToMainCategory(category: string): string {
    switch (category) {
      case "RECRUITMENT":
        return "구인";
      case "JOB_SEEKING":
        return "구직";
      case "COMMUNITY":
        return "커뮤니티";
      default:
        return "커뮤니티";
    }
  }

  // 백엔드 enum을 프론트엔드 서브 카테고리로 변환
  function convertEnumToSubCategory(
    mainCategory: string,
    subCategory: string
  ): string {
    if (mainCategory === "구인" || mainCategory === "구직") {
      switch (subCategory) {
        case "EDITOR":
          return "편집자";
        case "THUMBNAILER":
          return "썸네일러";
        case "OTHER":
          return "기타";
        default:
          return "기타";
      }
    } else {
      // 커뮤니티
      switch (subCategory) {
        case "FREE":
          return "자유";
        case "QUESTION":
          return "질문";
        case "INFORMATION":
          return "정보";
        case "ALL":
          return "전체";
        default:
          return "자유";
      }
    }
  }

  // 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        console.error("게시글 ID를 찾을 수 없습니다.");
        setError("게시글 ID를 찾을 수 없습니다.");
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

        // 작성자 확인
        if (user?.email !== response.data.memberEmail) {
          setError("게시글 작성자만 수정할 수 있습니다.");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        }
      } catch (error) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, user?.email, navigate]);

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
    if (SUB_CATEGORIES[mainCategory]) {
      setSubCategory(SUB_CATEGORIES[mainCategory][0]);
    }
  }, [mainCategory]);

  // 텍스트 서식 적용 함수
  const applyFormat = (format: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let formattedText = "";
    let cursorPosition = 0;

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        cursorPosition = start + 2;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        cursorPosition = start + 1;
        break;
      case "underline":
        formattedText = `<u>${selectedText}</u>`;
        cursorPosition = start + 3;
        break;
      case "heading":
        formattedText = `\n# ${selectedText}\n`;
        cursorPosition = start + 3;
        break;
      case "ul":
        formattedText = `\n- ${selectedText}`;
        cursorPosition = start + 3;
        break;
      case "ol":
        formattedText = `\n1. ${selectedText}`;
        cursorPosition = start + 4;
        break;
      case "link":
        const url = prompt("링크 URL을 입력하세요:", "https://");
        if (url) {
          formattedText = `[${selectedText || "링크"}](${url})`;
          cursorPosition = start + 1;
        }
        break;
      default:
        return;
    }

    if (formattedText) {
      const newContent =
        content.substring(0, start) + formattedText + content.substring(end);
      setContent(newContent);

      // 선택된 텍스트가 있었다면 포맷 적용 후 선택 상태 유지
      setTimeout(() => {
        textarea.focus();
        if (selectedText) {
          textarea.setSelectionRange(start, start + formattedText.length);
        } else {
          textarea.setSelectionRange(
            start + cursorPosition,
            start + cursorPosition
          );
        }
      }, 0);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // 이미지 개수 제한 확인
    if (uploadedImages.length >= MAX_IMAGES) {
      setError(`이미지는 최대 ${MAX_IMAGES}장까지만 업로드할 수 있습니다.`);
      return;
    }

    const file = files[0];

    // 파일 크기 확인
    if (file.size > MAX_IMAGE_SIZE) {
      setError(`이미지 크기는 최대 5MB까지 가능합니다.`);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosInstance.post("/api/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.imageUrl;

      // 이미지 URL 저장
      setUploadedImages((prev) => [...prev, imageUrl]);

      // 이미지 URL을 텍스트 영역에 추가
      setContent((prev) => prev + `\n![이미지](${imageUrl})\n`);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      setError("이미지 업로드에 실패했습니다.");
    }
  };

  // 메인 카테고리를 백엔드 enum 형식으로 변환
  const convertMainCategoryToEnum = (category: string) => {
    switch (category) {
      case "구인":
        return "RECRUITMENT";
      case "구직":
        return "JOB_SEEKING";
      case "커뮤니티":
        return "COMMUNITY";
      default:
        return "COMMUNITY";
    }
  };

  // 서브 카테고리를 백엔드 enum 형식으로 변환
  const convertSubCategoryToEnum = (
    mainCategory: string,
    subCategory: string
  ) => {
    if (mainCategory === "구인" || mainCategory === "구직") {
      switch (subCategory) {
        case "편집자":
          return "EDITOR";
        case "썸네일러":
          return "THUMBNAILER";
        case "기타":
          return "OTHER";
        default:
          return "OTHER";
      }
    } else {
      // 커뮤니티
      switch (subCategory) {
        case "자유":
          return "FREE";
        case "질문":
          return "QUESTION";
        case "정보":
          return "INFORMATION";
        case "전체":
          return "ALL";
        default:
          return "FREE";
      }
    }
  };

  // 게시글 수정 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("로그인이 필요합니다.");
      setRedirectToLogin(true);
      return;
    }

    if (!postId) {
      console.error("게시글 ID를 찾을 수 없습니다.");
      setError("게시글 ID를 찾을 수 없습니다.");
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
      // 백엔드 API 엔드포인트
      const endpoint = `/api/posts/${postId}`;

      const postData = {
        title,
        content,
        mainCategory: convertMainCategoryToEnum(mainCategory),
        subCategory: convertSubCategoryToEnum(mainCategory, subCategory),
      };

      // PUT 요청으로 게시글 수정
      const response = await axiosInstance.put(endpoint, postData);
      console.log("게시글 수정 성공:", response.data);

      // 성공 메시지 표시
      alert("게시글이 성공적으로 수정되었습니다.");

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
            setError("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.");
            setRedirectToLogin(true);
          } else {
            setError(
              axiosError.response.data?.message ||
                "게시글 수정 중 오류가 발생했습니다."
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

  // 현재 메인 카테고리의 색상 가져오기
  const getMainCategoryColor = (cat: string) => {
    return cat === mainCategory
      ? CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS].main
      : "bg-[#313338]";
  };

  // 현재 메인 카테고리의 호버 색상 가져오기
  const getMainCategoryHoverColor = (cat: string) => {
    return cat === mainCategory
      ? CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS].hover
      : "hover:bg-[#383A40]";
  };

  // 현재 메인 카테고리의 텍스트 색상 가져오기
  const getMainCategoryTextColor = (cat: string) => {
    return cat === mainCategory
      ? "text-white"
      : CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS].text;
  };

  // 현재 서브 카테고리의 색상 가져오기
  const getSubCategoryColor = (cat: string) => {
    return cat === subCategory ? "bg-gray-600" : "bg-[#313338]";
  };

  // 현재 서브 카테고리의 호버 색상 가져오기
  const getSubCategoryHoverColor = (cat: string) => {
    return cat === subCategory ? "hover:bg-gray-700" : "hover:bg-[#383A40]";
  };

  // 현재 서브 카테고리의 텍스트 색상 가져오기
  const getSubCategoryTextColor = (cat: string) => {
    return cat === subCategory ? "text-white" : "text-gray-300/90";
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
        <h1 className="text-2xl font-bold text-white mb-6">게시글 수정</h1>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

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
            <div className="space-y-4">
              <div>
                <h3 className="text-gray-400 text-sm mb-3">메인 카테고리</h3>
                <div className="flex flex-wrap gap-2">
                  {MAIN_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setMainCategory(cat)}
                      className={`px-4 py-2 text-sm rounded-md transition-colors min-h-[36px] active:translate-y-[1px] ${getMainCategoryColor(
                        cat
                      )} ${getMainCategoryHoverColor(
                        cat
                      )} ${getMainCategoryTextColor(cat)}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm mb-3">서브 카테고리</h3>
                <div className="flex flex-wrap gap-2">
                  {SUB_CATEGORIES[mainCategory].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSubCategory(cat)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors min-h-[32px] active:translate-y-[1px] ${getSubCategoryColor(
                        cat
                      )} ${getSubCategoryHoverColor(
                        cat
                      )} ${getSubCategoryTextColor(cat)}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 간단한 텍스트 에디터 */}
            <div>
              <h3 className="text-gray-400 text-sm mb-3">내용</h3>

              {/* 서식 도구 모음 */}
              <div className="bg-[#2c2d32] p-2 rounded-t-md flex flex-wrap gap-1 border-b border-[#404249]">
                <button
                  type="button"
                  className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
                  onClick={() => applyFormat("bold")}
                  title="굵게"
                >
                  <FaBold />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
                  onClick={() => applyFormat("italic")}
                  title="기울임"
                >
                  <FaItalic />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
                  onClick={() => applyFormat("underline")}
                  title="밑줄"
                >
                  <FaUnderline />
                </button>
                <div className="h-5 w-px bg-gray-600 mx-1"></div>
                <button
                  type="button"
                  className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
                  onClick={() => applyFormat("heading")}
                  title="제목"
                >
                  <FaHeading />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
                  onClick={() => applyFormat("ul")}
                  title="글머리 기호"
                >
                  <FaListUl />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
                  onClick={() => applyFormat("ol")}
                  title="번호 매기기"
                >
                  <FaListOl />
                </button>
                <div className="h-5 w-px bg-gray-600 mx-1"></div>
                <button
                  type="button"
                  className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
                  onClick={() => applyFormat("link")}
                  title="링크"
                >
                  <FaLink />
                </button>
                <label
                  htmlFor="image-upload"
                  className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded cursor-pointer"
                  title="이미지"
                >
                  <FaImage />
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                <div className="ml-auto text-xs text-gray-400 flex items-center">
                  이미지: {uploadedImages.length}/{MAX_IMAGES}
                </div>
              </div>

              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요..."
                className="w-full bg-[#313338] text-white border border-[#404249] border-t-0 rounded-b-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[300px]"
              />
              <div className="text-xs text-gray-400 mt-2 space-y-1">
                <p>
                  * 이미지는 최대 5장까지, 각 5MB 이하로 업로드할 수 있습니다.
                </p>
                <p>
                  * 영상은 유튜브 일부공개 또는 유튜브 링크를 사용해 주세요.
                </p>
                <p>
                  * 서식: 굵게(**텍스트**), 기울임(*텍스트*), 제목(# 텍스트),
                  링크([텍스트](URL))
                </p>
              </div>
            </div>

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
