const { request, response } = require('express');
const MedioPago = require('../models/medioPago.model');

const agregarMedioPago = async (req = request, res = response) => {
    const medioDePago = req.body.TIPO_MEDIO_PAGO;
    try {
        const existeMedioDePago = await MedioPago.findOne({
            where: {
                TIPO_MEDIO_PAGO: medioDePago
            }
        });
        if (existeMedioDePago) {
            return res.status(400).json({
                ok: false,
                msg: 'El medio de pago ya existe'
            });
        }
        const medioPago = new MedioPago({
            TIPO_MEDIO_PAGO: medioDePago
        });

        await medioPago.save();
        res.json({
            ok: true,
            msg: 'Medio de pago creado correctamente',
            medioPago
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor. Checar logs',
            errors: error
        });
    }
}

const obtenerMediosDePago = async (req = request, res = response) => {
    try {
        const mediosDePago = await MedioPago.findAll();
        res.json({
            ok: true,
            msg: 'Medios de pago obtenidos correctamente',
            mediosDePago
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor. Checar logs',
            errors: error
        });
    }
}

const actualizarMedioDePago = async (req = request, res = response) => {
    const id = req.params.id;
    const medioDePago = req.body.MEDIO_PAGO;
    try {
        const existeMedioDePago = await MedioPago.findOne({
            where: {
                MEDIO_PAGO: medioDePago
            }
        });
        if (existeMedioDePago) {
            return res.status(400).json({
                ok: false,
                msg: 'El medio de pago ya existe'
            });
        }
        const medioPago = await MedioPago.findOne({
            where: {
                ID_MEDIO_PAGO: id
            }
        });
        if (!medioPago) {
            return res.status(400).json({
                ok: false,
                msg: 'El medio de pago no existe'
            });
        }
        const actualizarMedioPago = await MedioPago.update({
            MEDIO_PAGO: medioDePago
        }, {
            where: {
                ID_MEDIO_PAGO: id
            }
        });
        res.json({
            ok: true,
            msg: 'Medio de pago actualizado correctamente',
            actualizarMedioPago
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor. Checar logs',
            errors: error
        });
    }
}

const eliminarMedioPago = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const medioPago = await MedioPago.findOne({
            where: {
                ID_MEDIO_PAGO: id
            }
        });
        if (!medioPago) {
            return res.status(400).json({
                ok: false,
                msg: 'El medio de pago no existe'
            });
        }
        const suprimirMedioDePago = await MedioPago.destroy({
            where: {
                ID_MEDIO_PAGO: id
            }
        });
        res.json({
            ok: true,
            msg: 'Medio de pago eliminado correctamente',
            suprimirMedioDePago
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor. Checar logs',
            errors: error
        });
    }
}

module.exports = {
    agregarMedioPago,
    obtenerMediosDePago,
    actualizarMedioDePago,
    eliminarMedioPago
}