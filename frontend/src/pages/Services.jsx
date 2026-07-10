import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Services() {
  return (
    <>
      <Navbar />

      {/* Hero */}

      <section className="bg-primary text-white py-5">
        <div className="container py-5">
          <h1 className="display-4 fw-bold">Our Services</h1>

          <p className="lead mt-3">
            We transform business knowledge into secure, modern software.
          </p>
        </div>
      </section>

      {/* Services */}

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4">
                  <h3 className="fw-bold">Excel Model Digitization</h3>

                  <p>
                    Convert complex Excel spreadsheets into secure web
                    applications while preserving the calculations and business
                    logic your organisation relies on.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4">
                  <h3 className="fw-bold">Business Process Automation</h3>

                  <p>
                    Replace manual processes, paper forms and repetitive tasks
                    with efficient digital workflows.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4">
                  <h3 className="fw-bold">Custom Web Applications</h3>

                  <p>
                    Develop secure, cloud-based applications designed around
                    your unique business requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4">
                  <h3 className="fw-bold">Dashboards & Reporting</h3>

                  <p>
                    Build real-time dashboards that help management monitor
                    performance and make informed decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4">
                  <h3 className="fw-bold">Database Development</h3>

                  <p>
                    Centralise your business information into secure, scalable
                    databases that improve collaboration and data quality.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4">
                  <h3 className="fw-bold">Cloud Deployment & Support</h3>

                  <p>
                    Deploy your application securely to the cloud with ongoing
                    maintenance, upgrades and technical support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to Digitize Your Business?</h2>

          <p className="lead">
            Let's transform your Excel models and business processes into a
            modern web application.
          </p>

          <a href="/contact" className="btn btn-primary btn-lg mt-3">
            Start Your Project
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Services;
