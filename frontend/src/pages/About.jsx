import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      {/* Hero */}

      <section className="bg-primary text-white py-5">
        <div className="container py-5">
          <h1 className="display-4 fw-bold">About AppsMatta</h1>

          <p className="lead mt-3 mb-0">
            Turning business knowledge into powerful digital solutions.
          </p>
        </div>
      </section>

      {/* About */}

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Who We Are</h2>

              <p>
                AppsMatta is a software company that helps businesses modernise
                the way they work by transforming Excel models, manual processes
                and paper-based systems into secure web applications.
              </p>

              <p>
                Many organisations have invested years developing business
                knowledge inside spreadsheets and documents. Rather than
                replacing those processes, we preserve the business logic while
                improving usability, collaboration, reporting and accessibility
                through modern software.
              </p>

              <p>
                Our goal is simple: help organisations work faster, reduce
                manual effort and make better decisions through digital
                transformation.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="bg-light rounded p-5 shadow-sm">
                <h3 className="fw-bold mb-4">What We Digitize</h3>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Excel Financial Models</li>

                  <li className="list-group-item">Business Calculators</li>

                  <li className="list-group-item">Engineering Models</li>

                  <li className="list-group-item">Risk Assessment Tools</li>

                  <li className="list-group-item">Business Workflows</li>

                  <li className="list-group-item">Approval Processes</li>

                  <li className="list-group-item">Reporting Systems</li>

                  <li className="list-group-item">Management Dashboards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}

      <section className="bg-light py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <h3 className="fw-bold">Mission</h3>

              <p>
                To simplify business operations through practical digital
                transformation.
              </p>
            </div>

            <div className="col-md-4">
              <h3 className="fw-bold">Vision</h3>

              <p>
                To become Africa's trusted partner for business process
                digitisation.
              </p>
            </div>

            <div className="col-md-4">
              <h3 className="fw-bold">Values</h3>

              <p>
                Innovation, Simplicity, Quality, Integrity and Customer Success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
