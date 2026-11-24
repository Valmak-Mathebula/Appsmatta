import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import VisitorTracker from "./components/VisitorTracker";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Solutions from "./pages/Solutions";
import Contact from "./pages/Contact";
import WebDevelopment from "./pages/WebDevelopment";
import WhatsAppButton from "./components/WhatsAppButton";
import AssessmentPortal from "./pages/AssessmentPortal";

// Admin Pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Leads from "./pages/admin/Leads";
import Visitors from "./pages/admin/Visitors";

// Admin Components
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Scrolls to #sample, #pricing etc. when navigating between pages
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToHash />
      <VisitorTracker />
      <Routes>
        {/* Public */}

        <Route path="/" element={<Home />} />

        <Route path="/web-development" element={<WebDevelopment />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/industries" element={<Industries />} />

        <Route path="/solutions" element={<Solutions />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/assessment" element={<AssessmentPortal />} />

        {/* Login */}

        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="leads" element={<Leads />} />

          <Route path="visitors" element={<Visitors />} />
        </Route>
      </Routes>

      <WhatsAppButton />
    </>
  );
}

export default App;
