const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT *
    FROM admin_users
    WHERE email = ?
    LIMIT 1
  `;

  try {
    const [results] = await db.query(sql, [email]);

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = results[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "appsmatta-secret",
      {
        expiresIn: "7d",
      },
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Database Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
