const {Router} = require('express');
const {crearCliente, obtenerClientes, obtenerClientesPorId, actualizarClientePorId, eliminarClientePorId} = require('../controllers/cliente.controller');
const router = Router();

router.post('/', crearCliente);
router.get('/', obtenerClientes)
router.get('/:id', obtenerClientesPorId);
router.put('/"id', actualizarClientePorId);
router.delete("/:id", eliminarClientePorId);


module.exports = router;