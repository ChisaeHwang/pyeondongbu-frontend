import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import JobListPage from "./pages/jobs/JobListPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import NoticeListPage from "./pages/notices/NoticeListPage";
import NoticeDetailPage from "./pages/notices/NoticeDetailPage";
import NotFoundPage from "./pages/legal/NotFoundPage";
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import ContactPage from "./pages/legal/ContactPage";
import { initGA, logPageView } from "./utils/analytics";
import { AuthCallback } from "./pages/auth/AuthCallback";
import { AuthProvider } from "./contexts/AuthContext";
import RecruitPage from "./pages/recruit/RecruitPage";
import CommunityPage from "./pages/community/CommunityPage";
import CreatePostPage from "./pages/common/CreatePostPage";
import HirePage from "./pages/hire/HirePage";
import HireDetailPage from "./pages/hire/HireDetailPage";
import RecruitDetailPage from "./pages/recruit/RecruitDetailPage";
import CommunityDetailPage from "./pages/community/CommunityDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import ProfilePage from "./pages/user/ProfilePage";
import MyPostsPage from "./pages/user/MyPostsPage";
import EditPostPage from "./pages/common/EditPostPage";
import PageLayout from "./components/layout/PageLayout";

// Analytics wrapper component
const AnalyticsWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);

  return <>{children}</>;
};

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-[#1a1b1e]">
      <main className="flex flex-col items-center text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            서비스가 종료되었습니다
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8 rounded"></div>
        </div>

        <div className="space-y-6 text-lg sm:text-xl text-white/80">
          <p>
            그동안 저희 서비스를 이용해 주셔서 진심으로 감사드립니다.
          </p>
          <p>
            여러분의 관심과 사랑 덕분에 좋은 추억을 만들 수 있었습니다.
          </p>
          <p className="pt-4 text-base sm:text-lg text-white/60">
            더 나은 모습으로 다시 찾아뵐 수 있기를 바랍니다.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 w-full">
          <p className="text-sm text-white/50">
            문의사항이 있으시면 언제든지 연락 주시기 바랍니다.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
