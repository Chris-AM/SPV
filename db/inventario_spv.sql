DROP USER IF EXISTS 'db_admin' @'localhost';
CREATE USER 'db_admin' @'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'db_admin' @'localhost';
DROP SCHEMA IF EXISTS `INVENTARIO_SPV`;
-- -----------------------------------------------------
-- Schema INVENTARIO_SPV
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `INVENTARIO_SPV`;
USE `INVENTARIO_SPV`;
-- TABLA PERSONA
DROP TABLE IF EXISTS PERSONA;
CREATE TABLE PERSONA(
  ID_PERSONA INT AUTO_INCREMENT PRIMARY KEY,
  NOMBRE VARCHAR(50) NOT NULL,
  RUT VARCHAR(12) NOT NULL,
  CELULAR VARCHAR(10) NOT NULL,
  DIRECCION VARCHAR(50)
  /*
   createdAt: false,
   updatedAt: false,
   */
);
-- TABLA USUARIO
DROP TABLE IF EXISTS USUARIO;
CREATE TABLE USUARIO (
  ID_USUARIO INT AUTO_INCREMENT PRIMARY KEY,
  ES_MASTER TINYINT(1) NOT NULL,
  CREATEDAT DATE,
  UPDATEDAT DATE
);
-- TABLA PROVEEDOR
DROP TABLE IF EXISTS PROVEEDOR;
CREATE TABLE PROVEEDOR(
  ID_PROVEEDOR INT AUTO_INCREMENT PRIMARY KEY,
  RUT_EMPRESA VARCHAR(12) NOT NULL,
  NOMBRE_EMPRESA VARCHAR(12) NOT NULL,
  FONO VARCHAR(10) NOT NULL,
  DIRECCION VARCHAR(50) NOT NULL,
  CREATEDAT DATE,
  UPDATEDAT DATE
);
-- TABLA CLIENTE
DROP TABLE IF EXISTS CLIENTE;
CREATE TABLE CLIENTE(
  ID_CLIENTE INT AUTO_INCREMENT PRIMARY KEY,
  CREATEDAT DATE,
  UPDATEDAT DATE
);
-- TABLA PRODUCTO
DROP TABLE IF EXISTS PRODUCTO;
CREATE TABLE PRODUCTO(
  ID_PRODUCTO INT AUTO_INCREMENT PRIMARY KEY,
  CODE_BAR INT NOT NULL,
  NOMBRE_PRODUCTO VARCHAR(50) NOT NULL,
  MARCA VARCHAR(50) NOT NULL,
  DETALLE_PRODUCTO VARCHAR(1000),
  PRECIO_COMPRA INT NOT NULL,
  PRECIO_VENTA INT NOT NULL,
  VENCE DATE,
  CREATEDAT DATE,
  UPDATEDAT DATE
);
-- TABLA INVENTARIO
DROP TABLE IF EXISTS INVENTARIO;
CREATE TABLE INVENTARIO(
  ID_INVENTARIO INT AUTO_INCREMENT PRIMARY KEY,
  CANTIDAD INT NOT NULL,
  CANTIDAD INT,
  CREATEDAT DATE,
  UPDATEDAT DATE
);
-- TABLA DEPARTAMENTO
DROP TABLE IF EXISTS DEPARTAMENTO;
CREATE TABLE DEPARTAMENTO(
  ID_DEPARTAMENTO INT AUTO_INCREMENT PRIMARY KEY,
  NOMBRE_DEPARTAMENTO VARCHAR(50) NOT NULL,
  DETALLE_DEPARTAMENTO VARCHAR(1000) NOT NULL,
  CREATEDAT DATE,
  UPDATEDAT DATE
);
-- TABLA HISTORIAL_PRODUCTO
DROP TABLE IF EXISTS HISTORIAL_PRODUCTO;
CREATE TABLE HISTORIAL_PRODUCTO(
  ID_HISTORIAL_PRODUCTO INT AUTO_INCREMENT PRIMARY KEY,
  VECES_VENDIDO INT,
  VECES_COMPRADO INT,
  CREATEDAT DATE,
  UPDATEDAT DATE
);
-- TABLA MOVIMIENTO
DROP TABLE IF EXISTS MOVIMIENTO;
CREATE TABLE MOVIMIENTO(
  ID_MOVIMIENTO INT AUTO_INCREMENT PRIMARY KEY,
  MONTO INT NOT NULL,
  CANTIDAD_PRODUCTOS INT NOT NULL,
  CREATEDAT DATE,
  UPDATEDAT DATE
);
-- TABLA VENTA
DROP TABLE IF EXISTS VENTA;
CREATE TABLE VENTA(
  ID_VENTA INT AUTO_INCREMENT PRIMARY KEY
  /**
   TODO:
   MOVIMIENTO -> VENTA
   */
);
-- TABLA MEDIO_PAGO
DROP TABLE IF EXISTS MEDIO_PAGO;
CREATE TABLE MEDIO_PAGO(
  ID_MEDIO_PAGO INT AUTO_INCREMENT PRIMARY KEY,
  TIPO_MEDIO_PAGO VARCHAR(10) NOT NULL,
  CREATEDAT DATE,
  UPDATEDAT DATE
);
-- TABLE DETALLE_VENTA
DROP TABLE IF EXISTS DETALLE_VENTA;
CREATE TABLE DETALLE_VENTA(
  ID_DETALLE_VENTA INT AUTO_INCREMENT PRIMARY KEY,
  CREATEDAT DATE,
  UPDATEDAT DATE
);
-- CREATE TABLE COMPRA
DROP TABLE IF EXISTS COMPRA;
CREATE TABLE COMPRA(
  ID_COMPRA INT AUTO_INCREMENT PRIMARY KEY
  /**
   TODO:
   MOVIMIENTO -> COMPRA
   */
);
-- TABLA DETALLE_COMPRA
DROP TABLE IF EXISTS DETALLE_COMPRA;
CREATE TABLE DETALLE_COMPRA(
  ID_DETALLE_COMPRA INT AUTO_INCREMENT PRIMARY KEY,
  CREATEDAT DATE,
  UPDATEDAT DATE
);
-- TABLA CAJA
DROP TABLE IF EXISTS CAJA;
CREATE TABLE CAJA(
  ID_CAJA INT AUTO_INCREMENT PRIMARY KEY,
  CREATEDAT DATE,
  UPDATEDAT DATE
);
-- CONEXIONES!!
/*
 PERSONA
 */
- - PERSONA->USUARIO
ALTER TABLE USUARIO
ADD PERSONA INT;
ALTER TABLE USUARIO
ADD CONSTRAINT FK_USUARIO_PERSONA FOREIGN KEY (PERSONA) REFERENCES PERSONA(ID_PERSONA);
- - PERSONA->CLIENTE
ALTER TABLE CLIENTE
ADD PERSONA INT;
ALTER TABLE CLIENTE
ADD CONSTRAINT FK_CLIENTE_PERSONA FOREIGN KEY (PERSONA) REFERENCES PERSONA(ID_PERSONA);
- - DEPARTAMENTO->PRODUCTO
ALTER TABLE PRODUCTO
ADD DEPARTAMENTO INT;
ALTER TABLE PRODUCTO
ADD CONSTRAINT FK_PRODUCTO_DEPARTAMENTO FOREIGN KEY (DEPARTAMENTO) REFERENCES DEPARTAMENTO(ID_DEPARTAMENTO);
- - PRODUCTO->INVENTARIO
ALTER TABLE INVENTARIO
ADD PRODUCTO INT;
ALTER TABLE INVENTARIO
ADD CONSTRAINT FK_INVENTARIO_PRODUCTO FOREIGN KEY (PRODUCTO) REFERENCES PRODUCTO(ID_PRODUCTO);
- - PROVEDOR->INVENTARIO
ALTER TABLE INVENTARIO
ADD PROVEEDOR INT;
ALTER TABLE INVENTARIO
ADD CONSTRAINT FK_INVENTARIO_PROVEEDOR FOREIGN KEY (PROVEEDOR) REFERENCES PROVEEDOR(ID_PROVEEDOR);
- - CLIENTE->INVENTARIO
ALTER TABLE INVENTARIO
ADD CLIENTE INT;
ALTER TABLE INVENTARIO
ADD CONSTRAINT FK_INVENTARIO_CLIENTE FOREIGN KEY (CLIENTE) REFERENCES CLIENTE(ID_CLIENTE);
- - PRODUCTO->HISTORIAL_PRODUCTO
ALTER TABLE HISTORIAL_PRODUCTO
ADD PRODUCTO INT;
ALTER TABLE HISTORIAL_PRODUCTO
ADD CONSTRAINT FK_HISTORIAL_PRODUCTO_PRODUCTO FOREIGN KEY (PRODUCTO) REFERENCES PRODUCTO(ID_PRODUCTO);
- - PRODUCTO->VENTA
ALTER TABLE VENTA
ADD PRODUCTO INT;
ALTER TABLE VENTA
ADD CONSTRAINT FK_VENTA_PRODUCTO FOREIGN KEY (PRODUCTO) REFERENCES PRODUCTO(ID_PRODUCTO);
- - MEDIO_PAGO->VENTA
ALTER TABLE VENTA
ADD MEDIO_PAGO INT;
ALTER TABLE VENTA
ADD CONSTRAINT FK_VENTA_MEDIO_PAGO FOREIGN KEY (MEDIO_PAGO) REFERENCES MEDIO_PAGO(ID_MEDIO_PAGO);
- - VENTA->DETALLE_VENTA
ALTER TABLE DETALLE_VENTA
ADD VENTA INT;
ALTER TABLE DETALLE_VENTA
ADD CONSTRAINT FK_DETALLE_VENTA_VENTA FOREIGN KEY (VENTA) REFERENCES VENTA(ID_VENTA);
- - USUARIO->DETALLE_VENTA
ALTER TABLE DETALLE_VENTA
ADD USUARIO INT;
ALTER TABLE DETALLE_VENTA
ADD CONSTRAINT FK_DETALLE_VENTA_USUARIO FOREIGN KEY (USUARIO) REFERENCES USUARIO(ID_USUARIO);
- - CLIENTE->DETALLE_VENTA
ALTER TABLE DETALLE_VENTA
ADD CLIENTE INT;
ALTER TABLE DETALLE_VENTA
ADD CONSTRAINT FK_DETALLE_VENTA_CLIENTE FOREIGN KEY (CLIENTE) REFERENCES CLIENTE(ID_CLIENTE);
- - PRODUCTO->COMPRA
ALTER TABLE COMPRA
ADD PRODUCTO INT;
ALTER TABLE COMPRA
ADD CONSTRAINT FK_COMPRA_PRODUCTO FOREIGN KEY (PRODUCTO) REFERENCES PRODUCTO(ID_PRODUCTO);
- - MEDIO_PAGO->COMPRA
ALTER TABLE COMPRA
ADD MEDIO_PAGO INT;
ALTER TABLE COMPRA
ADD CONSTRAINT FK_COMPRA_MEDIO_PAGO FOREIGN KEY (MEDIO_PAGO) REFERENCES MEDIO_PAGO(ID_MEDIO_PAGO);
- - COMPRA->DETALLE_COMPRA
ALTER TABLE DETALLE_COMPRA
ADD COMPRA INT;
ALTER TABLE DETALLE_COMPRA
ADD CONSTRAINT FK_DETALLE_COMPRA_COMPRA FOREIGN KEY (COMPRA) REFERENCES COMPRA(ID_COMPRA);
- - USUARIO->DETALLE_COMPRA
ALTER TABLE DETALLE_COMPRA
ADD USUARIO INT;
ALTER TABLE DETALLE_COMPRA
ADD CONSTRAINT FK_DETALLE_COMPRA_USUARIO FOREIGN KEY (USUARIO) REFERENCES USUARIO(ID_USUARIO);
- - PROVEEDOR->DETALLE_COMPRA
ALTER TABLE DETALLE_COMPRA
ADD PROVEEDOR INT;
ALTER TABLE DETALLE_COMPRA
ADD CONSTRAINT FK_DETALLE_COMPRA_PROVEEDOR FOREIGN KEY (PROVEEDOR) REFERENCES PROVEEDOR(ID_PROVEEDOR);
- - DETALLE_COMPRA->CAJA
ALTER TABLE CAJA
ADD DETALLE_COMPRA INT;
ALTER TABLE CAJA
ADD CONSTRAINT FK_CAJA_DETALLE_COMPRA FOREIGN KEY (DETALLE_COMPRA) REFERENCES DETALLE_COMPRA(ID_DETALLE_COMPRA);
- - DETALLE_VENTA->CAJA
ALTER TABLE CAJA
ADD DETALLE_VENTA INT;
ALTER TABLE CAJA
ADD CONSTRAINT FK_CAJA_DETALLE_VENTA FOREIGN KEY (DETALLE_VENTA) REFERENCES DETALLE_VENTA(ID_DETALLE_VENTA);
- - MOVIMIENTO->VENTA
ALTER TABLE VENTA
ADD INFORMACION_MOVIMIENTO INT;
ALTER TABLE VENTA
ADD CONSTRAINT FK_VENTA_MOVIMIENTO FOREIGN KEY (INFORMACION_MOVIMIENTO) REFERENCES MOVIMIENTO(ID_MOVIMIENTO);
- - MOVIMIENTO->COMPRA
ALTER TABLE COMPRA
ADD INFORMACION_MOVIMIENTO INT;
ALTER TABLE COMPRA
ADD CONSTRAINT FK_COMPRA_MOVIMIENTO FOREIGN KEY (INFORMACION_MOVIMIENTO) REFERENCES MOVIMIENTO(ID_MOVIMIENTO);
/**
 
 AGREGANDO DATOS
 
 */
DESCRIBE PRODUCTO;
INSERT INTO PRODUCTO (
    CODE_BAR,
    NOMBRE_PRODUCTO,
    MARCA,
    DETALLE_PRODUCTO,
    PRECIO_COMPRA,
    PRECIO_VENTA,
    VENCE
  )
VALUES (
    123456789,
    'Leche',
    'Colun',
    'Rica leche',
    350,
    500,
    '2020-01-01'
  );
SELECT *
FROM PRODUCTO;