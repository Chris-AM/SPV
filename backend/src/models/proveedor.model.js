const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db.config');
const DetalleCompra = require('./detalleCompra.model');
const Inventario = require('./inventario.model');

class Proveedor extends Model { }

Proveedor.init({
  ID_PROVEEDOR: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  RUT_EMPRESA: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
  NOMBRE_EMPRESA: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
  FONO: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  DIRECCION: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'PROVEEDOR',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_PROVEEDOR" },
      ]
    },
  ]
});

Proveedor.associations = function (models) {
  Proveedor.hasMany(models.DetalleCompra, {
    foreignKey: 'ID_PROVEEDOR',
    as: 'detalleCompras'
  });
  Proveedor.hasMany(models.Inventario, {
    foreignKey: 'ID_PROVEEDOR',
    as: 'inventarios'
  });
}

module.exports = Proveedor
