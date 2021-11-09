const {
    realizarVenta, obtenerVentas, obtenerVenta, actualizarVenta, eliminarVenta,
} = require('../controllers/venta.controller');
const {Router} = require('express');

const router = Router();

router.post('/', realizarVenta);
router.get('/', obtenerVentas);
router.get('/:id', obtenerVenta);
router.put('/:id', actualizarVenta);
router.delete('/:id', eliminarVenta);

module.exports = router;