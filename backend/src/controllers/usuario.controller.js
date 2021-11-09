const Usuario = require('../models/usuario.model');
const {request, response} = require('express');

const crearUsuario = async (req = request, res = response) => {
    const esMaster = req.body.ES_MASTER
    const persona = req.body.PERSONA
    try {
        const existePersona = await Usuario.findOne({
            where: {
                PERSONA: persona
            }
        });
        if (existePersona) {
            return res.status(400).json({
                ok: false,
                msg: 'La persona ya existe'
            });
        }
        const usuario = new Usuario({
            ES_MASTER: esMaster,
            PERSONA: persona
        });
        await usuario.save();
        res.json({
            ok: true,
            msg: 'Usuario creado correctamente'
        });
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Checar logs'
        });
    }
};

const obtenerUsarios = async (req = request, res = response) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json({
            ok: true,
            usuarios
        });
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Checar logs'
        });
    }
};

const obtenerUsuariosMaster = async(req = request, res = response ) => {
    const esMaster = req.body.esMaster;
    console.log('ES_MASTER ==>', esMaster);
    try{
        const master = Boolean(esMaster);
        console.log('master ==>', master);
        if(master){
            const usuarios = await Usuario.findAll({
                where: {
                    ES_MASTER: master
                }
            });
            res.json({
                ok: true,
                usuarios
            });
        }else{
            res.status(400).json({
                ok: false,
                msg: 'No se encontraron usuarios'
            });
        }
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Checar logs'
        });
    }
}

const obtenerUsuariosNoMaster = async(req = request, res = response) => {
    const esMaster = req.body.esMaster;
    try {
        const noMaster = !!Boolean(esMaster);
        console.log('noMaster ==>', noMaster);
        if(noMaster === false){
            const usuarios = await Usuario.findAll({
                where: {
                    ES_MASTER: noMaster
                }
            });
            res.json({
                ok: true,
                usuarios
            });
            
        }else{
            res.status(400).json({
                ok: false,
                msg: 'No se encontraron usuarios'
            });
        }
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Checar logs'
        });
    }
}

const actualizarUsuario = async (req = request, res = response) => {
    const id = req.params.id;
    const newId = parseInt(id);
    const { USUARIO } = req.body;
    try {
        const usuario = await Usuario.findOne({
            where: {
                ID_USUARIO: newId
            }
        });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró el usuario'
            });
        }
        await Usuario.update({
            USUARIO: USUARIO
        }, {
            where: {
                ID_USUARIO: newId
            }
        });
        res.json({
            ok: true,
            msg: 'Usuario actualizado correctamente'
        });
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Checar logs'
        });
    }
};

const eliminarUsuario = async (req = request, res = response) => {
    const id = req.params.id;
    const newId = parseInt(id);
    try {
        const usuario = await Usuario.findOne({
            where: {
                ID_USUARIO: newId
            }
        });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró el usuario'
            });
        }
        await Usuario.destroy({
            where: {
                ID_USUARIO: newId
            }
        });
        res.json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        console.log('error ==>', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Checar logs'
        });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsarios,
    obtenerUsuariosMaster,
    obtenerUsuariosNoMaster,
    actualizarUsuario,
    eliminarUsuario
};