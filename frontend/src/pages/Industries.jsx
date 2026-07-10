import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Industries() {
  const industries = [
    {
      title: "Manufacturing",
      text: "Production planning, inventory management, quality management, costing systems and operational dashboards.",
    },
    {
      title: "Professional Services",
      text: "Proposal management, document workflows, CRM systems, resource planning and business management applications.",
    },
    {
      title: "Engineering",
      text: "Engineering calculations, costing tools, maintenance systems, inspection applications and project management solutions.",
    },
    {
      title: "Government",
      text: "Monitoring & Evaluation systems, compliance tracking, project management, reporting and workflow automation.",
    },
    {
      title: "Mining",
      text: "Risk management, environmental monitoring, equipment tracking, compliance systems and operational reporting.",
    },
    {
      title: "Agriculture",
      text: "Farm management, production planning, input tracking, commodity management, farmer databases and reporting systems.",
    },

    {
      title: "Finance",
      text: "Financial models, budgeting, forecasting, investment analysis, cash flow systems and management dashboards.",
    },

    {
      title: "Healthcare",
      text: "Patient administration, asset tracking, inventory management, scheduling and reporting solutions.",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="bg-primary text-white py-5">
        <div className="container py-5 text-center">
          <h1 className="display-4 fw-bold">Industries We Serve</h1>

          <p className="lead mt-3">
            Every business has unique processes. We build software around the
            way you already work.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {industries.map((industry) => (
              <div className="col-lg-6" key={industry.title}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h3 className="fw-bold mb-3">{industry.title}</h3>

                    <p className="mb-0">{industry.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold">Don't See Your Industry?</h2>

          <p className="lead mt-3">
            That's perfectly fine. Every application we build is tailored to
            your business processes—not your industry.
          </p>

          <a href="/contact" className="btn btn-primary btn-lg mt-3">
            Discuss Your Project
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Industries;
