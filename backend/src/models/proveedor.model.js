const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROVEEDOR', {
    ID_PROVEEDOR: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RUT_EMPRESA: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    NOMBRE_EMPRESA: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    FONO: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    DIRECCION: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PROVEEDOR',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_PROVEEDOR" },
        ]
      },
    ]
  });
};
