const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize} = require('../config/db.config');
const Cliente = require('./cliente.model');
const Producto = require('./producto.model');
const Proveedor = require('./proveedor.model');

class Inventario extends Model {}

Inventario.init({
  ID_INVENTARIO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CANTIDAD: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PRODUCTO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'PRODUCTO',
      key: 'ID_PRODUCTO'
    }
  },
  PROVEEDOR: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'PROVEEDOR',
      key: 'ID_PROVEEDOR'
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
  tableName: 'INVENTARIO',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_INVENTARIO" },
      ]
    },
    {
      name: "FK_INVENTARIO_PRODUCTO",
      using: "BTREE",
      fields: [
        { name: "PRODUCTO" },
      ]
    },
    {
      name: "FK_INVENTARIO_PROVEEDOR",
      using: "BTREE",
      fields: [
        { name: "PROVEEDOR" },
      ]
    },
    {
      name: "FK_INVENTARIO_CLIENTE",
      using: "BTREE",
      fields: [
        { name: "CLIENTE" },
      ]
    },
  ]
});

Inventario.belongsTo(Cliente, { as: "CLIENTE_CLIENTE", foreignKey: "CLIENTE"});
Inventario.belongsTo(Producto, { as: "PRODUCTO_PRODUCTO", foreignKey: "PRODUCTO"});
Inventario.belongsTo(Proveedor, { as: "PROVEEDOR_PROVEEDOR", foreignKey: "PROVEEDOR"});

console.log('Inventario esta conectado?', Inventario === sequelize.model.INVENTARIO);

module.exports = Inventario;
