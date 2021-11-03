const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return INVENTARIO.init(sequelize, DataTypes);
}

class INVENTARIO extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    ID_INVENTARIO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CANTIDAD: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PRECIO_COMPRA: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PRECIO_VENTA: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PRODUCTO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PRODUCTO',
        key: 'ID_PRODUCTO'
      }
    },
    PROVEEDOR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PROVEEDOR',
        key: 'ID_PROVEEDOR'
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
    tableName: 'INVENTARIO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_INVENTARIO" },
        ]
      },
      {
        name: "FK_INVENTARIO_PRODUCTO",
        using: "BTREE",
        fields: [
          { name: "PRODUCTO" },
        ]
      },
      {
        name: "FK_INVENTARIO_PROVEEDOR",
        using: "BTREE",
        fields: [
          { name: "PROVEEDOR" },
        ]
      },
      {
        name: "FK_INVENTARIO_CLIENTE",
        using: "BTREE",
        fields: [
          { name: "CLIENTE" },
        ]
      },
    ]
  });
  return INVENTARIO;
  }
}
