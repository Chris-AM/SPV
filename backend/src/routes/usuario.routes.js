const {crearUsuario , obtenerUsarios, obtenerUsuariosMaster, obtenerUsuariosNoMaster, actualizarUsuario, eliminarUsuario} = require('../controllers/usuario.controller');
const {Router} = require('express');

const router = Router();

router.post('/', crearUsuario);
router.get('/', obtenerUsarios);
router.get('/esMaster', obtenerUsuariosMaster);
router.get('/noMaster', obtenerUsuariosNoMaster);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;