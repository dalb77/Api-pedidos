const pool = require('../config/db');

// GET /api/clientes -> lista todos los clientes
exports.listar = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

// GET /api/clientes/:id -> obtiene un cliente por su id
exports.obtener = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM clientes WHERE id_cliente = ?', [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// POST /api/clientes -> crea un cliente
exports.crear = async (req, res, next) => {
  try {
    const { nombre, email } = req.body;
    if (!nombre || !email) {
      return res.status(400).json({ error: 'nombre y email son obligatorios' });
    }
    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, email) VALUES (?, ?)', [nombre, email]
    );
    res.status(201).json({ id_cliente: result.insertId, nombre, email });
  } catch (err) {
    next(err);
  }
};