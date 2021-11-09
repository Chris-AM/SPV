const { request, response } = require('express');
const Venta = require('../models/venta.model');

// método post para crear una venta
const realizarVenta = async (req = request, res = response) => {
    const producto = req.body.PRODUCTO;
    const medioPago = req.body.MEDIOPAGO;
    const informacionMovimiento = req.body.INFORMACION_MOVIMIENTO
    console.log('producto ==>', producto);
    console.log('medioPago ==>', medioPago);
    console.log('informacionMovimiento ==>', informacionMovimiento);
    try {
        console.log('medio de pago ==>', medioPago);
        const venta = await Venta.create({
            PRODUCTO: producto,
            MEDIO_PAGO: medioPago,
            INFORMACION_MOVIMIENTO: informacionMovimiento
        });
        res.json({
            ok: true,
            message: 'Venta realizada correctamente',
            venta
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno de servidor. Checar logs',
            errors: error
        });
    }
}

const obtenerVentas = async (req = request, res = response) => {
    try {
        const ventas = await Venta.findAll();
        res.json({
            ok: true,
            message: 'Ventas obtenidas correctamente',
            ventas
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno de servidor. Checar logs',
            errors: error
        });
    }
}

const obtenerVenta = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const venta = await Venta.findOne({
            where: {
                ID_VENTA: id
            }
        });
        res.json({
            ok: true,
            message: 'Venta obtenida correctamente',
            venta
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno de servidor. Checar logs',
            errors: error
        });
    }
}
//ACTUALIZAR VENTA: SOLO ACCESIBLE POR ADMINISTRADOR
const actualizarVenta = async (req = request, res = response) => {
    const id = req.params.id;
    const producto = req.body.PRODUCTO;
    const medioPago = req.body.MEDIOPAGO;
    const informacionMovimiento = req.body.INFORMACION_MOVIMIENTO
    try {
        const existeVenta = await Venta.findOne({
            where: {
                ID_VENTA: id
            }
        });
        if (!existeVenta) {
            res.status(404).json({
                ok: false,
                msg: 'Venta no encontrada'
            });
        } else {
            const venta = await Venta.update({
                PRODUCTO: producto,
                MEDIO_PAGO: medioPago,
                INFORMACION_MOVIMIENTO: informacionMovimiento
            }, {
                where: {
                    ID_VENTA: id
                }
            });
            res.json({
                ok: true,
                message: 'Venta actualizada correctamente',
                venta
            });
        }
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno de servidor. Checar logs',
            errors: error
        });
    }
}
//ELIMINAR VENTA: SOLO ACCESIBLE POR ADMINISTRADOR
const eliminarVenta = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const existeVenta = await Venta.findOne({
            where: {
                ID_VENTA: id
            }
        });
        if (!existeVenta) {
            res.status(404).json({
                ok: false,
                msg: 'No Existe Venta'
            });
        } else {
            const venta = await Venta.destroy({
                where: {
                    ID_VENTA: id
                }
            });
            res.json({
                ok: true,
                message: 'Venta eliminada correctamente',
                venta
            });
        }
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno de servidor. Checar logs',
            errors: error
        });
    }
}
module.exports = {
    realizarVenta,
    obtenerVentas,
    obtenerVenta,
    actualizarVenta,
    eliminarVenta
}