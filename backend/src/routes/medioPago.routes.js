const {Router} = require('express');

const { obtenerMediosDePago, agregarMedioPago, actualizarMedioDePago, eliminarMedioPago } = require('../controllers/medioPago.controller');

const router = Router();

router.post('/', agregarMedioPago)
router.get('/', obtenerMediosDePago);
router.put('/', actualizarMedioDePago);
router.delete('/:id', eliminarMedioPago);

module.exports = router;