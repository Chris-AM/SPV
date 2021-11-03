const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PERSONA', {
    ID_PERSONA: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOMBRE: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    RUT: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    CELULAR: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    DIRECCION: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PERSONA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_PERSONA" },
        ]
      },
    ]
  });
};
