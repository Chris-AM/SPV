const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../config/db.config');
const Compra = require('./compra.model');

class MedioPago extends Model {}

MedioPago.init({
  ID_MEDIO_PAGO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  TIPO_MEDIO_PAGO: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'MEDIO_PAGO',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_MEDIO_PAGO" },
      ]
    },
  ]
});

MedioPago.hasMany(Compra, { as: "COMPRAs", foreignKey: "MEDIO_PAGO"});
MedioPago.hasMany(Venta, { as: "VENTa", foreignKey: "MEDIO_PAGO"});


module.exports = MedioPago;
