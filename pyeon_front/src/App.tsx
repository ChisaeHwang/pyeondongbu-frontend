import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobListPage from "./pages/jobs/JobListPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import NoticeListPage from "./pages/notices/NoticeListPage";
import NoticeDetailPage from "./pages/notices/NoticeDetailPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NotFoundPage from "./pages/legal/NotFoundPage";
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import ContactPage from "./pages/legal/ContactPage";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#1a1b1e] flex flex-col">
        <Header onSearch={handleSearch} />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
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
    </Router>
  );
}

export default App;
