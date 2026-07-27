const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const assessmentController = require("../controllers/assessmentController");

// Upload Workbook
router.post(
  "/upload",
  upload.single("workbook"),
  assessmentController.uploadWorkbook,
);

module.exports = router;
