const mysql = require("mysql2");
require("dotenv").config();

console.log("Connecting to:");
console.log("Host:", process.env.DB_HOST);
console.log("Database:", process.env.DB_NAME);
console.log("User:", process.env.DB_USER);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000,
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed");
    console.error(err);
    return;
  }

  console.log("✅ Connected to MySQL");
});

module.exports = connection;
