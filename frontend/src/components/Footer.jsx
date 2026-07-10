function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container text-center">
        <h4 className="fw-bold mb-3">AppsMatta</h4>

        <p className="mb-1">
          Transforming Business Knowledge into Digital Platforms
        </p>

        <p className="mb-1">Pretoria, South Africa</p>

        <p className="mb-4">info@appsmatta.com</p>

        <hr />

        <small>
          © {new Date().getFullYear()} AppsMatta. All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
