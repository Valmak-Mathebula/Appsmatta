const express = require("express");
const router = express.Router();

const db = require("../config/db");
const geoip = require("geoip-lite");
const UAParser = require("ua-parser-js");
const requireAdmin = require("../middleware/auth");

// South Africa is UTC+2. Used so "today" and daily charts match your local day.
const TZ_HOURS = 2;
const OWN_HOSTS = ["appsmatta.com", "www.appsmatta.com", "localhost"];
const BOT_REGEX = /bot|crawl|spider|slurp|headless|lighthouse|preview|monitor|curl|wget|python|axios|facebookexternalhit/i;

const clean = (value, max) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

function getIp(req) {
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip || "";
  if (ip.includes(",")) ip = ip.split(",")[0].trim();
  return ip.replace("::ffff:", "");
}

function referrerHost(referrer) {
  try {
    const host = new URL(referrer).hostname;
    return OWN_HOSTS.includes(host) ? "" : host;
  } catch {
    return "";
  }
}

/*
==================================================
RECORD A PAGE VIEW  (public, called by the website)
==================================================
*/
router.post("/view", async (req, res) => {
  try {
    const ua = req.headers["user-agent"] || "";
    if (!ua || BOT_REGEX.test(ua)) {
      return res.json({ success: true, view_id: null });
    }

    const visitorId = clean(req.body.visitor_id, 64);
    const sessionId = clean(req.body.session_id, 64);
    const page = clean(req.body.page, 255);

    if (!visitorId || !sessionId || !page.startsWith("/")) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const parser = new UAParser(ua);
    const geo = geoip.lookup(getIp(req));

    // The visitor's IP address is deliberately NOT stored (only country and city).
    const [result] = await db.query(
      `INSERT INTO page_views
        (visitor_id, session_id, page, referrer_host, device, browser,
         operating_system, country, city, language, screen_width, screen_height)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        visitorId,
        sessionId,
        page,
        referrerHost(clean(req.body.referrer, 500)),
        parser.getDevice().type || "desktop",
        parser.getBrowser().name || "",
        parser.getOS().name || "",
        geo?.country || "",
        geo?.city || "",
        clean(req.body.language, 20),
        parseInt(req.body.screen_width, 10) || null,
        parseInt(req.body.screen_height, 10) || null,
      ],
    );

    res.json({ success: true, view_id: result.insertId });
  } catch (err) {
    console.error("Analytics view error:", err);
    res.status(500).json({ success: false });
  }
});

/*
==================================================
UPDATE TIME SPENT ON PAGE  (public, heartbeat)
==================================================
*/
router.post("/ping", async (req, res) => {
  try {
    const viewId = parseInt(req.body.view_id, 10);
    const visitorId = clean(req.body.visitor_id, 64);
    let seconds = parseInt(req.body.seconds, 10);

    if (!viewId || !visitorId || Number.isNaN(seconds) || seconds < 0) {
      return res.status(400).json({ success: false });
    }

    seconds = Math.min(seconds, 7200); // cap at 2 hours

    await db.query(
      `UPDATE page_views
          SET duration_seconds = GREATEST(duration_seconds, ?), updated_at = NOW()
        WHERE id = ? AND visitor_id = ?`,
      [seconds, viewId, visitorId],
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Analytics ping error:", err);
    res.status(500).json({ success: false });
  }
});

/*
==================================================
STATISTICS  (admin only)
GET /api/analytics/summary?days=30   (days=0 means all time)
==================================================
*/
router.get("/summary", requireAdmin, async (req, res) => {
  const days = Math.max(0, Math.min(parseInt(req.query.days, 10) || 0, 3650));

  // "days=1" means today (since local midnight); otherwise the last N days.
  let where = "1=1";
  let params = [];
  if (days === 1) {
    where = `created_at >= DATE_SUB(DATE(DATE_ADD(NOW(), INTERVAL ${TZ_HOURS} HOUR)), INTERVAL ${TZ_HOURS} HOUR)`;
  } else if (days > 1) {
    where = "created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)";
    params = [days];
  }

  try {
    const [[overall]] = await db.query(
      `SELECT COUNT(*) AS page_views,
              COUNT(DISTINCT visitor_id) AS visitors,
              COUNT(DISTINCT session_id) AS sessions,
              COALESCE(ROUND(AVG(duration_seconds)), 0) AS avg_seconds_per_page
         FROM page_views WHERE ${where}`,
      params,
    );

    const [[session]] = await db.query(
      `SELECT COALESCE(ROUND(AVG(total)), 0) AS avg_session_seconds
         FROM (SELECT SUM(duration_seconds) AS total
                 FROM page_views WHERE ${where} GROUP BY session_id) s`,
      params,
    );

    const [[online]] = await db.query(
      `SELECT COUNT(DISTINCT visitor_id) AS online_now
         FROM page_views WHERE updated_at >= DATE_SUB(NOW(), INTERVAL 2 MINUTE)`,
    );

    const [pages] = await db.query(
      `SELECT page,
              COUNT(*) AS views,
              COUNT(DISTINCT visitor_id) AS visitors,
              ROUND(AVG(duration_seconds)) AS avg_seconds,
              SUM(duration_seconds) AS total_seconds
         FROM page_views WHERE ${where}
        GROUP BY page ORDER BY views DESC LIMIT 50`,
      params,
    );

    const [daily] = await db.query(
      `SELECT DATE_FORMAT(DATE_ADD(created_at, INTERVAL ${TZ_HOURS} HOUR), '%Y-%m-%d') AS day,
              COUNT(*) AS views,
              COUNT(DISTINCT visitor_id) AS visitors
         FROM page_views WHERE ${where}
        GROUP BY day ORDER BY day DESC LIMIT 90`,
      params,
    );

    const [sources] = await db.query(
      `SELECT COALESCE(NULLIF(referrer_host, ''), 'Direct') AS name,
              COUNT(DISTINCT session_id) AS sessions
         FROM page_views WHERE ${where}
        GROUP BY name ORDER BY sessions DESC LIMIT 8`,
      params,
    );

    const [devices] = await db.query(
      `SELECT COALESCE(NULLIF(device, ''), 'desktop') AS name,
              COUNT(DISTINCT session_id) AS sessions
         FROM page_views WHERE ${where}
        GROUP BY name ORDER BY sessions DESC`,
      params,
    );

    const [countries] = await db.query(
      `SELECT COALESCE(NULLIF(country, ''), 'Unknown') AS name,
              COUNT(DISTINCT session_id) AS sessions
         FROM page_views WHERE ${where}
        GROUP BY name ORDER BY sessions DESC LIMIT 8`,
      params,
    );

    res.json({
      overall: { ...overall, ...session, ...online },
      pages,
      daily: daily.reverse(),
      sources,
      devices,
      countries,
    });
  } catch (err) {
    console.error("Analytics summary error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

module.exports = router;
