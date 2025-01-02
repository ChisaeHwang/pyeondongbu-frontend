import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/layout/Header";
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <AnalyticsWrapper>
        <ScrollToTop />
        <div className="min-h-screen bg-[#1a1b1e] flex flex-col">
          <Header onSearch={handleSearch} />
          <main className="flex-grow pb-16">
            <Routes>
              <Route
                path="/"
                element={<JobListPage searchQuery={searchQuery} />}
              />
              <Route
                path="/jobs"
                element={<JobListPage searchQuery={searchQuery} />}
              />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              <Route path="/notices" element={<NoticeListPage />} />
              <Route path="/notices/:id" element={<NoticeDetailPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AnalyticsWrapper>
    </Router>
  );
}

export default App;
