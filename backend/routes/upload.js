const express = require("express");
const multer = require("multer");
const { Readable } = require("stream");
const cloudinary = require("../cloudinary");
const path = require("path");

const router = express.Router();

// Store uploaded file in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const fileName = path.parse(req.file.originalname).name;

        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "appsmatta/temp",
            public_id: fileName,
            overwrite: false,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        Readable.from(req.file.buffer).pipe(stream);
      });

    const result = await uploadStream();

    res.json({
      success: true,
      originalName: req.file.originalname,
      size: req.file.size,
      public_id: result.public_id,
      url: result.secure_url,
      bytes: result.bytes,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
