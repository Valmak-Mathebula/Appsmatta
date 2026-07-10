import {
  FaFileExcel,
  FaCogs,
  FaChartLine,
  FaClipboardCheck,
  FaDatabase,
  FaMobileAlt,
} from "react-icons/fa";

function Projects() {
  const solutions = [
    {
      icon: <FaFileExcel size={45} className="text-success mb-3" />,
      title: "Excel Model Digitization",
      description:
        "Transform complex Excel workbooks into secure cloud applications while preserving your existing calculations and business logic.",
    },
    {
      icon: <FaCogs size={45} className="text-primary mb-3" />,
      title: "Business Process Automation",
      description:
        "Digitize manual workflows, approvals and repetitive business processes to improve productivity and reduce errors.",
    },
    {
      icon: <FaChartLine size={45} className="text-warning mb-3" />,
      title: "Management Dashboards",
      description:
        "Create real-time dashboards that give management instant visibility into performance, KPIs and operational data.",
    },
    {
      icon: <FaClipboardCheck size={45} className="text-danger mb-3" />,
      title: "Risk & Compliance Systems",
      description:
        "Develop digital risk assessments, audit tools, compliance tracking systems and reporting platforms.",
    },
    {
      icon: <FaDatabase size={45} className="text-info mb-3" />,
      title: "Database Applications",
      description:
        "Replace disconnected spreadsheets with secure, centralized databases accessible from anywhere.",
    },
    {
      icon: <FaMobileAlt size={45} className="text-dark mb-3" />,
      title: "Mobile Business Apps",
      description:
        "Provide field staff with mobile applications for inspections, data collection and reporting in real time.",
    },
  ];

  return (
    <section id="solutions" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "760px" }}>
          <span className="badge bg-primary px-4 py-2 mb-3">SOLUTIONS</span>

          <h2 className="display-5 fw-bold mb-4">Solutions We Build</h2>

          <p className="lead text-muted">
            Every business is different. We build digital solutions around your
            existing business processes instead of forcing you to adapt to
            off-the-shelf software.
          </p>
        </div>

        <div className="row g-4">
          {solutions.map((solution, index) => (
            <div className="col-md-6 col-xl-4" key={index}>
              <div
                className="card border-0 shadow h-100"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div className="card-body p-5 text-center">
                  {solution.icon}

                  <h4 className="fw-bold mt-3 mb-3">{solution.title}</h4>

                  <p className="text-muted">{solution.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <a href="/solutions" className="btn btn-primary btn-lg px-5">
            View All Solutions
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
