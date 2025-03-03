// 카테고리 정의
export const MAIN_CATEGORIES = ["구인", "구직", "커뮤니티"];

// 서브 카테고리 정의
export const SUB_CATEGORIES: Record<string, string[]> = {
  구인: ["편집자", "썸네일러", "기타"],
  구직: ["편집자", "썸네일러", "기타"],
  커뮤니티: ["전체", "자유", "질문", "정보"],
};

// 카테고리별 색상 정의
export const CATEGORY_COLORS = {
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

// 메인 카테고리를 백엔드 enum 형식으로 변환
export const convertMainCategoryToEnum = (category: string) => {
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
export const convertSubCategoryToEnum = (
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

// 백엔드 enum을 프론트엔드 카테고리로 변환
export const convertEnumToMainCategory = (category: string): string => {
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
};

// 백엔드 enum을 프론트엔드 서브 카테고리로 변환
export const convertEnumToSubCategory = (
  mainCategory: string,
  subCategory: string
): string => {
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
};

// 현재 메인 카테고리의 색상 가져오기
export const getMainCategoryColor = (cat: string, mainCategory: string) => {
  return cat === mainCategory
    ? CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS].main
    : "bg-[#313338]";
};

// 현재 메인 카테고리의 호버 색상 가져오기
export const getMainCategoryHoverColor = (
  cat: string,
  mainCategory: string
) => {
  return cat === mainCategory
    ? CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS].hover
    : "hover:bg-[#383A40]";
};

// 현재 메인 카테고리의 텍스트 색상 가져오기
export const getMainCategoryTextColor = (cat: string, mainCategory: string) => {
  return cat === mainCategory
    ? "text-white"
    : CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS].text;
};

// 현재 서브 카테고리의 색상 가져오기
export const getSubCategoryColor = (cat: string, subCategory: string) => {
  return cat === subCategory ? "bg-gray-600" : "bg-[#313338]";
};

// 현재 서브 카테고리의 호버 색상 가져오기
export const getSubCategoryHoverColor = (cat: string, subCategory: string) => {
  return cat === subCategory ? "hover:bg-gray-700" : "hover:bg-[#383A40]";
};

// 현재 서브 카테고리의 텍스트 색상 가져오기
export const getSubCategoryTextColor = (cat: string, subCategory: string) => {
  return cat === subCategory ? "text-white" : "text-gray-300/90";
};

// 페이지 타이틀 결정
export const getPageTitle = (mainCategory: string, isEdit: boolean = false) => {
  const prefix = isEdit ? "수정" : "글쓰기";

  switch (mainCategory) {
    case "구인":
      return `구인 ${prefix}`;
    case "구직":
      return `구직 ${prefix}`;
    default:
      return `커뮤니티 ${prefix}`;
  }
};
