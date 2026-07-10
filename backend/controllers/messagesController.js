const db = require("../config/db");

exports.createMessage = (req, res) => {
  const {
    name,
    company,
    email,
    phone,
    industry,
    projectType,
    timeline,
    budget,
    message,
  } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please complete all required fields.",
    });
  }

  const uploadFolder = req.uploadFolder || null;

  const uploadedFiles = req.files
    ? JSON.stringify(
        req.files.map((file) => ({
          filename: file.originalname,
          path: file.path,
          size: file.size,
        })),
      )
    : null;

  const sql = `
    INSERT INTO messages
    (
      name,
      company,
      email,
      phone,
      industry,
      project_type,
      timeline,
      budget,
      message,
      upload_folder,
      uploaded_files
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      company,
      email,
      phone,
      industry,
      projectType,
      timeline,
      budget,
      message,
      uploadFolder,
      uploadedFiles,
    ],
    (err) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      res.json({
        success: true,
        message:
          "Thank you! Your project has been submitted successfully. We will review your documents and contact you shortly.",
      });
    },
  );
};
