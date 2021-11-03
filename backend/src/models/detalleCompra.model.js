const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DETALLE_COMPRA', {
    ID_DETALLE_COMPRA: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    COMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'COMPRA',
        key: 'ID_COMPRA'
      }
    },
    USUARIO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'USUARIO',
        key: 'ID_USUARIO'
      }
    },
    PROVEEDOR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PROVEEDOR',
        key: 'ID_PROVEEDOR'
      }
    }
  }, {
    sequelize,
    tableName: 'DETALLE_COMPRA',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_DETALLE_COMPRA" },
        ]
      },
      {
        name: "FK_DETALLE_COMPRA_COMPRA",
        using: "BTREE",
        fields: [
          { name: "COMPRA" },
        ]
      },
      {
        name: "FK_DETALLE_COMPRA_USUARIO",
        using: "BTREE",
        fields: [
          { name: "USUARIO" },
        ]
      },
      {
        name: "FK_DETALLE_COMPRA_PROVEEDOR",
        using: "BTREE",
        fields: [
          { name: "PROVEEDOR" },
        ]
      },
    ]
  });
};
