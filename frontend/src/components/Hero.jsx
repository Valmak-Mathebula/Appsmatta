import logo from "../images/logo.png";
import {
  FaFileExcel,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaChartLine,
} from "react-icons/fa";

function Hero() {
  return (
    <section
      className="bg-white"
      style={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT */}

          <div className="col-lg-6">
            <span className="badge bg-success px-4 py-2 mb-4">
              FREE EXCEL WORKBOOK ASSESSMENT
            </span>

            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: "64px",
                lineHeight: "1.05",
              }}
            >
              Discover What's
              <br />
              Inside Your
              <br />
              Excel Workbook
            </h1>

            <p
              className="lead mb-4"
              style={{
                fontSize: "22px",
                color: "#666",
              }}
            >
              Upload your Excel workbook and receive a professional assessment
              showing workbook complexity, VBA inventory, business risk,
              modernization readiness and cloud migration opportunities.
            </p>

            <div className="mb-4">
              <p>
                <FaCheckCircle className="text-success me-2" />
                Workbook Inventory
              </p>

              <p>
                <FaCheckCircle className="text-success me-2" />
                Complexity Score
              </p>

              <p>
                <FaCheckCircle className="text-success me-2" />
                VBA Analysis
              </p>

              <p>
                <FaCheckCircle className="text-success me-2" />
                Business Risk Assessment
              </p>

              <p>
                <FaCheckCircle className="text-success me-2" />
                Modernization Roadmap
              </p>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <a
                href="/assessment"
                className="btn btn-success btn-lg px-5 py-3"
              >
                <FaCloudUploadAlt className="me-2" />
                START FREE ASSESSMENT
              </a>

              <a
                href="/services"
                className="btn btn-outline-primary btn-lg px-5 py-3"
              >
                Learn More
              </a>
            </div>

            <div className="mt-4 text-muted">
              No credit card required • Secure upload • Results in minutes
            </div>
          </div>

          {/* RIGHT */}

          <div className="col-lg-6 mt-5 mt-lg-0">
            <div
              className="shadow-lg rounded-4 p-4 bg-white"
              style={{
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              <div className="text-center mb-4">
                <img
                  src={logo}
                  alt="AppsMatta"
                  className="img-fluid"
                  style={{ maxWidth: "220px" }}
                />
              </div>

              <h4 className="fw-bold mb-4">AppsMatta Assessment</h4>

              <div className="d-flex justify-content-between mb-3">
                <span>Workbook Complexity</span>
                <strong>84%</strong>
              </div>

              <div className="progress mb-4">
                <div
                  className="progress-bar bg-danger"
                  style={{ width: "84%" }}
                />
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Worksheets</span>
                <strong>29</strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>VBA Modules</span>
                <strong>16</strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Named Ranges</span>
                <strong>134</strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>External Links</span>
                <strong>8</strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Business Risk</span>
                <strong className="text-danger">HIGH</strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Cloud Ready</span>
                <strong>72%</strong>
              </div>

              <hr />

              <div className="text-center">
                <FaFileExcel size={55} className="text-success mb-3" />

                <FaChartLine size={55} className="text-primary ms-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
