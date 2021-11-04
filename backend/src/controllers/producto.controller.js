const { request, response } = require('express');
const { sequelize } = require('../config/db.config');
const initModels = require('../models/init-models').initModels;
const models = initModels(sequelize);
const Producto = require('../models/producto.model');

const crearProducto = async (req = request, res = response) => {
    
    try {
    const producto = {
        CODE_BAR: req.body.CODE_BAR,
        NOMBRE_PRODUCTO: req.body.NOMBRE_PRODUCTO,
        MARCA: req.body.MARCA,
        DETALLE_PRODUCTO: req.body.DETALLE_PRODUCTO,
        PRECIO_COMPRA: req.body.PRECIO_COMPRA,
        PRECIO_VENTA: req.body.PRECIO_VENTA,
        VENCE: req.body.VENCE,
        DEPARTAMENTO: req.body.DEPARTAMENTO
    }
    const prodInDb = await models.PRODUCTO.create(producto);
    console.log('prodInDb', prodInDb )
    res.json({
        ok: true,
        msg: 'doctor added',
        prodInDb
    });

    } catch (error) {
        console.log('Error --->', error);
        res.status(500).json({
            ok: false,
            msg: 'Internal server error. Check logs'
        })
    }
}

const obtenerProductos = async (req = request, res = response) => {
    try {
        const productos = await models.PRODUCTO.findAll();
        res.json({
            ok: true,
            productos
        });
    } catch (error) {
        console.log('ERROR ->', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar Logs'
        });
    }
}

const obtenerProductoPoId = async (req = request, res = response) => {
    const pid = req.params.pid;
    try {
        const producto = await models.PRODUCTO.findByPk(pid);
        if (!producto) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto no existe'
            });
        } else {
            res.json({
                ok: true,
                producto
            });
        }
    } catch (error) {
        console.log('ERROR ->', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar Logs'
        });
    }
}

const actualizarProducto = async (req = request, res = response) => {
    const pid = req.params.pid;
    try {
        const producto = await models.PRODUCTO.findByPk(pid);
        if (!producto) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto no existe'
            });
        }
        const { CODE_BAR, NOMBRE_PRODUCTO, MARCA, DETALLE_PRODUCTO, PRECIO_COMPRA, PRECIO_VENTA, VENCE, ...campos } = req.body;
        if (producto.CODE_BAR !== CODE_BAR) {
            const prodExiste = await models.PRODUCTO.findOne({ CODE_BAR });
            if (prodExiste) {
                return res.status(401).json({
                    ok: false,
                    msg: 'El producto ya existe'
                });
            }
        }
        campos.codeBar = CODE_BAR;
        const productoActualizado = await producto.update(campos);
        res.json({
            ok: true,
            producto: productoActualizado
        });
    } catch (error) {
        console.log('ERROR ->', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar Logs'
        });
    }
}

const eliminarProducto = async (req = request, res = response) => {
    const pid = req.params.pid;
    try {
        const producto = await models.PRODUCTO.findByPk(pid);
        if (!producto) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto no existe'
            });
        } else {
            await producto.destroy();
            res.json({
                ok: true,
                msg: 'Producto eliminado'
            });
        }
    } catch (error) {
        console.log('ERROR ->', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar Logs'
        });
    }
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPoId,
    actualizarProducto,
    eliminarProducto
}