import { FaFileExcel, FaArrowRight } from "react-icons/fa";

function FreeAssessment() {
  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg,#0d6efd,#084298)",
        color: "#fff",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <span className="badge bg-light text-primary px-4 py-2 mb-3">
              FREE ASSESSMENT
            </span>

            <h2 className="display-4 fw-bold mb-4">
              Is Your Excel Model
              <br />
              Ready To Become
              <br />A Web Application?
            </h2>

            <p className="lead mb-4">
              Send us your Excel workbook, VBA application or business process.
              We'll review it and provide a free assessment outlining how it can
              be transformed into a secure cloud application.
            </p>

            <div className="row">
              <div className="col-md-6">
                <p>✔ Excel Financial Models</p>

                <p>✔ Engineering Calculations</p>

                <p>✔ Risk Assessment Tools</p>
              </div>

              <div className="col-md-6">
                <p>✔ Business Processes</p>

                <p>✔ Dashboards</p>

                <p>✔ Workflow Automation</p>
              </div>
            </div>

            <a href="/contact" className="btn btn-light btn-lg mt-3 px-5">
              Request Free Assessment
            </a>
          </div>

          <div className="col-lg-4 text-center">
            <FaFileExcel
              size={220}
              style={{
                opacity: 0.95,
              }}
            />

            <div className="mt-4">
              <FaArrowRight size={45} />
            </div>

            <h4 className="mt-4">
              Excel →
              <br />
              Modern Web Application
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FreeAssessment;
