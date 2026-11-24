import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center text-decoration-none"
          to="/"
        >
          <img src={logo} alt="AppsMatta" height="55" className="me-3" />

          <div>
            <h4 className="mb-0 fw-bold text-dark">AppsMatta</h4>
            <small className="text-muted">Digital Transformation</small>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-bold text-primary" to="/web-development">
                Web Development
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-bold text-success" to="/services">
                Excel Transformation
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.preventDefault()}
              >
                Services
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/web-development">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/services">
                    Excel Transformation
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            {/* Admin Button */}

            <li className="nav-item ms-lg-3">
              <button
                className="btn btn-outline-dark px-4 me-lg-2 mb-2 mb-lg-0"
                onClick={() => {
                  if (user) {
                    navigate("/admin/dashboard");
                  } else {
                    navigate("/admin/login");
                  }
                }}
              >
                {user ? "Dashboard" : "Admin"}
              </button>
            </li>

            {/* Start Project Button */}

            <li className="nav-item">
              <Link className="btn btn-success px-4" to="/web-development#sample">
                Free Sample
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
