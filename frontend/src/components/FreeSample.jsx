import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "../config/business";

const steps = [
  { n: 1, title: "Message us", text: "Tell us about your business on WhatsApp. Share your logo, photos and what you sell." },
  { n: 2, title: "We build your sample", text: "We design your website and put it live on a temporary address." },
  { n: 3, title: "Try it free for 1 week", text: "Share it with friends and customers. Ask for changes during the week." },
  { n: 4, title: "Love it? Go live", text: "Pay for your package, and we move it to your own domain. Not for you? No charge." },
];

function FreeSample() {
  return (
    <section
      id="sample"
      style={{ background: "linear-gradient(135deg,#0d6efd,#084298)", color: "#fff" }}
    >
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 760 }}>
          <span className="badge bg-light text-primary px-4 py-2 mb-3">100% FREE</span>
          <h2 className="display-5 fw-bold mb-3">See Your Website Live For 1 Week, Free</h2>
          <p className="lead mb-0">No deposit. No risk. Pay only if you love it.</p>
        </div>

        <div className="row g-4">
          {steps.map((s) => (
            <div className="col-md-6 col-lg-3" key={s.n}>
              <div className="bg-white text-dark rounded-4 p-4 h-100 shadow">
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold mb-3"
                  style={{ width: 44, height: 44 }}
                >
                  {s.n}
                </div>
                <h5 className="fw-bold">{s.title}</h5>
                <p className="text-muted mb-0">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <a
            href={whatsappLink("Hi AppsMatta, I'd like my free 1-week website sample.")}
            target="_blank"
            rel="noreferrer"
            className="btn btn-success btn-lg px-5 py-3"
          >
            <FaWhatsapp className="me-2" />
            Start Free 1 Week Sample
          </a>
        </div>
      </div>
    </section>
  );
}

export default FreeSample;
