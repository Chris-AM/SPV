const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../config/db.config');
const DetalleCompra = require('./detalleCompra.model');
const MedioPago = require('./medioPago.model');
const Movimiento = require('./movimiento.model');
const Producto = require('./producto.model');

class Compra extends Model {}

Compra.init({
  ID_COMPRA: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  PRODUCTO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'PRODUCTO',
      key: 'ID_PRODUCTO'
    }
  },
  MEDIO_PAGO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'MEDIO_PAGO',
      key: 'ID_MEDIO_PAGO'
    }
  },
  INFORMACION_MOVIMIENTO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'MOVIMIENTO',
      key: 'ID_MOVIMIENTO'
    }
  }
}, {
  sequelize,
  tableName: 'COMPRA',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_COMPRA" },
      ]
    },
    {
      name: "FK_COMPRA_PRODUCTO",
      using: "BTREE",
      fields: [
        { name: "PRODUCTO" },
      ]
    },
    {
      name: "FK_COMPRA_MEDIO_PAGO",
      using: "BTREE",
      fields: [
        { name: "MEDIO_PAGO" },
      ]
    },
    {
      name: "FK_COMPRA_MOVIMIENTO",
      using: "BTREE",
      fields: [
        { name: "INFORMACION_MOVIMIENTO" },
      ]
    },
  ]
});

Compra.hasMany(DetalleCompra, { as: "DETALLE_COMPRAs", foreignKey: "COMPRA"});
Compra.belongsTo(MedioPago, { as: "MEDIO_PAGO_MEDIO_PAGO", foreignKey: "MEDIO_PAGO"});
Compra.belongsTo(Movimiento, { as: "INFORMACION_MOVIMIENTO_MOVIMIENTO", foreignKey: "INFORMACION_MOVIMIENTO"});
Compra.belongsTo(Producto, { as: "PRODUCTO_PRODUCTO", foreignKey: "PRODUCTO"});

module.exports = Compra;