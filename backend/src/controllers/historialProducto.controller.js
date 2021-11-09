const { request, response } = require('express');
const HistorialProducto = require('../models/historialProducto.model');

const crearHistorial = async (req = request, res = response) => {
    const vecesVendido = req.body.VECES_VENDIDO;
    const vecesComprado = req.body.VECES_COMPRADO;
    const producto = req.body.PRODUCTO;
    try {
        const existeHistorial = await HistorialProducto.findOne({
            where: {
                PRODUCTO: producto
            }
        });
        if (existeHistorial) {
            const historial = await HistorialProducto.update({
                VECES_VENDIDO: vecesVendido,
                VECES_COMPRADO: vecesComprado
            }, {
                where: {
                    PRODUCTO: producto
                }
            });
            res.json({
                ok: true,
                message: 'Historial actualizado',
                historial
            });
        } else {
            const historial = new HistorialProducto({
                VECES_VENDIDO: vecesVendido,
                VECES_COMPRADO: vecesComprado,
                PRODUCTO: producto
            });
            await historial.save();
            res.json({
                ok: true,
                message: 'Historial creado',
                historial
            });
        }
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            message: 'Error al crear el historial',
            data: {}
        });
    }
}
const obtenerHistoriales = async (req = request, res = response) => {
    try {
        const historiales = await HistorialProducto.findAll();
        res.json({
            ok: true,
            message: 'Historiales obtenidos',
            historiales
        });
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            message: 'Error al obtener los historiales',
            data: {}
        });
    }
}
const obtenerHistorialesPorId = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const historial = await HistorialProducto.findOne({
            where: {
                ID: id
            }
        });
        if(!historial) {
            res.status(404).json({
                ok: false,
                message: 'No existe el historial',
                data: {}
            });
        }
        res.json({
            ok: true,
            message: 'Historial obtenido',
            historial
        });
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            message: 'Error al obtener el historial',
            data: {}
        });
    }
}
const obtenerHistorialesPorProducto = async (req = request, res = response) => {
    const producto = req.params.producto;
    try {
        const historialProducto = await HistorialProducto.findOne({
            where: {
                PRODUCTO: producto
            }
        });
        if(!historialProducto) {
            res.status(404).json({
                ok: false,
                message: 'No existe el historial',
                data: {}
            });
        }
        res.json({
            ok: true,
            message: 'Historial obtenido',
            historialProducto
        });
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            message: 'Error al obtener el historial',
            data: {}
        });
    }
}
const actualizarHistorial = async (req = request, res = response) => {
    const id = req.params.id;
    const vecesVendido = req.body.VECES_VENDIDO;
    const vecesComprado = req.body.VECES_COMPRADO;
    const producto = req.body.PRODUCTO;
    try {
        const historialEnBd = await HistorialProducto.findOne({
            where: {
                ID: id
            }
        });
        if(!historialEnBd) {
            res.status(404).json({
                ok: false,
                message: 'No existe el historial',
                data: {}
            });
        }
        const historial = await HistorialProducto.update({
            VECES_VENDIDO: vecesVendido,
            VECES_COMPRADO: vecesComprado,
            PRODUCTO: producto
        }, {
            where: {
                ID: id
            }
        });
        res.json({
            ok: true,
            message: 'Historial actualizado',
            historial
        });
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            message: 'Error al actualizar el historial',
            data: {}
        });
    }
}

module.exports = {
    crearHistorial,
    obtenerHistoriales,
    obtenerHistorialesPorId,
    obtenerHistorialesPorProducto,
    actualizarHistorial
}