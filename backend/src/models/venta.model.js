const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../config/db.config');
const DetalleVenta = require('./detalleVenta.model');
const MedioPago = require('./medioPago.model');
const Movimiento = require('./movimiento.model');
const Producto = require('./producto.model');

class Venta extends Model {}

Venta.init({
  ID_VENTA: {
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
  tableName: 'VENTA',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_VENTA" },
      ]
    },
    {
      name: "FK_VENTA_PRODUCTO",
      using: "BTREE",
      fields: [
        { name: "PRODUCTO" },
      ]
    },
    {
      name: "FK_VENTA_MEDIO_PAGO",
      using: "BTREE",
      fields: [
        { name: "MEDIO_PAGO" },
      ]
    },
    {
      name: "FK_VENTA_MOVIMIENTO",
      using: "BTREE",
      fields: [
        { name: "INFORMACION_MOVIMIENTO" },
      ]
    },
  ]
});

Venta.associations = function (models){
  Venta.belongsTo(models.MedioPago, { as: "MEDIO_PAGO_MEDIO_PAGO", foreignKey: "MEDIO_PAGO"});
  Venta.belongsTo(models.Movimiento, { as: "INFORMACION_MOVIMIENTO_MOVIMIENTO", foreignKey: "INFORMACION_MOVIMIENTO"});
  Venta.belongsTo(models.Producto, { as: "PRODUCTO_PRODUCTO", foreignKey: "PRODUCTO"});
  Venta.hasMany(models.DetalleVenta, { as: "DETALLE_VENTa", foreignKey: "VENTA"});
}
module.exports = Venta;
