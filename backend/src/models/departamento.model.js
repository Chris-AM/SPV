const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../config/db.config');
const Producto = require('./producto.model');

class Departamento extends Model{}

Departamento.init({
  ID_DEPARTAMENTO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NOMBRE_DEPARTAMENTO: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  DETALLE_DEPARTAMENTO: {
    type: DataTypes.STRING(1000),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'DEPARTAMENTO',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_DEPARTAMENTO" },
      ]
    },
  ]
})

Departamento.associations = function(models){
  Departamento.hasMany(models.Producto, {
    foreignKey: 'ID_DEPARTAMENTO',
    as: 'productos'
  });
}
module.exports = Departamento
