const Router = require('express');
const { crearProveedor, obtenerProveedores, obtenerProveedorPorId, obtenerProveedorPorRut, actualizarProveedor, eliminarProveedor } = require('../controllers/proveedor.controller');

const router = Router();

router.post('/', crearProveedor);
router.get('/', obtenerProveedores);
router.get('/id/:id', obtenerProveedorPorId);
router.get('/rut/:rut', obtenerProveedorPorRut);
router.put('/:id', actualizarProveedor);
router.delete('/:id', eliminarProveedor);

module.exports = router;