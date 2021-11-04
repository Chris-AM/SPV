const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../config/db.config');
const Cliente = require('./cliente.model');
const Usuario = require('./usuario.model');

class Persona extends Model {}
Persona.init({
  ID_PERSONA: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NOMBRE: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  RUT: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
  CELULAR: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  DIRECCION: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'PERSONA'
});
Persona.hasMany(Cliente, { as: "Clientes", foreignKey: "PERSONA"});
Persona.hasMany(Usuario, { as: "Usuarios", foreignKey: "PERSONA"});

console.log('Persona está conectado?', Persona === sequelize.models.PERSONA);

module.exports = Persona
