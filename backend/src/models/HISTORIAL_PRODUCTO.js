const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return HISTORIAL_PRODUCTO.init(sequelize, DataTypes);
}

class HISTORIAL_PRODUCTO extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    ID_HISTORIAL_PRODUCTO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VECES_VENDIDO: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    VECES_COMPRADO: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PRODUCTO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PRODUCTO',
        key: 'ID_PRODUCTO'
      }
    }
  }, {
    sequelize,
    tableName: 'HISTORIAL_PRODUCTO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_HISTORIAL_PRODUCTO" },
        ]
      },
      {
        name: "FK_HISTORIAL_PRODUCTO_PRODUCTO",
        using: "BTREE",
        fields: [
          { name: "PRODUCTO" },
        ]
      },
    ]
  });
  return HISTORIAL_PRODUCTO;
  }
}
