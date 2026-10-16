const router = require('express').Router();
const ctrl = require('../controllers/clientes.controller');

router.get('/', ctrl.listar);
router.get('/:id', ctrl.obtener);
router.post('/', ctrl.crear);

module.exports = router;