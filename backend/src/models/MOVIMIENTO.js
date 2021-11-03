const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return MOVIMIENTO.init(sequelize, DataTypes);
}

class MOVIMIENTO extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    ID_MOVIMIENTO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MONTO: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CANTIDAD_PRODUCTOS: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MOVIMIENTO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_MOVIMIENTO" },
        ]
      },
    ]
  });
  return MOVIMIENTO;
  }
}
