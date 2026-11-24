import { FaWhatsapp, FaCheckCircle, FaGift } from "react-icons/fa";
import { whatsappLink, packages } from "../config/business";

function WebHero() {
  return (
    <section className="bg-white" style={{ paddingTop: 70, paddingBottom: 70 }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <span className="badge bg-success px-4 py-2 mb-4">
              <FaGift className="me-2" />
              FREE 1-WEEK LIVE SAMPLE
            </span>

            <h1 className="fw-bold mb-4" style={{ fontSize: "clamp(36px, 6vw, 60px)", lineHeight: 1.1 }}>
              Affordable Websites
              <br />
              For South African Businesses
              <br />
              <span className="text-primary">From R350</span>
            </h1>

            <p className="lead mb-4 text-muted">
              Get a professional, mobile-friendly website for your business. See it live for a full
              week, free of charge, before you pay a cent.
            </p>

            <div className="mb-4">
              {[
                "Websites from R350, no hidden costs",
                "Hosting from R60 per month",
                "WhatsApp support in the evenings and all weekend",
              ].map((t) => (
                <p key={t} className="mb-2">
                  <FaCheckCircle className="text-success me-2" />
                  {t}
                </p>
              ))}
            </div>

            <div className="d-flex flex-wrap gap-3">
              <a
                href={whatsappLink("Hi AppsMatta, I'd like my free 1-week website sample.")}
                target="_blank"
                rel="noreferrer"
                className="btn btn-success btn-lg px-4 py-3"
              >
                <FaWhatsapp className="me-2" />
                Start Free 1 Week Sample
              </a>
              <a href="#pricing" className="btn btn-outline-primary btn-lg px-4 py-3">
                See Pricing
              </a>
            </div>
          </div>

          <div className="col-lg-5 mt-5 mt-lg-0">
            <div className="shadow-lg rounded-4 p-4 bg-white mx-auto" style={{ maxWidth: 440 }}>
              <h4 className="fw-bold mb-4">Pricing</h4>
              {packages.map((p) => (
                <div key={p.name} className="d-flex justify-content-between align-items-center border-bottom py-3">
                  <div>
                    <strong>{p.pages}</strong>
                    <div className="text-muted small">{p.name} website</div>
                  </div>
                  <div className="text-end">
                    <span className="fs-4 fw-bold text-primary">{p.priceLabel}</span>
                    <div className="text-muted small">once-off</div>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between align-items-center pt-3">
                <div>
                  <strong>Hosting</strong>
                  <div className="text-muted small">per website</div>
                </div>
                <div className="text-end">
                  <span className="fs-4 fw-bold text-primary">R60</span>
                  <div className="text-muted small">per month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WebHero;
