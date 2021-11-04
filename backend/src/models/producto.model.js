const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PRODUCTO', {
    ID_PRODUCTO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CODE_BAR: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
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
};