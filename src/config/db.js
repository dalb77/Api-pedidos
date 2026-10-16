// Carga las variables del archivo .env
require('dotenv').config();

// mysql2 en versión con promesas (permite usar async/await)
const mysql = require('mysql2/promise');

// Un "pool" es un grupo de conexiones reutilizables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;