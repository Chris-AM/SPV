// /api/departamentos
const {Router} = require("express");
const {crearDepartamento} = require('../controllers/departamento.controller');
const router = Router();

router.get('/');
router.post('/', crearDepartamento);
module.exports = router;