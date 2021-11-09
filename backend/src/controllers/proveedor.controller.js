const { request, response } = require('express');
const Proveedor = require('../models/proveedor.model');

const crearProveedor = async (req = request, res = response) => {
    const rutEmpres = req.body.RUT_EMPRESA;
    const nombreEmpresa = req.body.NOMBRE_EMPRESA;
    const fono = req.body.FONO;
    const DIRECCION = req.body.DIRECCION;

    try {
        const existeProveedor = await Proveedor.findOne({
            where: {
                RUT_EMPRESA: rutEmpres
            }
        });
        if (existeProveedor) {
            return res.status(400).json({
                ok: false,
                msg: 'El proveedor ya existe'
            });
        }
        const proveedor = new Proveedor({
            RUT_EMPRESA: rutEmpres,
            NOMBRE_EMPRESA: nombreEmpresa,
            FONO: fono,
            DIRECCION: DIRECCION
        });
        await proveedor.save();
        res.json({
            ok: true,
            msg: 'Proveedor creado correctamente'
        });
    } catch (error) {
        console.log('error ===>', error);
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error
        });
    }
}

const obtenerProveedores = async (req = request, res = response) => {
    try {
        const proveedores = await Proveedor.findAll();
        res.json({
            ok: true,
            proveedores
        });
    } catch (error) {
        console.log('error ===>', error);
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error
        });
    }
}

const obtenerProveedorPorId = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const proveedor = await Proveedor.findOne({
            where: {
                ID_PROVEEDOR: id
            }
        });
        res.json({
            ok: true,
            proveedor
        });
    } catch (error) {
        console.log('error ===>', error);
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error
        });
    }
}

const obtenerProveedorPorRut = async (req = request, res = response) => {
    const rut = req.params.rut;
    try {
        const proveedor = await Proveedor.findOne({
            where: {
                RUT_EMPRESA: rut
            }
        });
        if (!proveedor) {
            return res.status(400).json({
                ok: false,
                msg: 'El proveedor no existe'
            });
        }
        res.json({
            ok: true,
            proveedor
        });
    } catch (error) {
        console.log('error ===>', error);
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error
        });
    }
}

const actualizarProveedor = async (req = request, res = response) => {
    const id = req.params.id;
    const rutEmpres = req.body.RUT_EMPRESA;
    const nombreEmpresa = req.body.NOMBRE_EMPRESA;
    const fono = req.body.FONO;
    const DIRECCION = req.body.DIRECCION;
    try {
        const proveedorEnBd = await Proveedor.findOne({
            where: {
                ID_PROVEEDOR: id
            }
        });
        if (!proveedorEnBd) {
            return res.status(400).json({
                ok: false,
                msg: 'El proveedor no existe'
            });
        }
        await Proveedor.update(
            {
                RUT_EMPRESA: rutEmpres,
                NOMBRE_EMPRESA: nombreEmpresa,
                FONO: fono,
                DIRECCION: DIRECCION
            },
            {
                where: {
                    ID_PROVEEDOR: id
                }
            }
        );
        res.json({
            ok: true,
            msg: 'Proveedor actualizado correctamente'
        });
    } catch (error) {
        console.log('error ===>', error);
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error
        });
    }
}

const eliminarProveedor = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const proveedorEnBd = await Proveedor.findOne({
            where: {
                ID_PROVEEDOR: id
            }
        });
        if (!proveedorEnBd) {
            return res.status(400).json({
                ok: false,
                msg: 'El proveedor no existe'
            });
        }
        await Proveedor.destroy({
            where: {
                ID_PROVEEDOR: id
            }
        });
        res.json({
            ok: true,
            msg: 'Proveedor eliminado correctamente'
        });
    } catch (error) {
        console.log('error ===>', error);
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error
        });
    }
}

module.exports = {
    crearProveedor,
    obtenerProveedores,
    obtenerProveedorPorId,
    obtenerProveedorPorRut,
    actualizarProveedor,
    eliminarProveedor
}