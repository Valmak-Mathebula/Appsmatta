const express = require("express");
const router = express.Router();

const db = require("../config/db");

/*
 * Dashboard statistics
 */
router.get("/stats", async (req, res) => {
  const sql = `
    SELECT
      COUNT(*) AS totalLeads,
      SUM(CASE WHEN status='New' THEN 1 ELSE 0 END) AS newLeads,
      SUM(CASE WHEN status='Contacted' THEN 1 ELSE 0 END) AS contacted,
      SUM(CASE WHEN status='Won' THEN 1 ELSE 0 END) AS won,
      SUM(CASE WHEN status='Lost' THEN 1 ELSE 0 END) AS lost
    FROM messages
  `;

  try {
    const [result] = await db.query(sql);
    res.json(result[0]);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});

/*
 * Recent Leads
 */
router.get("/recent", async (req, res) => {
  const sql = `
    SELECT *
    FROM messages
    ORDER BY id DESC
    LIMIT 10
  `;

  try {
    const [result] = await db.query(sql);
    res.json(result);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});

/*
 * All Leads
 */
router.get("/", async (req, res) => {
  const sql = `
    SELECT *
    FROM messages
    ORDER BY id DESC
  `;

  try {
    const [result] = await db.query(sql);
    res.json(result);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});

module.exports = router;
