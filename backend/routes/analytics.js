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

const round3 = (n) => Math.round(Number(n) * 1000) / 1000; // ~110 m: suburb level, not a home address

let lastGeocode = 0;

// Turns coordinates into a suburb / town name using OpenStreetMap Nominatim (free, max 1 request per second)
async function reverseGeocode(lat, lon) {
  if (Date.now() - lastGeocode < 1100) return {}; // stay within the free-service limit
  lastGeocode = Date.now();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=14&addressdetails=1&lat=${lat}&lon=${lon}`,
      {
        headers: { "User-Agent": "AppsMatta-Analytics/1.0 (info@appsmatta.com)", "Accept-Language": "en" },
        signal: controller.signal,
      },
    );
    if (!response.ok) return {};
    const a = (await response.json()).address || {};
    return {
      suburb: a.suburb || a.neighbourhood || a.quarter || a.city_district || a.village || "",
      city: a.city || a.town || a.municipality || a.county || "",
      region: a.state || "",
      country: (a.country_code || "").toUpperCase(),
    };
  } catch {
    return {};
  } finally {
    clearTimeout(timer);
  }
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

    // Approximate location from the IP address (only stored if we have nothing better yet)
    if (geo?.ll) {
      try {
        await db.query(
          `INSERT IGNORE INTO visitor_locations
             (visitor_id, latitude, longitude, city, region, country, source)
           VALUES (?,?,?,?,?,?, 'ip')`,
          [visitorId, round3(geo.ll[0]), round3(geo.ll[1]), geo.city || "", geo.region || "", geo.country || ""],
        );
      } catch (err) {
        console.warn("Location table not ready:", err.code || err.message);
      }
    }

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

/*
==================================================
SAVE VISITOR LOCATION  (public - only called after the visitor says yes)
==================================================
*/
router.post("/location", async (req, res) => {
  try {
    const visitorId = clean(req.body.visitor_id, 64);
    const lat = Number(req.body.latitude);
    const lon = Number(req.body.longitude);
    const accuracy = Math.round(Number(req.body.accuracy)) || null;

    if (!visitorId || !Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
      return res.status(400).json({ success: false });
    }

    // Only accept locations from visitors who have actually viewed a page
    const [known] = await db.query("SELECT 1 FROM page_views WHERE visitor_id = ? LIMIT 1", [visitorId]);
    if (known.length === 0) return res.status(400).json({ success: false });

    // Skip the lookup if we already have a fresh browser location for this visitor
    const [existing] = await db.query(
      "SELECT 1 FROM visitor_locations WHERE visitor_id = ? AND source = 'browser' AND updated_at > DATE_SUB(NOW(), INTERVAL 1 DAY)",
      [visitorId],
    );
    if (existing.length > 0) return res.json({ success: true });

    const latR = round3(lat);
    const lonR = round3(lon);
    const place = await reverseGeocode(latR, lonR);

    await db.query(
      `INSERT INTO visitor_locations
         (visitor_id, latitude, longitude, accuracy_m, suburb, city, region, country, source)
       VALUES (?,?,?,?,?,?,?,?, 'browser')
       ON DUPLICATE KEY UPDATE
         latitude = VALUES(latitude), longitude = VALUES(longitude), accuracy_m = VALUES(accuracy_m),
         suburb = VALUES(suburb), city = VALUES(city), region = VALUES(region), country = VALUES(country),
         source = 'browser', updated_at = NOW()`,
      [visitorId, latR, lonR, accuracy, place.suburb || "", place.city || "", place.region || "", place.country || ""],
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Analytics location error:", err);
    res.status(500).json({ success: false });
  }
});

/*
==================================================
VISITOR MAP DATA  (admin only)
GET /api/analytics/locations?days=30
==================================================
*/
router.get("/locations", requireAdmin, async (req, res) => {
  const days = Math.max(0, Math.min(parseInt(req.query.days, 10) || 0, 3650));

  let where = "1=1";
  let params = [];
  if (days === 1) {
    where = `created_at >= DATE_SUB(DATE(DATE_ADD(NOW(), INTERVAL ${TZ_HOURS} HOUR)), INTERVAL ${TZ_HOURS} HOUR)`;
  } else if (days > 1) {
    where = "created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)";
    params = [days];
  }

  try {
    const [visitors] = await db.query(
      `SELECT l.visitor_id, l.latitude, l.longitude, l.accuracy_m, l.suburb, l.city, l.region,
              l.country, l.source,
              v.views, v.sessions, v.total_seconds, v.first_seen, v.last_seen,
              v.device, v.browser, v.operating_system, v.referrer_host
         FROM visitor_locations l
         JOIN (
           SELECT visitor_id,
                  COUNT(*) AS views,
                  COUNT(DISTINCT session_id) AS sessions,
                  SUM(duration_seconds) AS total_seconds,
                  DATE_FORMAT(DATE_ADD(MIN(created_at), INTERVAL ${TZ_HOURS} HOUR), '%Y-%m-%d %H:%i') AS first_seen,
                  DATE_FORMAT(DATE_ADD(MAX(created_at), INTERVAL ${TZ_HOURS} HOUR), '%Y-%m-%d %H:%i') AS last_seen,
                  MAX(device) AS device, MAX(browser) AS browser,
                  MAX(operating_system) AS operating_system, MAX(referrer_host) AS referrer_host
             FROM page_views WHERE ${where} GROUP BY visitor_id
         ) v ON v.visitor_id = l.visitor_id
        ORDER BY v.last_seen DESC LIMIT 500`,
      params,
    );

    let pagesByVisitor = {};
    if (visitors.length > 0) {
      const [pages] = await db.query(
        `SELECT visitor_id, page, COUNT(*) AS views, SUM(duration_seconds) AS seconds
           FROM page_views
          WHERE ${where} AND visitor_id IN (?)
          GROUP BY visitor_id, page ORDER BY views DESC`,
        [...params, visitors.map((v) => v.visitor_id)],
      );
      pages.forEach((p) => {
        (pagesByVisitor[p.visitor_id] ||= []).push({ page: p.page, views: Number(p.views), seconds: Number(p.seconds) });
      });
    }

    const [[missing]] = await db.query(
      `SELECT COUNT(DISTINCT visitor_id) AS n FROM page_views
        WHERE ${where} AND visitor_id NOT IN (SELECT visitor_id FROM visitor_locations)`,
      params,
    );

    res.json({
      visitors: visitors.map((v) => ({ ...v, pages: pagesByVisitor[v.visitor_id] || [] })),
      without_location: Number(missing.n),
    });
  } catch (err) {
    console.error("Analytics locations error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

module.exports = router;
