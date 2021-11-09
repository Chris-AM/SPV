const {Router} = require('express');
const router = Router();
const {
    crearHistorial,
    obtenerHistoriales,
    obtenerHistorialesPorId,
    obtenerHistorialesPorProducto,
    actualizarHistorial
} = require('../controllers/historialProducto.controller');


router.post('/', crearHistorial);
router.get('/', obtenerHistoriales);
router.get('/:id', obtenerHistorialesPorId);
router.get('/producto/:producto', obtenerHistorialesPorProducto);
router.put('/:id', actualizarHistorial);


module.exports = router;