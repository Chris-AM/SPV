const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return USUARIO.init(sequelize, DataTypes);
}

class USUARIO extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    ID_USUARIO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ES_MASTER: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
    tableName: 'USUARIO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_USUARIO" },
        ]
      },
      {
        name: "FK_USUARIO_PERSONA",
        using: "BTREE",
        fields: [
          { name: "PERSONA" },
        ]
      },
    ]
  });
  return USUARIO;
  }
}
