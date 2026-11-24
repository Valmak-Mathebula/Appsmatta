import { FaCheckCircle, FaClock, FaGlobe, FaEdit, FaWhatsapp } from "react-icons/fa";
import { hosting, supportHours, domains, updates, whatsappLink } from "../config/business";

function HostingPlans() {
  return (
    <section id="hosting" style={{ background: "#f8f9fa" }}>
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 720 }}>
          <span className="badge bg-primary px-4 py-2 mb-3">HOSTING & MAINTENANCE</span>
          <h2 className="display-5 fw-bold mb-3">Keep Your Website Online & Up To Date</h2>
          <p className="lead text-muted">Monthly plans, per website. Cancel any time.</p>
        </div>

        <div className="row g-4 justify-content-center mb-5">
          {hosting.map((h) => (
            <div className="col-md-6 col-lg-5" key={h.name}>
              <div
                className={`card h-100 shadow border-0 ${h.popular ? "border border-primary border-3" : ""}`}
                style={{ borderRadius: 20 }}
              >
                <div className="card-body p-4 p-xl-5">
                  <h4 className="fw-bold">{h.name}</h4>
                  <div className="mb-3">
                    <span className="display-5 fw-bold text-primary">{h.price}</span>
                    <span className="fs-5 fw-semibold"> per month</span>
                    <div className="text-muted small">per website</div>
                  </div>
                  <ul className="list-unstyled mb-0">
                    {h.features.map((f) => (
                      <li key={f} className="mb-2">
                        <FaCheckCircle className="text-success me-2" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Support hours */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">
                  <FaClock className="me-2 text-primary" />
                  WhatsApp Support Hours
                </h5>
                {supportHours.map((s) => (
                  <div key={s.day} className="d-flex justify-content-between border-bottom py-2">
                    <span>{s.day}</span>
                    <strong>{s.time}</strong>
                  </div>
                ))}
                <p className="text-muted small mt-3 mb-0">
                  South African time. WhatsApp messages only, no voice calls. Messages sent outside
                  these hours are answered in the next support window.
                </p>
              </div>
            </div>
          </div>

          {/* Domains */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">
                  <FaGlobe className="me-2 text-primary" />
                  Your Domain Name
                </h5>
                {domains.list.map((d) => (
                  <div key={d.ext} className="d-flex justify-content-between border-bottom py-2">
                    <strong>{d.ext}</strong>
                    <span>
                      <strong className="text-primary">{d.price}</strong>
                      <span className="text-muted small"> per year</span>
                    </span>
                  </div>
                ))}
                <p className="text-muted small mt-3 mb-0">{domains.note}</p>
                <p className="text-muted small mt-3 mb-0">
                  Already own a domain? We can connect it for free.
                </p>
              </div>
            </div>
          </div>

          {/* Updates */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">
                  <FaEdit className="me-2 text-primary" />
                  Updates, Changes & Additions
                </h5>
                {updates.map((u) => (
                  <div key={u.item} className="border-bottom py-2">
                    <div>{u.item}</div>
                    <strong className="text-primary small">{u.price}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <a
            href={whatsappLink("Hi AppsMatta, I have a question about hosting and support.")}
            target="_blank"
            rel="noreferrer"
            className="btn btn-success btn-lg"
          >
            <FaWhatsapp className="me-2" />
            Ask Us On WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export default HostingPlans;
