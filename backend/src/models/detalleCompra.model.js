const {Sequelize, DataTypes, Model} = require('sequelize');
const  {sequelize} = require('../config/db.config');
const Caja = require('./caja.model');
const Compra = require('./compra.model');
const Proveedor = require('./proveedor.model');
const Usuario = require('./usuario.model');

class DetalleCompra extends Model {}

DetalleCompra.init({
  ID_DETALLE_COMPRA: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  COMPRA: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'COMPRA',
      key: 'ID_COMPRA'
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
  PROVEEDOR: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'PROVEEDOR',
      key: 'ID_PROVEEDOR'
    }
  }
}, {
  sequelize,
  tableName: 'DETALLE_COMPRA',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_DETALLE_COMPRA" },
      ]
    },
    {
      name: "FK_DETALLE_COMPRA_COMPRA",
      using: "BTREE",
      fields: [
        { name: "COMPRA" },
      ]
    },
    {
      name: "FK_DETALLE_COMPRA_USUARIO",
      using: "BTREE",
      fields: [
        { name: "USUARIO" },
      ]
    },
    {
      name: "FK_DETALLE_COMPRA_PROVEEDOR",
      using: "BTREE",
      fields: [
        { name: "PROVEEDOR" },
      ]
    },
  ]

});

DetalleCompra.belongsTo(Compra, { as: "COMPRA_COMPRA", foreignKey: "COMPRA"});
DetalleCompra.hasMany(Caja, { as: "CAJAs", foreignKey: "DETALLE_COMPRA"});
DetalleCompra.belongsTo(Proveedor, { as: "PROVEEDOR_PROVEEDOR", foreignKey: "PROVEEDOR"});
DetalleCompra.belongsTo(Usuario, { as: "Comprador", foreignKey: "USUARIO"});

module.exports = DetalleCompra;