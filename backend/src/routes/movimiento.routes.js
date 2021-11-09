const {
    crearMovimiento, obtenerMovimientos
} = require('../controllers/movimiento.controller');

const {Router} = require('express');
const router = Router();

router.post('/', crearMovimiento);
router.get('/', obtenerMovimientos)

module.exports = router;