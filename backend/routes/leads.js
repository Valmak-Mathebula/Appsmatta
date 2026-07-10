const express = require("express");
const router = express.Router();

const db = require("../config/db");

/*
 * Dashboard statistics
 */
router.get("/stats", (req, res) => {
  const sql = `
    SELECT

      COUNT(*) AS totalLeads,

      SUM(CASE WHEN status='New' THEN 1 ELSE 0 END) AS newLeads,

      SUM(CASE WHEN status='Contacted' THEN 1 ELSE 0 END) AS contacted,

      SUM(CASE WHEN status='Won' THEN 1 ELSE 0 END) AS won,

      SUM(CASE WHEN status='Lost' THEN 1 ELSE 0 END) AS lost

    FROM messages
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
});

/*
 * Recent Leads
 */
router.get("/recent", (req, res) => {
  const sql = `
    SELECT *
    FROM messages
    ORDER BY id DESC
    LIMIT 10
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

/*
 * All Leads
 */
router.get("/", (req, res) => {
  const sql = `
    SELECT *
    FROM messages
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

module.exports = router;
