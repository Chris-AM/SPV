-- MySQL Script generated by MySQL Workbench
-- Thu Oct 21 09:20:33 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema inventario_spv
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `inventario_spv` ;

-- -----------------------------------------------------
-- Schema inventario_spv
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `inventario_spv` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `inventario_spv` ;

-- -----------------------------------------------------
-- Table `inventario_spv`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario_spv`.`producto` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `code_bar` INT NULL DEFAULT NULL,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `marca` VARCHAR(45) NULL DEFAULT NULL,
  `depto` VARCHAR(45) NULL DEFAULT NULL,
  `detalle` VARCHAR(45) NULL DEFAULT NULL,
  `cantidad` INT NULL DEFAULT NULL,
  `vencimiento` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id_producto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inventario_spv`.`medio_pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario_spv`.`medio_pago` (
  `id_medio_pago` INT NOT NULL AUTO_INCREMENT,
  `tipo_pago` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_medio_pago`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inventario_spv`.`compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario_spv`.`compra` (
  `id_compra` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NULL DEFAULT NULL,
  `monto` INT NULL DEFAULT NULL,
  `cantidad` INT NULL DEFAULT NULL,
  `id_med_pago` INT NULL DEFAULT NULL,
  `id_detalle_venta` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_compra`),
  CONSTRAINT `id_product`
    FOREIGN KEY (`id_producto`)
    REFERENCES `inventario_spv`.`producto` (`id_producto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `idx_med_pago`
    FOREIGN KEY (`id_med_pago`)
    REFERENCES `inventario_spv`.`medio_pago` (`id_medio_pago`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `id_producto_idx` ON `inventario_spv`.`compra` (`id_producto` ASC) VISIBLE;

CREATE INDEX `idx_med_pago_idx` ON `inventario_spv`.`compra` (`id_med_pago` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `inventario_spv`.`proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario_spv`.`proveedor` (
  `id_proveedor` INT NOT NULL AUTO_INCREMENT,
  `rut_empresa` VARCHAR(45) NULL DEFAULT NULL,
  `nombre_empresa` VARCHAR(45) NULL DEFAULT NULL,
  `fono` VARCHAR(45) NULL DEFAULT NULL,
  `direccion` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_proveedor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inventario_spv`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario_spv`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `rut` VARCHAR(45) NULL DEFAULT NULL,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `celular` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inventario_spv`.`detalle_compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario_spv`.`detalle_compra` (
  `id_detalle_compra` INT NOT NULL AUTO_INCREMENT,
  `id_compra` INT NULL DEFAULT NULL,
  `id_usuario` INT NULL DEFAULT NULL,
  `id_proveedor` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_detalle_compra`),
  CONSTRAINT `id_compra`
    FOREIGN KEY (`id_compra`)
    REFERENCES `inventario_spv`.`compra` (`id_compra`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `id_proveedor`
    FOREIGN KEY (`id_proveedor`)
    REFERENCES `inventario_spv`.`proveedor` (`id_proveedor`),
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `inventario_spv`.`usuario` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `idx_compra_idx` ON `inventario_spv`.`detalle_compra` (`id_compra` ASC) VISIBLE;

CREATE INDEX `idx_usuario_idx` ON `inventario_spv`.`detalle_compra` (`id_usuario` ASC) VISIBLE;

CREATE INDEX `idx_proveedor_idx` ON `inventario_spv`.`detalle_compra` (`id_proveedor` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `inventario_spv`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario_spv`.`cliente` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `rut` VARCHAR(45) NULL DEFAULT NULL,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `direccion` VARCHAR(45) NULL DEFAULT NULL,
  `fono` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_cliente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inventario_spv`.`venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario_spv`.`venta` (
  `id_venta` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NULL DEFAULT NULL,
  `monto` INT NULL DEFAULT NULL,
  `cantidad` INT NULL DEFAULT NULL,
  `id_medio_pago` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_venta`),
  CONSTRAINT `id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `inventario_spv`.`producto` (`id_producto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `idx_medio_pago`
    FOREIGN KEY (`id_medio_pago`)
    REFERENCES `inventario_spv`.`medio_pago` (`id_medio_pago`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `idx_producto_idx` ON `inventario_spv`.`venta` (`id_producto` ASC) VISIBLE;

CREATE INDEX `idx_medio_pago_idx` ON `inventario_spv`.`venta` (`id_medio_pago` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `inventario_spv`.`detalle_venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario_spv`.`detalle_venta` (
  `id_detalle_venta` INT NOT NULL AUTO_INCREMENT,
  `id_venta` INT NULL DEFAULT NULL,
  `id_usuario` INT NULL DEFAULT NULL,
  `id_cliente` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_detalle_venta`),
  CONSTRAINT `idx_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `inventario_spv`.`cliente` (`id_cliente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `idx_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `inventario_spv`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `idx_venta`
    FOREIGN KEY (`id_venta`)
    REFERENCES `inventario_spv`.`venta` (`id_venta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `idx_venta_idx` ON `inventario_spv`.`detalle_venta` (`id_venta` ASC) VISIBLE;

CREATE INDEX `idx_usuario_idx` ON `inventario_spv`.`detalle_venta` (`id_usuario` ASC) VISIBLE;

CREATE INDEX `idx_cliente_idx` ON `inventario_spv`.`detalle_venta` (`id_cliente` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `inventario_spv`.`caja`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario_spv`.`caja` (
  `id_caja` INT NOT NULL,
  `id_detalle_venta` INT NULL DEFAULT NULL,
  `id_detalle_compra` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_caja`),
  CONSTRAINT `idx_detalle_compra`
    FOREIGN KEY (`id_detalle_compra`)
    REFERENCES `inventario_spv`.`detalle_compra` (`id_detalle_compra`),
  CONSTRAINT `idx_detalle_venta`
    FOREIGN KEY (`id_detalle_venta`)
    REFERENCES `inventario_spv`.`detalle_venta` (`id_detalle_venta`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `id_detalle_compra_idx` ON `inventario_spv`.`caja` (`id_detalle_compra` ASC) VISIBLE;

CREATE INDEX `id_detalle_venta_idx` ON `inventario_spv`.`caja` (`id_detalle_venta` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `inventario_spv`.`hist_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario_spv`.`hist_producto` (
  `id_hist_producto` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NULL DEFAULT NULL,
  `veces_vendido` INT NULL DEFAULT NULL,
  `veces_comprado` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_hist_producto`),
  CONSTRAINT `idx_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `inventario_spv`.`producto` (`id_producto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `idx_producto_idx` ON `inventario_spv`.`hist_producto` (`id_producto` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;