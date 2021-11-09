const { request, response } = require('express');
const Movimiento = require('../models/movimiento.model');

const crearMovimiento = async (req = request, res = response) => {
    const monto = req.body.MONTO;
    const cantidadProductos = req.body.CANTIDAD_PRODUCTOS;
    try {
        const existeMovimiento = await Movimiento.findOne({
            where: {
                MONTO: monto,
                CANTIDAD_PRODUCTOS: cantidadProductos
            }
        });
        if (existeMovimiento) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un movimiento con ese monto y cantidad de productos'
            });
        }
        const movimiento = new Movimiento({
            MONTO: monto,
            CANTIDAD_PRODUCTOS: cantidadProductos
        });
        await movimiento.save();
        res.json({
            ok: true,
            msg: 'Movimiento creado correctamente',
            movimiento
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            message: 'Error al crear el movimiento',
            data: {}
        });
    }
}

const obtenerMovimientos = async (req = request, res = response) => {
    try {
        const movimientos = await Movimiento.findAll();
        res.json({
            ok: true,
            msg: 'Movimientos obtenidos correctamente',
            movimientos
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            message: 'Error al obtener los movimientos',
            data: {}
        });
    }
}

module.exports = {
    crearMovimiento,
    obtenerMovimientos
}