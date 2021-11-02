import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _PRODUCTO from  "./PRODUCTO.js";

export default function initModels(sequelize) {
  const PRODUCTO = _PRODUCTO.init(sequelize, DataTypes);

  PRODUCTO.belongsTo(DEPARTAMENTO, { as: "DEPARTAMENTO_DEPARTAMENTO", foreignKey: "DEPARTAMENTO"});
  DEPARTAMENTO.hasMany(PRODUCTO, { as: "PRODUCTOs", foreignKey: "DEPARTAMENTO"});

  return {
    PRODUCTO,
  };
}
