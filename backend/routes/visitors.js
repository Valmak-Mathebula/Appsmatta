const express = require("express");
const router = express.Router();

const db = require("../config/db");
const geoip = require("geoip-lite");
const UAParser = require("ua-parser-js");

router.post("/", (req, res) => {
  const parser = new UAParser(req.headers["user-agent"]);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const deviceInfo = parser.getDevice();

  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;

  if (ip && ip.includes(",")) {
    ip = ip.split(",")[0].trim();
  }

  if (ip === "::1") {
    ip = "127.0.0.1";
  }

  if (ip.startsWith("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }

  const geo = geoip.lookup(ip);

  const {
    visitor_id,
    language,
    screen_width,
    screen_height,
    referrer,
    landing_page,
    current_page,
  } = req.body;

  const sql = `
    INSERT INTO visitors
    (
      visitor_id,
      ip_address,
      country,
      region,
      city,
      latitude,
      longitude,
      device,
      browser,
      operating_system,
      language,
      screen_width,
      screen_height,
      referrer,
      landing_page,
      current_page,
      user_agent,
      first_visit,
      last_visit
    )
    VALUES
    (
      ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW()
    )
  `;

  db.query(
    sql,
    [
      visitor_id,
      ip,
      geo?.country || "",
      geo?.region || "",
      geo?.city || "",
      geo?.ll ? geo.ll[0] : null,
      geo?.ll ? geo.ll[1] : null,
      deviceInfo.type || "Desktop",
      browser.name || "",
      os.name || "",
      language,
      screen_width,
      screen_height,
      referrer,
      landing_page,
      current_page,
      req.headers["user-agent"],
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
      });
    },
  );
});

module.exports = router;
