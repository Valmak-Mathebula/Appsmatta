import logo from "../images/logo.png";
import { FaFileExcel, FaCogs, FaDatabase, FaChartLine } from "react-icons/fa";

function Hero() {
  return (
    <section
      className="bg-white"
      style={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT */}

          <div className="col-lg-6">
            <span className="badge bg-primary px-4 py-3 mb-4">
              BUSINESS PROCESS DIGITIZATION
            </span>

            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: "64px",
                lineHeight: "1.05",
              }}
            >
              We Transform
              <br />
              Excel Models
              <br />
              Into Business
              <br />
              Applications
            </h1>

            <p
              className="lead mb-4"
              style={{
                fontSize: "22px",
                color: "#666",
              }}
            >
              We help businesses modernize Excel models, manual workflows,
              engineering calculations and operational processes into secure,
              cloud-based applications.
            </p>

            <div className="row mb-4">
              <div className="col-6 mb-3">
                <div className="d-flex align-items-center">
                  <FaFileExcel className="text-success me-3" size={26} />

                  <span>Excel Models</span>
                </div>
              </div>

              <div className="col-6 mb-3">
                <div className="d-flex align-items-center">
                  <FaCogs className="text-primary me-3" size={26} />

                  <span>Business Processes</span>
                </div>
              </div>

              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FaDatabase className="text-info me-3" size={26} />

                  <span>Cloud Databases</span>
                </div>
              </div>

              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FaChartLine className="text-warning me-3" size={26} />

                  <span>Dashboards</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <a href="/contact" className="btn btn-primary btn-lg px-5 me-3">
                Start Your Project
              </a>

              <a href="/solutions" className="btn btn-outline-dark btn-lg px-5">
                View Solutions
              </a>
            </div>
          </div>

          {/* RIGHT */}

          <div className="col-lg-6 text-center">
            <img
              src={logo}
              alt="AppsMatta"
              className="img-fluid"
              style={{
                maxWidth: "520px",
              }}
            />

            <div
              className="shadow-lg bg-white rounded-4 p-4 mt-4 text-start"
              style={{
                maxWidth: "450px",
                margin: "0 auto",
              }}
            >
              <h5 className="fw-bold mb-3">We Digitize</h5>

              <ul className="mb-0">
                <li>Excel Financial Models</li>

                <li>Engineering Calculators</li>

                <li>Business Workflows</li>

                <li>Approval Processes</li>

                <li>Reporting Systems</li>

                <li>Management Dashboards</li>

                <li>Mobile Applications</li>

                <li>Cloud Platforms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
