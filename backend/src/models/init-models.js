var DataTypes = require("sequelize").DataTypes;
var _CAJA = require("./CAJA");
var _CLIENTE = require("./CLIENTE");
var _COMPRA = require("./COMPRA");
var _DEPARTAMENTO = require("./DEPARTAMENTO");
var _DETALLE_COMPRA = require("./DETALLE_COMPRA");
var _DETALLE_VENTA = require("./DETALLE_VENTA");
var _HISTORIAL_PRODUCTO = require("./HISTORIAL_PRODUCTO");
var _INVENTARIO = require("./INVENTARIO");
var _MEDIO_PAGO = require("./MEDIO_PAGO");
var _MOVIMIENTO = require("./MOVIMIENTO");
var _PERSONA = require("./PERSONA");
var _PRODUCTO = require("./PRODUCTO");
var _PROVEEDOR = require("./PROVEEDOR");
var _USUARIO = require("./USUARIO");
var _VENTA = require("./VENTA");

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