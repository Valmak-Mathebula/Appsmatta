import { FaUpload, FaSearch, FaLaptopCode, FaRocket } from "react-icons/fa";

function Process() {
  const steps = [
    {
      icon: <FaUpload size={45} className="text-primary mb-3" />,
      title: "1. Share Your Process",
      description:
        "Send us your Excel model, business process, forms or existing system.",
    },
    {
      icon: <FaSearch size={45} className="text-success mb-3" />,
      title: "2. We Analyse",
      description:
        "We study your workflow and identify opportunities to simplify and automate it.",
    },
    {
      icon: <FaLaptopCode size={45} className="text-warning mb-3" />,
      title: "3. We Build",
      description:
        "We develop a secure cloud application while preserving your business rules and calculations.",
    },
    {
      icon: <FaRocket size={45} className="text-danger mb-3" />,
      title: "4. Launch & Support",
      description:
        "We deploy your application, train your team and continue supporting future improvements.",
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "760px" }}>
          <span className="badge bg-primary px-4 py-2 mb-3">HOW WE WORK</span>

          <h2 className="display-5 fw-bold mb-4">
            Your Journey to Digital Transformation
          </h2>

          <p className="lead text-muted">
            A simple, structured approach that turns your existing business
            knowledge into modern software.
          </p>
        </div>

        <div className="row g-4">
          {steps.map((step, index) => (
            <div className="col-md-6 col-xl-3" key={index}>
              <div
                className="card border-0 shadow h-100"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div className="card-body p-5 text-center">
                  {step.icon}

                  <h4 className="fw-bold mt-3 mb-3">{step.title}</h4>

                  <p className="text-muted mb-0">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
