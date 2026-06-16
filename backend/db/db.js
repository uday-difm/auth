const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "task",
  port: process.env.DB_PORT || 3306,
};

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
});

(async () => {
  let tempConn;
  try {
    // 1. Connect without database name first to ensure the database exists
    tempConn = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port,
    });
    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    await tempConn.end();

    // 2. Now connect to pool to initialize tables
    const conn = await pool.getConnection();
    console.log("✅ MySQL Connected Successfully");

    // Create users table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    // Create tasks table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        assigned_member_1 VARCHAR(255) NOT NULL,
        assigned_member_2 VARCHAR(255) DEFAULT NULL,
        priority VARCHAR(50) NOT NULL,
        deadline DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    conn.release();
    console.log("✅ Database tables initialized");
  } catch (err) {
    console.error("❌ Database initialization failed:", err.message);
  }
})();

module.exports = pool;

