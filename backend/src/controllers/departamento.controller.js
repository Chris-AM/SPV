const { request, response } = require("express");
const { sequelize } = require('../config/db.config');
const Departamento = require("../models/departamento.model");

const crearDepartamento = async (req = request, res = response) => {
    const nombre = req.body.NOMBRE_DEPARTAMENTO;
    const detalle = req.body.DETALLE_DEPARTAMENTO;
    try {
        const existeDepto = await Departamento.findOne({
            where: {
                NOMBRE_DEPARTAMENTO: nombre
            }
        });
        if (existeDepto) {
            return res.status(400).json({
                ok: false,
                msg: 'El departamento ya existe'
            });
        }
        const departamento = new Departamento({
            NOMBRE_DEPARTAMENTO: nombre,
            DETALLE_DEPARTAMENTO: detalle
        });
        console.log('depto =>', departamento);
        await departamento.save();
        res.json({
            ok: true,
            msg: 'Departamento creado correctamente'
        });
    } catch (error) {
        console.log('Error ===>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error Interno de Servidor. Checkar Logs'
        });
    }
}
const obtenerDepartamentos = async (req = request, res = response) => {
    try {
        const departamentos = await Departamento.findAll();
        res.json({
            ok: true,
            departamentos
        });
    } catch (error) {
        console.log('Error ===>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error Interno de Servidor. Checkar Logs'
        });
    }
}

const obtenerDepartamentoPorId = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const departamento = await Departamento.findOne({
            where: {
                ID_DEPARTAMENTO: id
            }
        });
        if (!departamento) {
            return res.status(400).json({
                ok: false,
                msg: 'El departamento no existe'
            });
        }
        res.json({
            ok: true,
            departamento
        });
    } catch (error) {
        console.log('Error ===>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error Interno de Servidor. Checkar Logs'
        });
    }
}
const actualizarDepartamento = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const deptoEnBd = await Departamento.findByPk(id);
        if (!deptoEnBd) {
            return res.status(404).json({
                ok: false,
                msg: 'El departamento no existe'
            });
        }
        const nombre = req.body.NOMBRE_DEPARTAMENTO;
        const detalle = req.body.DETALLE_DEPARTAMENTO;
        if (deptoEnBd.NOMBRE_DEPARTAMENTO !== nombre) {
            const existeDepto = await Departamento.findOne({
                where: {
                    NOMBRE_DEPARTAMENTO: nombre
                }
            });
            if (existeDepto) {
                return res.status(401).json({
                    ok: false,
                    msg: 'El departamento ya existe'
                });
            }
        }
        await Departamento.update({
            NOMBRE_DEPARTAMENTO: nombre,
            DETALLE_DEPARTAMENTO: detalle
        }, {
            where: {
                ID_DEPARTAMENTO: id
            }
        });
        res.json({
            ok: true,
            msg: 'Departamento actualizado correctamente'
        });
    } catch (error) {
        console.log('Error ===>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error Interno de Servidor. Checkar Logs'
        });
    }
}
const eliminarDepartamento = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const deptoEnBd = await Departamento.findByPk(id);
        if (!deptoEnBd) {
            return res.status(404).json({
                ok: false,
                msg: 'El departamento no existe'
            });
        }
        await Departamento.destroy({
            where: {
                ID_DEPARTAMENTO: id
            }
        });
        res.json({
            ok: true,
            msg: 'Departamento eliminado correctamente'
        });
    } catch (error) {
        console.log('Error ===>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error Interno de Servidor. Checkar Logs'
        });
    }
}

module.exports = {
    crearDepartamento,
    obtenerDepartamentos,
    obtenerDepartamentoPorId,
    actualizarDepartamento,
    eliminarDepartamento
}