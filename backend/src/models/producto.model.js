const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../config/db.config');
const Compra = require('./compra.model');
const Departamento = require('./departamento.model');
const HistorialProducto = require('./historialProducto.model');
const Inventario = require('./inventario.model');
const Venta = require('./venta.model');

class Producto extends Model{}

Producto.init({
  ID_PRODUCTO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CODE_BAR: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NOMBRE_PRODUCTO: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  MARCA: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  DETALLE_PRODUCTO: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  PRECIO_COMPRA: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PRECIO_VENTA: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  VENCE: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  DEPARTAMENTO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'DEPARTAMENTO',
      key: 'ID_DEPARTAMENTO'
    }
  }
}, {
  sequelize,
  tableName: 'PRODUCTO',
  timestamps: true,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_PRODUCTO" },
      ]
    },
    {
      name: "FK_PRODUCTO_DEPARTAMENTO",
      using: "BTREE",
      fields: [
        { name: "DEPARTAMENTO" },
      ]
    },
  ]
});

Producto.belongsTo(Departamento, { as: "DEPARTAMENTO_DEPARTAMENTO", foreignKey: "DEPARTAMENTO"});
Producto.hasMany(Compra, { as: "COMPRAs", foreignKey: "PRODUCTO"});
Producto.hasMany(HistorialProducto, { as: "HISTORIAL_PRODUCTOs", foreignKey: "PRODUCTO"});
Producto.hasMany(Inventario, { as: "INVENTARIOs", foreignKey: "PRODUCTO"});
Producto.hasMany(Venta, { as: "VENTa", foreignKey: "PRODUCTO"});

console.log('tabla producto conectada?', Producto === sequelize.models.Producto)

module.exports = Producto;
