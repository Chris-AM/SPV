const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return VENTA.init(sequelize, DataTypes);
}

class VENTA extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    ID_VENTA: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PRODUCTO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PRODUCTO',
        key: 'ID_PRODUCTO'
      }
    },
    MEDIO_PAGO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MEDIO_PAGO',
        key: 'ID_MEDIO_PAGO'
      }
    },
    INFORMACION_MOVIMIENTO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MOVIMIENTO',
        key: 'ID_MOVIMIENTO'
      }
    }
  }, {
    sequelize,
    tableName: 'VENTA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_VENTA" },
        ]
      },
      {
        name: "FK_VENTA_PRODUCTO",
        using: "BTREE",
        fields: [
          { name: "PRODUCTO" },
        ]
      },
      {
        name: "FK_VENTA_MEDIO_PAGO",
        using: "BTREE",
        fields: [
          { name: "MEDIO_PAGO" },
        ]
      },
      {
        name: "FK_VENTA_MOVIMIENTO",
        using: "BTREE",
        fields: [
          { name: "INFORMACION_MOVIMIENTO" },
        ]
      },
    ]
  });
  return VENTA;
  }
}
