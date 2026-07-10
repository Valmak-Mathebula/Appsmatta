import { Link, Outlet } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaProjectDiagram,
  FaFileInvoiceDollar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}

      <div
        className="bg-dark text-white"
        style={{
          width: "270px",
          minHeight: "100vh",
        }}
      >
        <div className="p-4 border-bottom border-secondary">
          <h3 className="fw-bold mb-0">AppsMatta</h3>

          <small className="text-light">Admin Portal</small>
        </div>

        <div className="p-3">
          <Link
            to="/admin/dashboard"
            className="btn btn-dark w-100 text-start mb-2"
          >
            <FaChartPie className="me-2" />
            Dashboard
          </Link>

          <Link
            to="/admin/leads"
            className="btn btn-dark w-100 text-start mb-2"
          >
            <FaUsers className="me-2" />
            Leads
          </Link>

          <Link
            to="/admin/projects"
            className="btn btn-dark w-100 text-start mb-2"
          >
            <FaProjectDiagram className="me-2" />
            Projects
          </Link>

          <Link
            to="/admin/quotes"
            className="btn btn-dark w-100 text-start mb-2"
          >
            <FaFileInvoiceDollar className="me-2" />
            Quotations
          </Link>

          <Link
            to="/admin/settings"
            className="btn btn-dark w-100 text-start mb-2"
          >
            <FaCog className="me-2" />
            Settings
          </Link>
        </div>

        <div
          className="p-3"
          style={{
            position: "absolute",
            bottom: 0,
            width: "270px",
          }}
        >
          <button
            className="btn btn-outline-light w-100"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main */}

      <div
        className="flex-grow-1"
        style={{
          background: "#f4f7fb",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
