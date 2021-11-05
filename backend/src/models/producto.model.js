const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db.config');
const Compra = require('./compra.model');
//const Departamento = require('./departamento.model');
//const HistorialProducto = require('./historialProducto.model');
const Inventario = require('./inventario.model');
const Venta = require('./venta.model');

class Producto extends Model { }

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

Producto.associations = function (models) {
  Producto.hasMany(models.Compra, {
    foreignKey: 'ID_PRODUCTO',
    as: 'compras'
  });
  Producto.hasMany(models.Inventario, {
    foreignKey: 'ID_PRODUCTO',
    as: 'inventarios'
  });
  Producto.hasMany(models.Venta, {
    foreignKey: 'ID_PRODUCTO',
    as: 'ventas'
  });
  Producto.hasMany(models.HistorialProducto, {
    foreignKey: 'ID_PRODUCTO',
    as: 'historial-producto'
  });
  Producto.belongsTo(models.Departamento, {
    foreignKey: 'DEPARTAMENTO',
    as: 'departamento'
  });

}

console.log('tabla producto conectada?', Producto === sequelize.models.Producto)

module.exports = Producto;
