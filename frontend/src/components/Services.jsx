import {
  FaFileExcel,
  FaDatabase,
  FaLaptopCode,
  FaMobileAlt,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaFileExcel size={42} className="text-success" />,
      title: "Excel Model Digitization",
      description:
        "Transform complex Excel workbooks into secure cloud applications while preserving your calculations and business logic.",
    },
    {
      icon: <FaDatabase size={42} className="text-primary" />,
      title: "Business Process Automation",
      description:
        "Replace manual workflows, paper forms and disconnected spreadsheets with efficient digital processes.",
    },
    {
      icon: <FaLaptopCode size={42} className="text-dark" />,
      title: "Custom Business Applications",
      description:
        "We build software around your business processes instead of forcing you to change the way you work.",
    },
    {
      icon: <FaChartLine size={42} className="text-warning" />,
      title: "Dashboards & Analytics",
      description:
        "Real-time dashboards that bring together business data, KPIs and reports in one place.",
    },
    {
      icon: <FaMobileAlt size={42} className="text-info" />,
      title: "Mobile Workforce Solutions",
      description:
        "Enable field staff to capture information, complete inspections and access data from any device.",
    },
    {
      icon: <FaRobot size={42} className="text-danger" />,
      title: "AI-Powered Automation",
      description:
        "Use AI to automate repetitive work, analyse documents and improve business productivity.",
    },
  ];

  return (
    <section
      id="services"
      className="py-5"
      style={{
        background: "#f8f9fa",
      }}
    >
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "760px" }}>
          <span className="badge bg-primary px-4 py-2 mb-3">OUR SERVICES</span>

          <h2 className="display-5 fw-bold mb-4">
            We Digitize Businesses,
            <br />
            Not Just Build Software.
          </h2>

          <p className="lead text-muted">
            We take the spreadsheets, calculations and business processes you
            already use every day and transform them into secure, modern web
            applications.
          </p>
        </div>

        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-6 col-xl-4" key={index}>
              <div
                className="card border-0 shadow h-100"
                style={{
                  borderRadius: "20px",
                  transition: "0.3s",
                }}
              >
                <div className="card-body p-5">
                  <div className="mb-4">{service.icon}</div>

                  <h4 className="fw-bold mb-3">{service.title}</h4>

                  <p className="text-muted mb-0">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
