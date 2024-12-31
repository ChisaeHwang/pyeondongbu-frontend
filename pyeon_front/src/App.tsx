import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobListPage from "./pages/jobs/JobListPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import NoticeListPage from "./pages/notices/NoticeListPage";
import NoticeDetailPage from "./pages/notices/NoticeDetailPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
