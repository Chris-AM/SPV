const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../config/db.config');
const Compra = require('./compra.model');
const Venta = require('./venta.model');

class Movimiento extends Model{}

Movimiento.init({
  ID_MOVIMIENTO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  MONTO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CANTIDAD_PRODUCTOS: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'MOVIMIENTO',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_MOVIMIENTO" },
      ]
    },
  ]
});

Movimiento.associations = function(models) {
  Movimiento.hasMany(models.Compra, {
    foreignKey: 'ID_MOVIMIENTO',
    sourceKey: 'ID_MOVIMIENTO'
  });
  Movimiento.hasMany(models.Venta, {
    foreignKey: 'ID_MOVIMIENTO',
    sourceKey: 'ID_MOVIMIENTO'
  });
};
//Movimiento.hasMany(Compra, { as: "COMPRAs", foreignKey: "INFORMACION_MOVIMIENTO"});
//Movimiento.hasMany(Venta, { as: "VENTa", foreignKey: "INFORMACION_MOVIMIENTO"});

module.exports = Movimiento;
