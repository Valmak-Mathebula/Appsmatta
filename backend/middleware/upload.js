const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const email = (req.body.email || req.body.phone || "unknown").replace(
      /[^a-zA-Z0-9@._-]/g,
      "_",
    );

    const now = new Date();

    const timestamp =
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      "_" +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");

    const folderName = `${email}_${timestamp}`;

    const uploadPath = path.join(__dirname, "..", "uploads", folderName);

    fs.mkdirSync(uploadPath, { recursive: true });

    req.uploadFolder = folderName;

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    files: 10,
    fileSize: 50 * 1024 * 1024,
  },
});

module.exports = upload;
