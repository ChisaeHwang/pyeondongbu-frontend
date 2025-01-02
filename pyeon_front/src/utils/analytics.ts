import ReactGA from "react-ga4";

// 초기화
export const initGA = () => {
  ReactGA.initialize("G-91MFTB4Y4T");
};

// 페이지 뷰 추적
export const logPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// 사용자 이벤트 추적
export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category, // 예: 'Job'
    action, // 예: 'Click'
    label, // 예: '구인글 제목'
  });
};

// 예시: 구인글 클릭 추적
export const trackJobClick = (jobTitle: string) => {
  logEvent("Job", "Click", jobTitle);
};

// 예시: 검색 추적
export const trackSearch = (searchTerm: string) => {
  logEvent("Search", "Query", searchTerm);
};
