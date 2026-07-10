import { Routes, Route } from "react-router-dom";
import VisitorTracker from "./components/VisitorTracker";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Solutions from "./pages/Solutions";
import Contact from "./pages/Contact";

// Admin Pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Leads from "./pages/admin/Leads";

// Admin Components
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  return (
    <>
      <VisitorTracker />
      <Routes>
        {/* Public */}

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/industries" element={<Industries />} />

        <Route path="/solutions" element={<Solutions />} />

        <Route path="/contact" element={<Contact />} />

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
