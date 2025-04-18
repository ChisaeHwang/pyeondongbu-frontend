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
    <AuthProvider>
      <Router>
        <AnalyticsWrapper>
          <ScrollToTop />
          <div className="min-h-screen bg-[#1a1b1e] flex flex-col">
            <Header />
            <main className="flex-grow pb-16">
              <Routes>
                <Route path="/" element={<JobListPage />} />
                <Route path="/jobs" element={<JobListPage />} />
                <Route path="/jobs/:id" element={<JobDetailPage />} />
                <Route path="/hire" element={<HirePage />} />
                <Route path="/hire/posts/:id" element={<HireDetailPage />} />
                <Route path="/recruit" element={<RecruitPage />} />
                <Route
                  path="/recruit/posts/:id"
                  element={<RecruitDetailPage />}
                />
                <Route path="/community" element={<CommunityPage />} />
                <Route
                  path="/community/posts/:id"
                  element={<CommunityDetailPage />}
                />
                <Route path="/create" element={<CreatePostPage />} />
                <Route path="/edit/hire/:id" element={<EditPostPage />} />
                <Route path="/edit/recruit/:id" element={<EditPostPage />} />
                <Route path="/edit/community/:id" element={<EditPostPage />} />
                <Route path="/edit/:id" element={<EditPostPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/my-posts" element={<MyPostsPage />} />
                <Route path="/notices" element={<NoticeListPage />} />
                <Route path="/notices/:id" element={<NoticeDetailPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#313338",
                color: "#fff",
                border: "1px solid #404249",
              },
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </AnalyticsWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
