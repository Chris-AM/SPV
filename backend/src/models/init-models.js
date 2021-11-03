const DataTypes = require("sequelize").DataTypes;
const _CAJA = require("./caja.model");
const _CLIENTE = require("./cliente.model");
const _COMPRA = require("./compra.model");
const _DEPARTAMENTO = require("./departamento.model");
const _DETALLE_COMPRA = require("./detalleCompra.model");
const _DETALLE_VENTA = require("./detalleVenta.model");
const _HISTORIAL_PRODUCTO = require("./historialProducto.model");
const _INVENTARIO = require("./inventario.model");
const _MEDIO_PAGO = require("./medioPago.model");
const _MOVIMIENTO = require("./movimiento.model");
const _PERSONA = require("./persona.model");
const _PRODUCTO = require("./producto.model");
const _PROVEEDOR = require("./proveedor.model");
const _USUARIO = require("./usuario.model");
const _VENTA = require("./venta.model");

function initModels(sequelize) {
  var CAJA = _CAJA(sequelize, DataTypes);
  var CLIENTE = _CLIENTE(sequelize, DataTypes);
  var COMPRA = _COMPRA(sequelize, DataTypes);
  var DEPARTAMENTO = _DEPARTAMENTO(sequelize, DataTypes);
  var DETALLE_COMPRA = _DETALLE_COMPRA(sequelize, DataTypes);
  var DETALLE_VENTA = _DETALLE_VENTA(sequelize, DataTypes);
  var HISTORIAL_PRODUCTO = _HISTORIAL_PRODUCTO(sequelize, DataTypes);
  var INVENTARIO = _INVENTARIO(sequelize, DataTypes);
  var MEDIO_PAGO = _MEDIO_PAGO(sequelize, DataTypes);
  var MOVIMIENTO = _MOVIMIENTO(sequelize, DataTypes);
  var PERSONA = _PERSONA(sequelize, DataTypes);
  var PRODUCTO = _PRODUCTO(sequelize, DataTypes);
  var PROVEEDOR = _PROVEEDOR(sequelize, DataTypes);
  var USUARIO = _USUARIO(sequelize, DataTypes);
  var VENTA = _VENTA(sequelize, DataTypes);

  DETALLE_VENTA.belongsTo(CLIENTE, { as: "CLIENTE_CLIENTE", foreignKey: "CLIENTE"});
  CLIENTE.hasMany(DETALLE_VENTA, { as: "DETALLE_VENTa", foreignKey: "CLIENTE"});
  INVENTARIO.belongsTo(CLIENTE, { as: "CLIENTE_CLIENTE", foreignKey: "CLIENTE"});
  CLIENTE.hasMany(INVENTARIO, { as: "INVENTARIOs", foreignKey: "CLIENTE"});
  DETALLE_COMPRA.belongsTo(COMPRA, { as: "COMPRA_COMPRA", foreignKey: "COMPRA"});
  COMPRA.hasMany(DETALLE_COMPRA, { as: "DETALLE_COMPRAs", foreignKey: "COMPRA"});
  PRODUCTO.belongsTo(DEPARTAMENTO, { as: "DEPARTAMENTO_DEPARTAMENTO", foreignKey: "DEPARTAMENTO"});
  DEPARTAMENTO.hasMany(PRODUCTO, { as: "PRODUCTOs", foreignKey: "DEPARTAMENTO"});
  CAJA.belongsTo(DETALLE_COMPRA, { as: "DETALLE_COMPRA_DETALLE_COMPRA", foreignKey: "DETALLE_COMPRA"});
  DETALLE_COMPRA.hasMany(CAJA, { as: "CAJAs", foreignKey: "DETALLE_COMPRA"});
  CAJA.belongsTo(DETALLE_VENTA, { as: "DETALLE_VENTA_DETALLE_VENTum", foreignKey: "DETALLE_VENTA"});
  DETALLE_VENTA.hasMany(CAJA, { as: "CAJAs", foreignKey: "DETALLE_VENTA"});
  COMPRA.belongsTo(MEDIO_PAGO, { as: "MEDIO_PAGO_MEDIO_PAGO", foreignKey: "MEDIO_PAGO"});
  MEDIO_PAGO.hasMany(COMPRA, { as: "COMPRAs", foreignKey: "MEDIO_PAGO"});
  VENTA.belongsTo(MEDIO_PAGO, { as: "MEDIO_PAGO_MEDIO_PAGO", foreignKey: "MEDIO_PAGO"});
  MEDIO_PAGO.hasMany(VENTA, { as: "VENTa", foreignKey: "MEDIO_PAGO"});
  COMPRA.belongsTo(MOVIMIENTO, { as: "INFORMACION_MOVIMIENTO_MOVIMIENTO", foreignKey: "INFORMACION_MOVIMIENTO"});
  MOVIMIENTO.hasMany(COMPRA, { as: "COMPRAs", foreignKey: "INFORMACION_MOVIMIENTO"});
  VENTA.belongsTo(MOVIMIENTO, { as: "INFORMACION_MOVIMIENTO_MOVIMIENTO", foreignKey: "INFORMACION_MOVIMIENTO"});
  MOVIMIENTO.hasMany(VENTA, { as: "VENTa", foreignKey: "INFORMACION_MOVIMIENTO"});
  CLIENTE.belongsTo(PERSONA, { as: "PERSONA_PERSONA", foreignKey: "PERSONA"});
  PERSONA.hasMany(CLIENTE, { as: "CLIENTEs", foreignKey: "PERSONA"});
  USUARIO.belongsTo(PERSONA, { as: "PERSONA_PERSONA", foreignKey: "PERSONA"});
  PERSONA.hasMany(USUARIO, { as: "USUARIOs", foreignKey: "PERSONA"});
  COMPRA.belongsTo(PRODUCTO, { as: "PRODUCTO_PRODUCTO", foreignKey: "PRODUCTO"});
  PRODUCTO.hasMany(COMPRA, { as: "COMPRAs", foreignKey: "PRODUCTO"});
  HISTORIAL_PRODUCTO.belongsTo(PRODUCTO, { as: "PRODUCTO_PRODUCTO", foreignKey: "PRODUCTO"});
  PRODUCTO.hasMany(HISTORIAL_PRODUCTO, { as: "HISTORIAL_PRODUCTOs", foreignKey: "PRODUCTO"});
  INVENTARIO.belongsTo(PRODUCTO, { as: "PRODUCTO_PRODUCTO", foreignKey: "PRODUCTO"});
  PRODUCTO.hasMany(INVENTARIO, { as: "INVENTARIOs", foreignKey: "PRODUCTO"});
  VENTA.belongsTo(PRODUCTO, { as: "PRODUCTO_PRODUCTO", foreignKey: "PRODUCTO"});
  PRODUCTO.hasMany(VENTA, { as: "VENTa", foreignKey: "PRODUCTO"});
  DETALLE_COMPRA.belongsTo(PROVEEDOR, { as: "PROVEEDOR_PROVEEDOR", foreignKey: "PROVEEDOR"});
  PROVEEDOR.hasMany(DETALLE_COMPRA, { as: "DETALLE_COMPRAs", foreignKey: "PROVEEDOR"});
  INVENTARIO.belongsTo(PROVEEDOR, { as: "PROVEEDOR_PROVEEDOR", foreignKey: "PROVEEDOR"});
  PROVEEDOR.hasMany(INVENTARIO, { as: "INVENTARIOs", foreignKey: "PROVEEDOR"});
  DETALLE_COMPRA.belongsTo(USUARIO, { as: "USUARIO_USUARIO", foreignKey: "USUARIO"});
  USUARIO.hasMany(DETALLE_COMPRA, { as: "DETALLE_COMPRAs", foreignKey: "USUARIO"});
  DETALLE_VENTA.belongsTo(USUARIO, { as: "USUARIO_USUARIO", foreignKey: "USUARIO"});
  USUARIO.hasMany(DETALLE_VENTA, { as: "DETALLE_VENTa", foreignKey: "USUARIO"});
  DETALLE_VENTA.belongsTo(VENTA, { as: "VENTA_VENTum", foreignKey: "VENTA"});
  VENTA.hasMany(DETALLE_VENTA, { as: "DETALLE_VENTa", foreignKey: "VENTA"});

  return {
    CAJA,
    CLIENTE,
    COMPRA,
    DEPARTAMENTO,
    DETALLE_COMPRA,
    DETALLE_VENTA,
    HISTORIAL_PRODUCTO,
    INVENTARIO,
    MEDIO_PAGO,
    MOVIMIENTO,
    PERSONA,
    PRODUCTO,
    PROVEEDOR,
    USUARIO,
    VENTA,
  };
}
module.exports = {initModels};