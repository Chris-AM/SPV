const {Sequelize, DataTypes, Model} = require('sequelize');
const  {sequelize} = require('../config/db.config');
const DetalleCompra = require('./detalleCompra.model');
const DetalleVenta = require('./detalleVenta.model');
const Persona = require('./persona.model');

class Usuario extends Model {}

Usuario.init({
  ID_USUARIO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ES_MASTER: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  PERSONA: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'PERSONA',
      key: 'ID_PERSONA'
    }
  }
}, {
  sequelize,
  tableName: 'USUARIO',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_USUARIO" },
      ]
    },
    {
      name: "FK_USUARIO_PERSONA",
      using: "BTREE",
      fields: [
        { name: "PERSONA" },
      ]
    },
  ]
});

Usuario.belongsTo(Persona, { as: "Num_Persona", foreignKey: "PERSONA"});
Usuario.hasMany(DetalleCompra, { as: "Comprador", foreignKey: "USUARIO"});
Usuario.hasMany(DetalleVenta, { as: "Vendedor", foreignKey: "USUARIO"});

console.log('esta usuario conectado?', Usuario === sequelize.models.USUARIO)

module.exports = Usuario;
