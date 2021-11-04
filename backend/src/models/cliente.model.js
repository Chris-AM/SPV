const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../config/db.config');

const DetalleVenta = require('./detalleVenta.model');
const Inventario = require('./inventario.model');
const Persona = require('./persona.model');

class Cliente extends Model {}

Cliente.init({
  ID_CLIENTE: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
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
  tableName: 'CLIENTE',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_CLIENTE" },
      ]
    },
    {
      name: "FK_CLIENTE_PERSONA",
      using: "BTREE",
      fields: [
        { name: "PERSONA" },
      ]
    },
  ]
});


Cliente.hasMany(DetalleVenta, { as: "DETALLE_VENTa", foreignKey: "CLIENTE"});
Cliente.hasMany(Inventario, { as: "INVENTARIOs", foreignKey: "CLIENTE"});
Cliente.belongsTo(Persona, { as: "PERSONA_PERSONA", foreignKey: "PERSONA"});

console.log('Cliente esta conectado?', Cliente === sequelize.model.CLIENTE);

module.exports = Cliente
