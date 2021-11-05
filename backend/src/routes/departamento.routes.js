// /api/departamentos
const { Router } = require("express");
const { check } = require("express-validator");
const { crearDepartamento,
    obtenerDepartamentos,
    obtenerDepartamentoPorId,
    actualizarDepartamento,
    eliminarDepartamento } = require('../controllers/departamento.controller');
const router = Router();

router.get('/', obtenerDepartamentos);
router.get('/:id', obtenerDepartamentoPorId);
router.post('/', [
    check('NOMBRE_DEPARTAMENTO', 'El codigo de barras es obligatorio').not().isEmpty(),
    check('DETALLE_DEPARTAMENTO', 'El codigo de barras es obligatorio').not().isEmpty()
], crearDepartamento);
router.put('/:id', [
    check('NOMBRE_DEPARTAMENTO', 'El codigo de barras es obligatorio').not().isEmpty(),
    check('DETALLE_DEPARTAMENTO', 'El codigo de barras es obligatorio').not().isEmpty()
], actualizarDepartamento);
router.delete('/:id', eliminarDepartamento);
module.exports = router;