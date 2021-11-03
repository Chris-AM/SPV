const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return DETALLE_VENTA.init(sequelize, DataTypes);
}

class DETALLE_VENTA extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    ID_DETALLE_VENTA: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VENTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'VENTA',
        key: 'ID_VENTA'
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
    CLIENTE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CLIENTE',
        key: 'ID_CLIENTE'
      }
    }
  }, {
    sequelize,
    tableName: 'DETALLE_VENTA',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_DETALLE_VENTA" },
        ]
      },
      {
        name: "FK_DETALLE_VENTA_VENTA",
        using: "BTREE",
        fields: [
          { name: "VENTA" },
        ]
      },
      {
        name: "FK_DETALLE_VENTA_USUARIO",
        using: "BTREE",
        fields: [
          { name: "USUARIO" },
        ]
      },
      {
        name: "FK_DETALLE_VENTA_CLIENTE",
        using: "BTREE",
        fields: [
          { name: "CLIENTE" },
        ]
      },
    ]
  });
  return DETALLE_VENTA;
  }
}
