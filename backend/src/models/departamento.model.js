const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DEPARTAMENTO', {
    ID_DEPARTAMENTO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOMBRE_DEPARTAMENTO: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    DETALLE_DEPARTAMENTO: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'DEPARTAMENTO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_DEPARTAMENTO" },
        ]
      },
    ]
  });
};
