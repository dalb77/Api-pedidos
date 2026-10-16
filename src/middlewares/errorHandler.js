// Middleware de errores: Express lo reconoce porque tiene 4 parámetros
module.exports = (err, req, res, next) => {
  console.error(err);

  // Email duplicado (violación de UNIQUE)
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: 'Registro duplicado (el email ya existe)' });
  }
  // Cliente inexistente (violación de la llave foránea)
  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({ error: 'El cliente referenciado no existe' });
  }
  // total <= 0 (violación del CHECK)
  if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
    return res.status(400).json({ error: 'El total debe ser mayor a 0' });
  }

  res.status(500).json({ error: 'Error interno del servidor' });
};