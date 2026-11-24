const jwt = require("jsonwebtoken");

// Allows only logged-in admins (token issued by /api/auth/login)
module.exports = function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorised." });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || "appsmatta-secret");
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};
