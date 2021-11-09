const Cliente = require('../models/cliente.model');
const { request, response } = require('express');

const crearCliente = async (req = request, res = response) => {
    const persona = req.body.PERSONA;
    try {
        const existePersona = await Cliente.findOne({
            where: {
                PERSONA: persona
            }
        });
        if (existePersona) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente ya existe'
            });
        }
        const cliente = new Cliente({
            PERSONA: persona
        });
        await cliente.save();
        res.json({
            ok: true,
            msg: 'Cliente creado correctamente'
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            message: 'Error al crear el cliente'
        });
    }
}

const obtenerClientes = async (req = request, res = response) => {
    try {
        const clientes = await Cliente.findAll();
        res.json({
            ok: true,
            clientes
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            message: 'Error al obtener los clientes'
        });
    }
}

const obtenerClientesPorId = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const cliente = await Cliente.findOne({
            where: {
                ID_CLIENTE: id
            }
        });
        res.json({
            ok: true,
            cliente
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            message: 'Error al obtener el cliente'
        });
    }
}

const actualizarClientePorId = async (req = request, res = response) => {
    const id = req.params.id;
    const { PERSONA } = req.body;
    try {
        const cliente = await Cliente.findOne({
            where: {
                ID_CLIENTE: id
            }
        });
        if (!cliente) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente no existe'
            });
        }
        await cliente.update({
            PERSONA: PERSONA   
        },
        {
            where: {
                ID_CLIENTE: id
            }
        });
        res.json({
            ok: true,
            msg: 'Cliente actualizado correctamente'
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar el cliente'
        });
    }
}

const eliminarClientePorId = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const cliente = await Cliente.findOne({
            where: {
                ID_CLIENTE: id
            }
        });
        if (!cliente) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente no existe'
            });
        }
        await cliente.destroy();
        res.json({
            ok: true,
            msg: 'Cliente eliminado correctamente'
        });
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({
            ok: false,
            message: 'Error al eliminar el cliente'
        });
    }
}
module.exports = {
    crearCliente,
    obtenerClientes,
    obtenerClientesPorId,
    actualizarClientePorId,
    eliminarClientePorId
}