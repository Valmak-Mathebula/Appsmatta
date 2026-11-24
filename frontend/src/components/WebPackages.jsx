import { FaCheckCircle, FaWhatsapp, FaLock } from "react-icons/fa";
import { packages, advanced, whatsappLink } from "../config/business";

function WebPackages() {
  return (
    <section id="pricing">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 720 }}>
          <span className="badge bg-primary px-4 py-2 mb-3">WEBSITE PACKAGES</span>
          <h2 className="display-5 fw-bold mb-3">Choose Your Website</h2>
          <p className="lead text-muted">
            Once-off development price, paid one time. Hosting is separate, from R60 per month.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {packages.map((p) => (
            <div className="col-md-6 col-lg-4" key={p.name}>
              <div
                className={`card h-100 border-0 shadow ${p.popular ? "border border-primary border-3" : ""}`}
                style={{ borderRadius: 20 }}
              >
                {p.popular && (
                  <span className="badge bg-primary position-absolute top-0 start-50 translate-middle px-4 py-2">
                    MOST POPULAR
                  </span>
                )}
                <div className="card-body p-4 p-xl-5 d-flex flex-column">
                  <h4 className="fw-bold">{p.name}</h4>
                  <div className="text-muted mb-3">{p.pages}</div>
                  <div className="mb-2">
                    <span className="display-5 fw-bold text-primary">{p.priceLabel}</span>
                    <span className="text-muted"> once-off</span>
                  </div>
                  <p className="text-muted">{p.tagline}</p>
                  <ul className="list-unstyled mb-4">
                    {p.features.map((f) => (
                      <li key={f} className="mb-2">
                        <FaCheckCircle className="text-success me-2" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(`Hi AppsMatta, I'm interested in the ${p.name} (${p.pages}) website at ${p.priceLabel}. Please send me my free sample.`)}
                    target="_blank"
                    rel="noreferrer"
                    className={`btn mt-auto ${p.popular ? "btn-primary" : "btn-outline-primary"}`}
                  >
                    <FaWhatsapp className="me-2" />
                    Start Free 1 Week Sample
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advanced */}
        <div className="card border-0 shadow mt-5" style={{ borderRadius: 20 }}>
          <div className="card-body p-4 p-lg-5">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <span className="badge bg-dark px-3 py-2 mb-3">
                  <FaLock className="me-2" />
                  ADVANCED WEBSITES
                </span>
                <h3 className="fw-bold mb-3">Logins, Registrations & Multiple Products</h3>
                <p className="text-muted">
                  Need customers to register and log in, or a catalogue with many products and
                  prices? We build advanced websites tailored to your business, quoted per project.
                </p>
                <div className="row">
                  {advanced.features.map((f) => (
                    <div className="col-md-6 mb-2" key={f}>
                      <FaCheckCircle className="text-success me-2" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-5 text-lg-center mt-4 mt-lg-0">
                <div className="text-muted">From</div>
                <div className="mb-3">
                  <span className="display-4 fw-bold text-primary">{advanced.fromPrice}</span>
                  <span className="text-muted"> once-off</span>
                </div>
                <a
                  href={whatsappLink("Hi AppsMatta, I need an advanced website (logins / products). Can you quote me?")}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-dark btn-lg"
                >
                  <FaWhatsapp className="me-2" />
                  Request a Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WebPackages;
