const { request, response } = require('express');
const Producto = require('../models/producto.model');

const crearProducto = async (req = request, res = response) => {
    const codigoBarras = req.body.CODE_BAR;
    const nombreProducto = req.body.NOMBRE_PRODUCTO;
    const marca = req.body.MARCA;
    const detalleProducto = req.body.DETALLE_PRODUCTO;
    const precioCompra = req.body.PRECIO_COMPRA;
    const precioVneta = req.body.PRECIO_VENTA;
    const vence = req.body.VENCE;
    const departamento = req.body.DEPARTAMENTO

    try {
        const existeProducto = await Producto.findOne({
            where: {
                CODE_BAR: codigoBarras
            }
        });
        if (existeProducto) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto ya existe'
            });
        }
        const producto = new Producto({
            CODE_BAR: codigoBarras,
            NOMBRE_PRODUCTO: nombreProducto,
            MARCA: marca,
            DETALLE_PRODUCTO: detalleProducto,
            PRECIO_COMPRA: precioCompra,
            PRECIO_VENTA: precioVneta,
            VENCE: vence,
            DEPARTAMENTO: departamento
        });
        console.log('producto ==>', producto);
        await producto.save();
        res.json({
            ok: true,
            msg: 'Producto creado correctamente'
        });
    } catch (error) {
        console.log("error ===>", error);
        res.status(500).json({
            ok: false,
            msg: 'Error Interno de Servidor. Checkar Logs'
        });
    }
}

const obtenerProductos = async (req = request, res = response) => {
    try {
        const productos = await Producto.findAll();
        res.json({
            ok: true,
            productos
        });
    } catch (error) {
        console.log("error ===>", error);
        res.status(500).json({
            ok: false,
            msg: 'Error Interno de Servidor. Checkar Logs'
        });
    }
}

const obtenerProductoPorCodigoBarras = async (req = request, res = response) => {
    const codigoBarras = req.params.codigoBarras;
    console.log('codigoBarras ==>', codigoBarras);
    try {
        const producto = await Producto.findOne({
            where: {
                CODE_BAR: codigoBarras
            }
        });
        if (!producto) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto no existe'
            });
        }
        res.json({
            ok: true,
            producto
        });
    } catch (error) {
        console.log("error ===>", error);
        res.status(500).json({
            ok: false,
            msg: 'Error Interno de Servidor. Checkar Logs'
        });
    }

}

const actualizarProductoPorCB = async (req = request, res = response) => {
    const codigoBarras = req.params.codigoBarras;
    const nombreProducto = req.body.NOMBRE_PRODUCTO;
    const marca = req.body.MARCA;
    const detalleProducto = req.body.DETALLE_PRODUCTO;
    const precioCompra = req.body.PRECIO_COMPRA;
    const precioVneta = req.body.PRECIO_VENTA;
    const vence = req.body.VENCE;
    const departamento = req.body.DEPARTAMENTO;
    try {
        const productoEnBd = await Producto.findOne({
            where: {
                CODE_BAR: codigoBarras
            }
        });
        if (!productoEnBd) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto no existe'
            });
        }
        const actualizarProducto = await Producto.update({
            NOMBRE_PRODUCTO: nombreProducto,
            MARCA: marca,
            DETALLE_PRODUCTO: detalleProducto,
            PRECIO_COMPRA: precioCompra,
            PRECIO_VENTA: precioVneta,
            VENCE: vence,
            DEPARTAMENTO: departamento
            }, {
            where: {
                CODE_BAR: codigoBarras
            }
        });
        res.json({
            ok: true,
            msg: 'Producto actualizado correctamente',
            actualizarProducto
        });
    } catch (error) {
        console.log("error ===>", error);
        res.status(500).json({
            ok: false,
            msg: 'Error Interno de Servidor. Checkar Logs'
        });
    }
}
const eliminarProducto = async (req = request, res = response) => {
    const codigoBarras = req.params.codigoBarras;
    try {
        const productoEnBd = await Producto.findOne({
            where: {
                CODE_BAR: codigoBarras
            }
        });
        if (!productoEnBd) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto no existe'
            });
        }
        const eliminarProducto = await Producto.destroy({
            where: {
                CODE_BAR: codigoBarras
            }
        });
        res.json({
            ok: true,
            msg: 'Producto eliminado correctamente'
        });
    } catch (error) {
        console.log("error ===>", error);
        res.status(500).json({
            ok: false,
            msg: 'Error Interno de Servidor. Checkar Logs'
        });
    }
}
module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorCodigoBarras,
    actualizarProductoPorCB,
    eliminarProducto
}
