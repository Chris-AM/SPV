const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return MEDIO_PAGO.init(sequelize, DataTypes);
}

class MEDIO_PAGO extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    ID_MEDIO_PAGO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TIPO_MEDIO_PAGO: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MEDIO_PAGO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_MEDIO_PAGO" },
        ]
      },
    ]
  });
  return MEDIO_PAGO;
  }
}
