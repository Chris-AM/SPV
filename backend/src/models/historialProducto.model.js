const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db.config');
const Producto = require('./producto.model');

class HistorialProducto extends Model { }

HistorialProducto.init({
  ID_HISTORIAL_PRODUCTO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  VECES_VENDIDO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  VECES_COMPRADO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  PRODUCTO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'PRODUCTO',
      key: 'ID_PRODUCTO'
    }
  }
}, {
  sequelize,
  tableName: 'HISTORIAL_PRODUCTO',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_HISTORIAL_PRODUCTO" },
      ]
    },
    {
      name: "FK_HISTORIAL_PRODUCTO_PRODUCTO",
      using: "BTREE",
      fields: [
        { name: "PRODUCTO" },
      ]
    },
  ]
})

HistorialProducto.associations = function (models) {
  HistorialProducto.belongsTo(models.Producto, { as: "Producto", foreignKey: "PRODUCTO" });
}
module.exports = HistorialProducto;
