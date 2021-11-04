const {Sequelize, DataTypes, Model} = require('sequelize');
const  {sequelize} = require('../config/db.config');
const Caja = require('./caja.model');
const Cliente = require('./cliente.model');
const Usuario = require('./usuario.model');
const Venta = require('./venta.model');

class DetalleVenta extends Model {}

DetalleVenta.init({
  ID_DETALLE_VENTA: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  VENTA: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'VENTA',
      key: 'ID_VENTA'
    }
  },
  USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'USUARIO',
      key: 'ID_USUARIO'
    }
  },
  CLIENTE: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'CLIENTE',
      key: 'ID_CLIENTE'
    }
  }
}, {
  sequelize,
  tableName: 'DETALLE_VENTA',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_DETALLE_VENTA" },
      ]
    },
    {
      name: "FK_DETALLE_VENTA_VENTA",
      using: "BTREE",
      fields: [
        { name: "VENTA" },
      ]
    },
    {
      name: "FK_DETALLE_VENTA_USUARIO",
      using: "BTREE",
      fields: [
        { name: "USUARIO" },
      ]
    },
    {
      name: "FK_DETALLE_VENTA_CLIENTE",
      using: "BTREE",
      fields: [
        { name: "CLIENTE" },
      ]
    },
  ]

});

DetalleVenta.belongsTo(Usuario, { as: "Vendedor", foreignKey: "USUARIO"});
DetalleVenta.belongsTo(Venta, { as: "NroVenta", foreignKey: "VENTA"});
DetalleVenta.belongsTo(Cliente, { as: "CLIENTE_CLIENTE", foreignKey: "CLIENTE"});
DetalleVenta.hasMany(Caja, { as: "CAJAs", foreignKey: "DETALLE_VENTA"});

module.exports = DetalleVenta;
