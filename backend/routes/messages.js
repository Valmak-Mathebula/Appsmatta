const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { createMessage } = require("../controllers/messagesController");

router.post("/", upload.array("documents", 10), createMessage);

module.exports = router;
