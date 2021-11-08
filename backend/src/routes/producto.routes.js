const { Router } = require("express");
const router = Router();
const {crearProducto, obtenerProductos, obtenerProductoPorCodigoBarras, actualizarProductoPorCB, eliminarProducto} = require('../controllers/producto.controller')


router.post('/', crearProducto )
router.get('/', obtenerProductos)
router.get('/:codigoBarras', obtenerProductoPorCodigoBarras);
router.put('/:codigoBarras', actualizarProductoPorCB);
router.delete('/:codigoBarras', eliminarProducto);
module.exports = router;



/* [
    check('CODE_BAR', 'El código de barras es obligatorio').not().isEmpty(),
    check('CODE_BAR', 'El código de barras debe ser un número').isNumeric(),
    check('NOMBRE_PRODUCTO', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('MARCA', 'El nombre de la marca es obligatorio').not().isEmpty(),
    check('DETALLE_PRODUCTO', 'El detalle del producto es obligatorio').not().isEmpty(),
    check('PRECIO_COMPRA', 'El precio de compra es obligatorio').not().isEmpty(),
    check('PRECIO_VENTA', 'El precio de venga es obligatorio').not().isEmpty(),
    check('VENCE', 'La fecha de vencimiento es obligatorio').not().isEmpty(),
    check('DEPARTAMENTO', 'El departamento es obligatorio' ).not().isEmpty(),
], */ 