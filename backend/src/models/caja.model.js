const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return CAJA.init(sequelize, DataTypes);
}

class CAJA extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    ID_CAJA: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DETALLE_COMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DETALLE_COMPRA',
        key: 'ID_DETALLE_COMPRA'
      }
    },
    DETALLE_VENTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DETALLE_VENTA',
        key: 'ID_DETALLE_VENTA'
      }
    }
  }, {
    sequelize,
    tableName: 'CAJA',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_CAJA" },
        ]
      },
      {
        name: "FK_CAJA_DETALLE_COMPRA",
        using: "BTREE",
        fields: [
          { name: "DETALLE_COMPRA" },
        ]
      },
      {
        name: "FK_CAJA_DETALLE_VENTA",
        using: "BTREE",
        fields: [
          { name: "DETALLE_VENTA" },
        ]
      },
    ]
  });
  return CAJA;
  }
}
