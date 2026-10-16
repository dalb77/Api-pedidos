const pool = require('../config/db');

// Estados que aceptamos para un pedido
const ESTADOS_VALIDOS = ['pendiente', 'en proceso', 'enviado', 'entregado', 'cancelado'];

// Valida los datos de entrada. Devuelve un mensaje de error o null si todo está bien.
function validarPedido({ id_cliente, total, estado }) {
  if (!id_cliente) return 'id_cliente es obligatorio';
  if (total === undefined || total === null) return 'total es obligatorio';
  if (typeof total !== 'number' || isNaN(total) || total <= 0) {
    return 'total debe ser un número mayor a 0';
  }
  if (estado && !ESTADOS_VALIDOS.includes(estado)) {
    return `estado inválido. Valores permitidos: ${ESTADOS_VALIDOS.join(', ')}`;
  }
  return null;
}

// READ (todos): GET /api/pedidos
exports.listar = async (req, res, next) => {
  try {
    // JOIN une pedidos con clientes mediante la llave foránea
    const [rows] = await pool.query(
      `SELECT p.*, c.nombre AS nombre_cliente_registrado
       FROM pedidos p
       JOIN clientes c ON c.id_cliente = p.id_cliente
       ORDER BY p.id_pedido`
    );
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

// READ (uno): GET /api/pedidos/:id
exports.obtener = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, c.nombre AS nombre_cliente_registrado
       FROM pedidos p
       JOIN clientes c ON c.id_cliente = p.id_cliente
       WHERE p.id_pedido = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// CREATE: POST /api/pedidos
exports.crear = async (req, res, next) => {
  try {
    const error = validarPedido(req.body);
    if (error) return res.status(400).json({ error });

    const { id_cliente, total, estado = 'pendiente' } = req.body;

    // Comprobamos que el cliente exista y obtenemos su nombre y email
    const [clientes] = await pool.query(
      'SELECT nombre, email FROM clientes WHERE id_cliente = ?', [id_cliente]
    );
    if (clientes.length === 0) {
      return res.status(404).json({ error: 'El cliente indicado no existe' });
    }

    const { nombre, email } = clientes[0];
    const [result] = await pool.query(
      `INSERT INTO pedidos (id_cliente, cliente, email_cliente, total, estado)
       VALUES (?, ?, ?, ?, ?)`,
      [id_cliente, nombre, email, total, estado]
    );

    // Leemos el pedido recién creado para devolverlo completo
    const [nuevo] = await pool.query(
      'SELECT * FROM pedidos WHERE id_pedido = ?', [result.insertId]
    );
    res.status(201).json(nuevo[0]);
  } catch (err) {
    next(err);
  }
};

// UPDATE: PUT /api/pedidos/:id
exports.actualizar = async (req, res, next) => {
  try {
    const error = validarPedido(req.body);
    if (error) return res.status(400).json({ error });

    const { id_cliente, total, estado = 'pendiente' } = req.body;

    const [clientes] = await pool.query(
      'SELECT nombre, email FROM clientes WHERE id_cliente = ?', [id_cliente]
    );
    if (clientes.length === 0) {
      return res.status(404).json({ error: 'El cliente indicado no existe' });
    }

    const { nombre, email } = clientes[0];
    const [result] = await pool.query(
      `UPDATE pedidos
       SET id_cliente = ?, cliente = ?, email_cliente = ?, total = ?, estado = ?
       WHERE id_pedido = ?`,
      [id_cliente, nombre, email, total, estado, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    const [actualizado] = await pool.query(
      'SELECT * FROM pedidos WHERE id_pedido = ?', [req.params.id]
    );
    res.status(200).json(actualizado[0]);
  } catch (err) {
    next(err);
  }
};

// DELETE: DELETE /api/pedidos/:id
exports.eliminar = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM pedidos WHERE id_pedido = ?', [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    // 204 = eliminado correctamente, sin contenido
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};