const { request, response } = require("express");
const { sequelize } = require('../config/db.config');
const Departamento = require("../models/departamento.model");
//const initModels = require('../models/init-models').initModels;
//const models = initModels(sequelize);

const crearDepartamento = async (req = request, res = response) => {
    const nombre  = req.body.NOMBRE_DEPARTAMENTO;
    const detalle = req.body.DETALLE_DEPARTAMENTO;
    console.log(nombre, detalle);
    const departamento = await Departamento.create({
        NOMBRE_DEPARTAMENTO: nombre,
        DETALLE_DEPARTAMENTO: detalle
    });
    res.json({
        message: "Departamento creado",
        data: departamento
    });
}

module.exports = {
    crearDepartamento
}