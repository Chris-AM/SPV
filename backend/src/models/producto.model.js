const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return PRODUCTO.init(sequelize, DataTypes);
}

class PRODUCTO extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
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
    CANTIDAD: {
      type: DataTypes.INTEGER,
      allowNull: true
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
  return PRODUCTO;
  }
}
