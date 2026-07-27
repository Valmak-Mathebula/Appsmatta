const path = require("path");

exports.uploadWorkbook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an Excel workbook.",
      });
    }

    res.json({
      success: true,
      message: "Workbook uploaded successfully.",
      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        path: req.file.path,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload failed.",
    });
  }
};
