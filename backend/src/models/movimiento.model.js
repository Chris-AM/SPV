const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MOVIMIENTO', {
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
};
