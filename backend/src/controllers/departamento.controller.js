const { request, response } = require("express");
const { sequelize } = require('../config/db.config');
const initModels = require('../models/init-models').initModels;
const models = initModels(sequelize);

const crearDepartamento = async (req = request, res = response) => {
    const body = req.body;
    console.log('body -->', body)
    if(body === undefined){
        
    }
    try {
        const departamento = {
            NOMBRE_DEPARTAMENTO: req.body.NOMBRE_DEPARTAMENTO,
            DETALLE_DEPARTAMENTO: req.body.DETALLE_DEPARTAMENTO
        }
        const deptoBD = await models.DEPARTAMENTO.create(departamento);
        console.log('deptoBD', deptoBD )
        res.json({
            ok: true,
            departamento: deptoBD
        });
    } catch (error) {
        console.log('Error --->', error);
        res.status(500).json({
            ok:false,
            msg: 'Internal server error. Check logs'
        })
    }
}

module.exports = {
    crearDepartamento
}