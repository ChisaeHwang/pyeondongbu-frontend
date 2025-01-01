import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Lazy loading for routes
const JobListPage = React.lazy(() => import("./pages/jobs/JobListPage"));
const JobDetailPage = React.lazy(() => import("./pages/jobs/JobDetailPage"));
const NoticeListPage = React.lazy(
  () => import("./pages/notices/NoticeListPage")
);
const NoticeDetailPage = React.lazy(
  () => import("./pages/notices/NoticeDetailPage")
);
const NotFoundPage = React.lazy(() => import("./pages/legal/NotFoundPage"));
const TermsPage = React.lazy(() => import("./pages/legal/TermsPage"));
const PrivacyPage = React.lazy(() => import("./pages/legal/PrivacyPage"));
const ContactPage = React.lazy(() => import("./pages/legal/ContactPage"));

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#1a1b1e] flex flex-col">
        <Header onSearch={handleSearch} />
        <main className="flex-grow pb-16">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-[50vh]">
                <LoadingSpinner />
              </div>
            }
          >
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
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
