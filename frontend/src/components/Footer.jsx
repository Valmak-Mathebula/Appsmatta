import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink, EMAIL } from "../config/business";

function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container text-center">
        <h4 className="fw-bold mb-3">AppsMatta</h4>

        <p className="mb-1">
          Affordable Websites & Business Web Apps
        </p>

        <p className="mb-1">Pretoria, South Africa</p>

        <p className="mb-3">{EMAIL}</p>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="btn btn-success mb-4"
        >
          <FaWhatsapp className="me-2" />
          WhatsApp Us
        </a>

        <hr />

        <small>
          © {new Date().getFullYear()} AppsMatta. All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
