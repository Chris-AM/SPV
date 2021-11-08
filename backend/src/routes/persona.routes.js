const {Router} = require('express');
const { crearPersona,
        obtenerPersonaPorRut,
        obtenerPersonas,
        actualizarPersonaPorRut,
        eliminarPersonaPorRut} = require('../controllers/persona.controller');

const router = Router();

router.post('/', crearPersona);
router.get('/:rut', obtenerPersonaPorRut);
router.get('/', obtenerPersonas);
router.delete('/:rut', eliminarPersonaPorRut);
router.put('/:rut', actualizarPersonaPorRut);
module.exports = router;