const {Router} = require('express');
const { crearInventario, obtenerInventario, obtenerInventarioPorProducto, actualizarInventarioPorProducto } = require('../controllers/inventario.controller');
const router = Router();

router.post('/', crearInventario);
router.get('/', obtenerInventario);
router.get('/:producto', obtenerInventarioPorProducto);
router.put('/:producto', actualizarInventarioPorProducto);

module.exports = router;