const router = require('express').Router();
const ctrl = require('../controllers/pedidos.controller');

router.get('/', ctrl.listar);          // GET    /api/pedidos
router.get('/:id', ctrl.obtener);      // GET    /api/pedidos/5
router.post('/', ctrl.crear);          // POST   /api/pedidos
router.put('/:id', ctrl.actualizar);   // PUT    /api/pedidos/5
router.delete('/:id', ctrl.eliminar);  // DELETE /api/pedidos/5

module.exports = router;