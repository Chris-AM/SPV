const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../config/db.config');
const DetalleCompra = require('./detalleCompra.model');
const DetalleVenta = require('./detalleVenta.model');

class Caja extends Model{}

Caja.init({
  ID_CAJA: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  DETALLE_COMPRA: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'DETALLE_COMPRA',
      key: 'ID_DETALLE_COMPRA'
    }
  },
  DETALLE_VENTA: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'DETALLE_VENTA',
      key: 'ID_DETALLE_VENTA'
    }
  }
}, {
  sequelize,
  tableName: 'CAJA',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_CAJA" },
      ]
    },
    {
      name: "FK_CAJA_DETALLE_COMPRA",
      using: "BTREE",
      fields: [
        { name: "DETALLE_COMPRA" },
      ]
    },
    {
      name: "FK_CAJA_DETALLE_VENTA",
      using: "BTREE",
      fields: [
        { name: "DETALLE_VENTA" },
      ]
    },
  ]
})
Caja.associations = function (models) {
  Caja.belongsTo(models.DetalleCompra, { as: "DETALLE_COMPRA_DETALLE_COMPRA", foreignKey: "DETALLE_COMPRA"});
  Caja.belongsTo(models.DetalleVenta, { as: "DETALLE_VENTA_DETALLE_VENTum", foreignKey: "DETALLE_VENTA"});
}

module.exports = Caja;
