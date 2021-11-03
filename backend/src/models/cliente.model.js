const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return CLIENTE.init(sequelize, DataTypes);
}

class CLIENTE extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    ID_CLIENTE: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PERSONA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PERSONA',
        key: 'ID_PERSONA'
      }
    }
  }, {
    sequelize,
    tableName: 'CLIENTE',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_CLIENTE" },
        ]
      },
      {
        name: "FK_CLIENTE_PERSONA",
        using: "BTREE",
        fields: [
          { name: "PERSONA" },
        ]
      },
    ]
  });
  return CLIENTE;
  }
}
