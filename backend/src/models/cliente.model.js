const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CLIENTE', {
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
};
