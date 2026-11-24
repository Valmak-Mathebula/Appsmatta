import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "../config/business";

// Floating button shown on every public page
function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="btn btn-success rounded-circle shadow-lg d-flex align-items-center justify-content-center"
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        padding: 0,
        zIndex: 1050,
      }}
    >
      <FaWhatsapp size={32} />
    </a>
  );
}

export default WhatsAppButton;
