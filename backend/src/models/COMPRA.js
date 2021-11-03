const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return COMPRA.init(sequelize, DataTypes);
}

class COMPRA extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    ID_COMPRA: {
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
    tableName: 'COMPRA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_COMPRA" },
        ]
      },
      {
        name: "FK_COMPRA_PRODUCTO",
        using: "BTREE",
        fields: [
          { name: "PRODUCTO" },
        ]
      },
      {
        name: "FK_COMPRA_MEDIO_PAGO",
        using: "BTREE",
        fields: [
          { name: "MEDIO_PAGO" },
        ]
      },
      {
        name: "FK_COMPRA_MOVIMIENTO",
        using: "BTREE",
        fields: [
          { name: "INFORMACION_MOVIMIENTO" },
        ]
      },
    ]
  });
  return COMPRA;
  }
}
