import { useState } from "react";
import axios from "axios";
import {
  FaFileExcel,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaChartBar,
} from "react-icons/fa";

function AssessmentPortal() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [email, setEmail] = useState("");
  const [starting, setStarting] = useState(false);
  const uploadWorkbook = async () => {
    if (!file) return;

    try {
      setUploading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setUploadedFile(response.data);
      setMessage("Workbook uploaded successfully.");
    } catch (err) {
      console.error(err);

      setMessage(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const continueAssessment = async () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    try {
      setStarting(true);

      const response = await axios.post(
        "http://localhost:5000/api/assessment/start",
        {
          email,
        },
      );

      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Unable to continue assessment.");
    } finally {
      setStarting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        paddingTop: "70px",
        paddingBottom: "70px",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <span
            className="badge bg-success px-4 py-2 mb-4"
            style={{ fontSize: "15px" }}
          >
            FREE EXCEL ASSESSMENT
          </span>

          <h1 className="fw-bold mb-4" style={{ fontSize: "52px" }}>
            Discover What's Inside
            <br />
            Your Excel Workbook
          </h1>

          <p className="lead text-muted mx-auto" style={{ maxWidth: "850px" }}>
            Upload your Excel workbook and receive an automated assessment
            showing workbook complexity, VBA inventory, business risk,
            modernization readiness, and much more.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-7 mb-4">
            <div
              className="card shadow-lg border-0"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="card-body p-5">
                <div className="text-center">
                  <FaCloudUploadAlt size={90} color="#0d6efd" />

                  <h3 className="mt-4 mb-3">Upload Workbook</h3>

                  <p className="text-muted">
                    Supported formats
                    <br />
                    XLSX • XLSM • XLS
                  </p>

                  <input
                    type="file"
                    className="form-control mt-4 mb-4"
                    accept=".xlsx,.xls,.xlsm"
                    onChange={(e) => setFile(e.target.files[0])}
                  />

                  {file && (
                    <div className="alert alert-success">
                      <FaCheckCircle className="me-2" />

                      {file.name}
                    </div>
                  )}

                  <button
                    className="btn btn-primary btn-lg px-5"
                    disabled={!file || uploading}
                    onClick={uploadWorkbook}
                  >
                    {uploading ? "Uploading..." : "Upload Workbook"}
                  </button>

                  {message && (
                    <div className="alert alert-info mt-4">{message}</div>
                  )}

                  {uploadedFile && (
                    <div className="card mt-4 border-0 shadow-sm">
                      <div className="card-body">
                        <h4 className="text-success mb-3">
                          <FaCheckCircle className="me-2" />
                          Workbook Uploaded Successfully
                        </h4>

                        <hr />

                        <p className="mb-3">
                          <strong>Workbook</strong>
                          <br />
                          {uploadedFile.originalName}
                        </p>

                        <p className="mb-4">
                          <strong>Size</strong>
                          <br />
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>

                        <label className="form-label fw-bold">
                          Email Address
                        </label>

                        <input
                          type="email"
                          className="form-control mb-3"
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <small className="text-muted">
                          We'll email your assessment report when it's ready.
                        </small>

                        <div className="d-grid mt-4">
                          <button
                            className="btn btn-success btn-lg"
                            onClick={continueAssessment}
                            disabled={starting}
                          >
                            {starting
                              ? "Please wait..."
                              : "Continue Assessment →"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="card-body p-5">
                <h4 className="fw-bold mb-4">Your FREE assessment includes</h4>

                <p>
                  <FaFileExcel className="text-success me-3" />
                  Workbook Inventory
                </p>

                <p>
                  <FaChartBar className="text-primary me-3" />
                  Complexity Score
                </p>

                <p>
                  <FaShieldAlt className="text-danger me-3" />
                  Business Risk Analysis
                </p>

                <p>
                  <FaCheckCircle className="text-success me-3" />
                  VBA Detection
                </p>

                <p>
                  <FaCheckCircle className="text-success me-3" />
                  Modernization Readiness
                </p>

                <p>
                  <FaCheckCircle className="text-success me-3" />
                  Professional Assessment Report
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentPortal;
