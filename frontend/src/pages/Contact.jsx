import { useState } from "react";
import api from "../services/api";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    projectType: "",
    timeline: "",
    budget: "",
    message: "",
  });

  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [responseMessage, setResponseMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files);

    setDocuments((previousFiles) => {
      const allFiles = [...previousFiles, ...newFiles];

      const uniqueFiles = allFiles.filter(
        (file, index, self) =>
          index ===
          self.findIndex(
            (f) =>
              f.name === file.name &&
              f.size === file.size &&
              f.lastModified === file.lastModified,
          ),
      );

      return uniqueFiles.slice(0, 10);
    });

    // Allow selecting the same file again later if needed
    e.target.value = "";
  };

  const removeFile = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };
  const addFiles = (files) => {
    const newFiles = Array.from(files);

    setDocuments((previousFiles) => {
      const allFiles = [...previousFiles, ...newFiles];

      const uniqueFiles = allFiles.filter(
        (file, index, self) =>
          index ===
          self.findIndex(
            (f) =>
              f.name === file.name &&
              f.size === file.size &&
              f.lastModified === file.lastModified,
          ),
      );

      return uniqueFiles.slice(0, 10);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragActive(false);

    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setResponseMessage("Please complete all required fields.");
      return;
    }

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    documents.forEach((file) => {
      formData.append("documents", file);
    });

    try {
      setLoading(true);

      setResponseMessage("");

      const response = await api.post("/messages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponseMessage(response.data.message);

      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        industry: "",
        projectType: "",
        timeline: "",
        budget: "",
        message: "",
      });

      setDocuments([]);
    } catch (err) {
      console.log(err);

      if (err.response) {
        setResponseMessage(err.response.data.message);
      } else {
        setResponseMessage("Unable to connect to the server.");
      }
    }

    setLoading(false);
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Start Your Project</h1>

          <p className="lead text-muted">
            Upload your Excel model or business documents and we'll assess how
            they can be transformed into a modern web application.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    placeholder="Full Name *"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    placeholder="Company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    placeholder="Email *"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    placeholder="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <select
                    className="form-select"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                  >
                    <option value="">Industry</option>
                    <option>Agriculture</option>
                    <option>Engineering</option>
                    <option>Government</option>
                    <option>Manufacturing</option>
                    <option>Mining</option>
                    <option>Finance</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <select
                    className="form-select"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                  >
                    <option value="">Project Type</option>
                    <option>Excel Model</option>
                    <option>Business Process</option>
                    <option>Dashboard</option>
                    <option>Database</option>
                    <option>Mobile App</option>
                    <option>Custom Software</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <select
                    className="form-select"
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                  >
                    <option value="">Preferred Timeline</option>
                    <option>Immediately</option>
                    <option>Within 1 Month</option>
                    <option>Within 3 Months</option>
                    <option>Planning Stage</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <select
                    className="form-select"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">Estimated Budget</option>
                    <option>Less than R20,000</option>
                    <option>R20,000 - R50,000</option>
                    <option>R50,000 - R100,000</option>
                    <option>More than R100,000</option>
                    <option>Not Sure</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <textarea
                  rows="7"
                  className="form-control"
                  name="message"
                  placeholder="Tell us about your project. What would you like us to digitize?"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">
                  Upload Supporting Documents
                </label>

                <input
                  id="documentUpload"
                  type="file"
                  multiple
                  onChange={handleFiles}
                  style={{ display: "none" }}
                />

                <div
                  onClick={() =>
                    document.getElementById("documentUpload").click()
                  }
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{
                    border: dragActive
                      ? "3px solid #198754"
                      : "2px dashed #0d6efd",

                    borderRadius: "20px",

                    height: "220px",

                    background: dragActive ? "#e8fff2" : "#f8fbff",

                    cursor: "pointer",

                    transition: "0.25s",
                  }}
                >
                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      background: "#0d6efd",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "50px",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    +
                  </div>

                  <h4 className="fw-bold mb-2">
                    {dragActive ? "Drop files here..." : "Add Documents"}
                  </h4>
                  <p className="text-muted mb-1">
                    {dragActive
                      ? "Release to upload"
                      : "Click or drag files here"}
                  </p>

                  <small className="text-muted">
                    Excel • PDF • Word • Images • ZIP
                  </small>
                </div>
              </div>

              {documents.length > 0 && (
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Selected Files</h5>

                    {documents.map((file, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center border-bottom py-2"
                      >
                        <span>{file.name}</span>

                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {responseMessage && (
                <div className="alert alert-info">{responseMessage}</div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-lg px-5"
                disabled={loading}
              >
                {loading ? "Uploading Project..." : "Submit Project"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
