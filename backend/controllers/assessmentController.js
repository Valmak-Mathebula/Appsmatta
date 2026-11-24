const db = require("../config/db");

exports.uploadWorkbook = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Workbook uploaded successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload failed.",
    });
  }
};

exports.startAssessment = async (req, res) => {
  try {
    console.log("STEP 1");

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    console.log("STEP 2");

    const [users] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    console.log("STEP 3");

    let userId;

    if (users.length > 0) {
      userId = users[0].id;
      console.log("Existing user:", userId);
    } else {
      console.log("Creating user...");

      const [result] = await db.query("INSERT INTO users (email) VALUES (?)", [
        email,
      ]);

      userId = result.insertId;

      console.log("New user:", userId);
    }

    console.log("STEP 4");

    const [assessment] = await db.query(
      "INSERT INTO assessments (user_id, status) VALUES (?, ?)",
      [userId, "Uploaded"],
    );

    console.log("STEP 5");

    res.json({
      success: true,
      userId,
      assessmentId: assessment.insertId,
    });
  } catch (err) {
    console.error("ASSESSMENT ERROR:");
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
