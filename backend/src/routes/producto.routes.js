const { Router } = require('express');
const { check } = require('express-validator');
const { actualizarProducto, 
    crearProducto, 
    eliminarProducto, 
    obtenerProductoPoId, 
    obtenerProductos } = require('../controllers/producto.controller');

const router = Router();

router.get('/', obtenerProductos);
router.get('/:pid', obtenerProductoPoId);
router.post('/', [
    check('CODE_BAR', 'El codigo de barras es obligatorio').not().isEmpty(),
    check('NOMBRE_PRODUCTO', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('MARCA', 'La marca es obligatoria').not().isEmpty(),
    check('PRECIO_COMPRA', 'El precio es obligatorio').not().isEmpty(),
    check('PRECIO_VENTA', 'El precio es obligatorio').not().isEmpty(),
    check('VENCE', 'La fecha de vencimiento es obligatoria').not().isEmpty()
], crearProducto);
router.put('/:id', [
    check('CODE_BAR', 'El codigo de barras es obligatorio').not().isEmpty(),
    check('NOMBRE_PRODUCTO', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('MARCA', 'La marca es obligatoria').not().isEmpty(),
    check('PRECIO_COMPRA', 'El precio es obligatorio').not().isEmpty(),
    check('PRECIO_VENTA', 'El precio es obligatorio').not().isEmpty(),
    check('VENCE', 'La fecha de vencimiento es obligatoria').not().isEmpty()
], actualizarProducto);
router.delete('/:id', eliminarProducto);
module.exports = router;