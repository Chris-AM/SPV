const { response, request } = require('express');
const Inventario = require('../models/inventario.model');

const crearInventario = async (req = request, res = response ) => {
    const cantidad = req.body.CANTIDAD;
    const producto = req.body.PRODUCTO;
    const proveedor = req.body.PROVEEDOR;
    const cliente = req.body.CLIENTE;

    try {
       const productoInventariado = await Inventario.findOne({
            where: {
                PRODUCTO: producto
            }
        });
        if (productoInventariado) {
            res.status(400).json({
                ok: false,
                msg: 'El producto ya se encuentra en inventario'
            });
        }
        const inventario = new Inventario({
            CANTIDAD: cantidad,
            PRODUCTO: producto,
            PROVEEDOR: proveedor,
            CLIENTE: cliente
        });
        await inventario.save();
        res.json({
            ok: true,
            msj: 'Inventario creado correctamente',
            inventario
        });
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor. Checar logs',
            error
        });
    }
};

const obtenerInventario = async (req = request, res = response) => {
    try {
        const inventario = await Inventario.findAll();
        res.json({
            ok: true,
            inventario
        });
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor. Checar logs',
            error
        });
    }
}

const obtenerInventarioPorProducto = async (req = request, res = response) => {
    const producto = req.params.producto;
    try {
        const existeProducto = await Inventario.findOne({
            where: {
                PRODUCTO: producto
            }
        });
        if (!existeProducto) {
            res.status(400).json({
                ok: false,
                msg: 'El producto no se encuentra en inventario'
            });
        }
        res.json({
            ok: true,
            inventario: existeProducto
        });
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor. Checar logs',
            error
        });
    }
};

const actualizarInventarioPorProducto = async (req = request, res = response) => {
    const cantidad = req.body.CANTIDAD;
    const producto = req.params.producto;
    const proveedor = req.body.PROVEEDOR;
    const cliente = req.body.CLIENTE;
    //variable cantidadProductos trae la cantidad de productos que se encuentran en inventario
    const cantidadProductos = await Inventario.sum('CANTIDAD', {
        where: {
            PRODUCTO: producto
        }
    });
    try {
      const existeProducto = await Inventario.findOne({
        where: {
            PRODUCTO: producto
        }
      });
        if (!existeProducto) {
            res.status(400).json({
            ok: false,
            msg: 'El producto no se encuentra en inventario'
            });
        }
        console.log('cantidad ==>', cantidad);
        console.log('cantidadProductos ==>', cantidadProductos);
        const productosTotales = cantidad + cantidadProductos;
        console.log('productosTotales ==>', productosTotales);
        const inventario = await Inventario.update({
            CANTIDAD: productosTotales,
            PRODUCTO: producto,
            PROVEEDOR: proveedor,
            CLIENTE: cliente
        }, {
            where: {
                PRODUCTO: producto
            }
        });
        res.json({
            ok: true,
            msj: 'Inventario actualizado correctamente',
            inventario
        });
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor. Checar logs',
            error
        });
    }
}

module.exports = {
    crearInventario,
    obtenerInventario,
    obtenerInventarioPorProducto,
    actualizarInventarioPorProducto
}