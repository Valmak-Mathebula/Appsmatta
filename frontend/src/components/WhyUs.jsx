import { FaCheckCircle, FaClock, FaLock, FaSyncAlt } from "react-icons/fa";

function WhyUs() {
  const reasons = [
    {
      icon: <FaCheckCircle size={42} className="text-success" />,
      title: "We Preserve What Already Works",
      description:
        "We don't ask you to throw away years of business knowledge. We keep your existing calculations, logic and processes, and transform them into modern software.",
    },
    {
      icon: <FaClock size={42} className="text-primary" />,
      title: "Save Hours Every Week",
      description:
        "Automate repetitive work, eliminate duplicate data capture and generate reports instantly instead of spending hours in spreadsheets.",
    },
    {
      icon: <FaLock size={42} className="text-danger" />,
      title: "Secure & Reliable",
      description:
        "Protect your business with user logins, role-based permissions, secure databases and automatic backups.",
    },
    {
      icon: <FaSyncAlt size={42} className="text-warning" />,
      title: "Built Around Your Business",
      description:
        "Every application is designed around the way your business already operates—not the other way around.",
    },
  ];

  return (
    <section
      className="py-5"
      style={{
        background: "#ffffff",
      }}
    >
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "760px" }}>
          <span className="badge bg-primary px-4 py-2 mb-3">WHY APPSMATTA</span>

          <h2 className="display-5 fw-bold mb-4">
            We Understand Businesses
            <br />
            Before We Write Code
          </h2>

          <p className="lead text-muted">
            Our focus is not just software development. We help organisations
            digitize the way they work while protecting the business knowledge
            they've built over many years.
          </p>
        </div>

        <div className="row g-4">
          {reasons.map((item, index) => (
            <div className="col-md-6" key={index}>
              <div
                className="card border-0 shadow h-100"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div className="card-body p-5">
                  <div className="mb-4">{item.icon}</div>

                  <h4 className="fw-bold mb-3">{item.title}</h4>

                  <p className="text-muted mb-0">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
