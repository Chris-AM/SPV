const { request, response } = require('express');
const Persona = require('../models/persona.model');

const crearPersona = async (req = request, res = response) => {
    const nombre = req.body.NOMBRE;
    const rut = req.body.RUT;
    const celular = req.body.CELULAR;
    const direccion = req.body.DIRECCION;

    try {
        const existePersona = await Persona.findOne({ 
            where: {
                RUT: rut
            }
         });
        if (existePersona) {
            return res.status(400).json({
                ok: false,
                msg: 'La persona ya existe'
            });
        }
        const persona = new Persona({
            NOMBRE: nombre,
            RUT: rut,
            CELULAR: celular,
            DIRECCION: direccion
        });
        console.log('persona ==> ', persona);
        await persona.save();
        res.json({
            ok: true,
            msg: 'Persona creada correctamente',
            persona
        });
    } catch (error) {
        console.log('Error ===>', error);
        res.status(500).json({
            mensaje: 'Error en el servidor. Checar logs',
            error
        });
    }
}

const obtenerPersonas = async (req = request, res = response) => {
    try {
        const personas = await Persona.findAll();
        res.json({
            ok: true,
            msg: 'Personas obtenidas correctamente',
            personas
        });
    } catch (error) {
        console.log('Error ===>', error);
        res.status(500).json({
            ok:false,
            msg: 'Error interno de servidor. Checkar logs'
        })
    }
    
}

const obtenerPersonaPorRut = async (req = request, res = response) => {
    const rut = req.params.rut;
    console.log('rut ==> ', rut);
    try {
        const persona = await Persona.findOne({
            where: {
                RUT: rut
            }
        });
        console.log('persona ==> ', persona);
        if (!persona) {
            return res.status(400).json({
                ok: false,
                msg: 'La persona no existe'
            });
        }
        res.json({
            ok: true,
            msg: 'Persona obtenida correctamente',
            persona
        });
    } catch (error) {
        console.log('Error ===>', error);
        res.status(500).json({
            mensaje: 'Error en el servidor. Checar logs',
            error
        });
    }
}

const actualizarPersonaPorRut = async (req = request, res = response) => {
    const rut = req.params.rut;
    const nombre = req.body.NOMBRE;
    const celular = req.body.CELULAR;
    const direccion = req.body.DIRECCION;
    try {
        const personaEnBd = await Persona.findOne({
            where: {
                RUT: rut
            }
        });
        if (!personaEnBd) {
            return res.status(400).json({
                ok: false,
                msg: 'La persona no existe'
            });
        }
        const actualizarPersona = await Persona.update({
            NOMBRE: nombre,
            CELULAR: celular,
            DIRECCION: direccion
        }, {
            where: {
                RUT: rut
            }
        });
        res.json({
            ok: true,
            msg: 'Persona actualizada correctamente',
            actualizarPersona
        });
    } catch (error) {
        console.log('Error ===>', error);
        res.status(500).json({
            mensaje: 'Error en el servidor. Checar logs',
            error
        });
    }
}

const eliminarPersonaPorRut = async (req = request, res = response) => {
    const rut = req.params.rut;
    try {
        const persona = await Persona.findOne({
            where: {
                RUT: rut
            }
        });
        if (!persona) {
            return res.status(400).json({
                ok: false,
                msg: 'La persona no existe'
            });
        }
        await persona.destroy();
        res.json({
            ok: true,
            msg: 'Persona eliminada correctamente'
        });
    } catch (error) {
        console.log('Error ===>', error);
        res.status(500).json({
            mensaje: 'Error en el servidor. Checar logs',
            error
        });
    }
}
module.exports = {
    crearPersona,
    obtenerPersonas,
    obtenerPersonaPorRut,
    actualizarPersonaPorRut,
    eliminarPersonaPorRut
}