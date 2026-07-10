import React from "react";
import {
  FaFileExcel,
  FaFileAlt,
  FaEnvelope,
  FaCloud,
  FaDatabase,
  FaLaptopCode,
  FaMobileAlt,
  FaChartBar,
  FaRobot,
  FaArrowRight,
} from "react-icons/fa";

function Transformation() {
  const steps = [
    {
      icon: <FaFileExcel size={45} className="text-success" />,
      title: "Excel Model",
    },
    {
      icon: <FaDatabase size={45} className="text-primary" />,
      title: "Cloud Database",
    },
    {
      icon: <FaLaptopCode size={45} className="text-dark" />,
      title: "Web Application",
    },
    {
      icon: <FaMobileAlt size={45} className="text-info" />,
      title: "Mobile App",
    },
    {
      icon: <FaChartBar size={45} className="text-warning" />,
      title: "Dashboards",
    },
    {
      icon: <FaRobot size={45} className="text-danger" />,
      title: "AI Integration",
    },
  ];

  const before = [
    {
      icon: <FaFileExcel size={36} className="text-success" />,
      text: "Complex Excel Spreadsheets",
    },
    {
      icon: <FaFileAlt size={36} className="text-secondary" />,
      text: "Paper Forms",
    },
    {
      icon: <FaEnvelope size={36} className="text-primary" />,
      text: "Email Approvals",
    },
  ];

  const after = [
    {
      icon: <FaCloud size={36} className="text-primary" />,
      text: "Cloud Applications",
    },
    {
      icon: <FaDatabase size={36} className="text-info" />,
      text: "Centralized Database",
    },
    {
      icon: <FaLaptopCode size={36} className="text-dark" />,
      text: "Web Platform",
    },
    {
      icon: <FaMobileAlt size={36} className="text-success" />,
      text: "Mobile Access",
    },
    {
      icon: <FaChartBar size={36} className="text-warning" />,
      text: "Live Dashboards",
    },
  ];

  return (
    <section
      className="py-5"
      style={{
        background: "#f8f9fa",
      }}
    >
      <div className="container">
        <div
          className="text-center mx-auto mb-5"
          style={{ maxWidth: "1200px" }}
        >
          <span className="badge bg-primary px-4 py-2 mb-3">
            DIGITAL TRANSFORMATION
          </span>

          <h2 className="display-5 fw-bold mb-4">
            We Transform The Way
            <br />
            Your Business Operates
          </h2>

          <div className="row justify-content-center align-items-center g-3 mb-5">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="col">
                  <div className="bg-white shadow-sm border rounded-4 p-4 h-100">
                    {step.icon}

                    <h5 className="mt-3 fw-bold">{step.title}</h5>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="col-auto d-none d-lg-block">
                    <FaArrowRight size={25} className="text-secondary" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="lead text-muted">
            We don't replace your business knowledge.
            <br />
            <strong>We modernize it.</strong>
          </p>
        </div>

        <div className="row g-5">
          <div className="col-lg-6">
            <div
              className="card border-danger border-2 h-100"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body p-5">
                <h3 className="fw-bold text-danger mb-4">BEFORE</h3>

                {before.map((item, index) => (
                  <div key={index} className="d-flex align-items-center mb-4">
                    <div className="me-4">{item.icon}</div>

                    <h5 className="mb-0">{item.text}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="card border-success border-2 h-100"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body p-5">
                <h3 className="fw-bold text-success mb-4">AFTER</h3>

                {after.map((item, index) => (
                  <div key={index} className="d-flex align-items-center mb-4">
                    <div className="me-4">{item.icon}</div>

                    <h5 className="mb-0">{item.text}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transformation;
