const express = require("express");
const router = express.Router();

const assessmentController = require("../controllers/assessmentController");

// Upload workbook
router.post("/upload", assessmentController.uploadWorkbook);

// Continue assessment
router.post("/start", assessmentController.startAssessment);

module.exports = router;
