require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // Prueba la conexión antes de levantar el servidor
    await pool.query('SELECT 1');
    console.log('Conexión a la base de datos exitosa');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('No se pudo conectar a la base de datos:', err.message);
    process.exit(1);
  }
})();