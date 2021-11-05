// /api/departamentos
const { Router } = require("express");
const { check } = require("express-validator");
const { crearDepartamento } = require('../controllers/departamento.controller');
const router = Router();

router.get('/');
router.post('/', [
    check('NOMBRE_DEPARTAMENTO', 'El codigo de barras es obligatorio').not().isEmpty(),
    check('DETALLE_DEPARTAMENTO', 'El codigo de barras es obligatorio').not().isEmpty()
], crearDepartamento);
module.exports = router;