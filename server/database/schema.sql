SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_crtl_play
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_crtl_play` DEFAULT CHARACTER SET utf8 ;
USE `db_crtl_play` ;

-- -----------------------------------------------------
-- Table `db_crtl_play`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_crtl_play`.`user` ;

CREATE TABLE IF NOT EXISTS `db_crtl_play`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pseudo` VARCHAR(50) NULL,
  `password` VARCHAR(50) NULL,
  `avatar` VARCHAR(50) NULL DEFAULT "rayman",
  PRIMARY KEY (`id`),
  UNIQUE INDEX `pseudo_UNIQUE` (`pseudo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_crtl_play`.`game`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_crtl_play`.`game` ;

CREATE TABLE IF NOT EXISTS `db_crtl_play`.`game` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NULL,
  `year` INT NULL,
  `description` MEDIUMTEXT NULL,
  `image` VARCHAR(255) NULL,
  `image_2` VARCHAR(255) NULL,
  `note` FLOAT NULL,
  `website` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_crtl_play`.`publisher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_crtl_play`.`publisher` ;

CREATE TABLE IF NOT EXISTS `db_crtl_play`.`publisher` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_crtl_play`.`genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_crtl_play`.`genre` ;

CREATE TABLE IF NOT EXISTS `db_crtl_play`.`genre` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_crtl_play`.`game_shelf`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_crtl_play`.`game_shelf` ;

CREATE TABLE IF NOT EXISTS `db_crtl_play`.`game_shelf` (
  `user_id` INT NOT NULL,
  `game_id` INT NOT NULL,
  `finished` TINYINT NULL DEFAULT 0,
  `time_spent` INT NULL DEFAULT 0,
  `favorite` TINYINT NULL DEFAULT 0,
  `to_do` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`, `game_id`),
  INDEX `fk_user_has_game_game1_idx` (`game_id` ASC) VISIBLE,
  INDEX `fk_user_has_game_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_game_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `db_crtl_play`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_game_game1`
    FOREIGN KEY (`game_id`)
    REFERENCES `db_crtl_play`.`game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_crtl_play`.`tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_crtl_play`.`tag` ;

CREATE TABLE IF NOT EXISTS `db_crtl_play`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_crtl_play`.`game_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_crtl_play`.`game_tag` ;

CREATE TABLE IF NOT EXISTS `db_crtl_play`.`game_tag` (
  `game_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`game_id`, `tag_id`),
  INDEX `fk_game_has_tags_tags1_idx` (`tag_id` ASC) VISIBLE,
  INDEX `fk_game_has_tags_game1_idx` (`game_id` ASC) VISIBLE,
  CONSTRAINT `fk_game_has_tags_game1`
    FOREIGN KEY (`game_id`)
    REFERENCES `db_crtl_play`.`game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_game_has_tags_tags1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `db_crtl_play`.`tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_crtl_play`.`device`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_crtl_play`.`device` ;

CREATE TABLE IF NOT EXISTS `db_crtl_play`.`device` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_crtl_play`.`game_device`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_crtl_play`.`game_device` ;

CREATE TABLE IF NOT EXISTS `db_crtl_play`.`game_device` (
  `game_id` INT NOT NULL,
  `device_id` INT NOT NULL,
  PRIMARY KEY (`game_id`, `device_id`),
  INDEX `fk_game_has_device_device1_idx` (`device_id` ASC) VISIBLE,
  INDEX `fk_game_has_device_game1_idx` (`game_id` ASC) VISIBLE,
  CONSTRAINT `fk_game_has_device_game1`
    FOREIGN KEY (`game_id`)
    REFERENCES `db_crtl_play`.`game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_game_has_device_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `db_crtl_play`.`device` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_crtl_play`.`game_genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_crtl_play`.`game_genre` ;

CREATE TABLE IF NOT EXISTS `db_crtl_play`.`game_genre` (
  `game_id` INT NOT NULL,
  `genre_id` INT NOT NULL,
  PRIMARY KEY (`game_id`, `genre_id`),
  INDEX `fk_game_has_genre_genre1_idx` (`genre_id` ASC) VISIBLE,
  INDEX `fk_game_has_genre_game1_idx` (`game_id` ASC) VISIBLE,
  CONSTRAINT `fk_game_has_genre_game1`
    FOREIGN KEY (`game_id`)
    REFERENCES `db_crtl_play`.`game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_game_has_genre_genre1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `db_crtl_play`.`genre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_crtl_play`.`game_publisher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_crtl_play`.`game_publisher` ;

CREATE TABLE IF NOT EXISTS `db_crtl_play`.`game_publisher` (
  `game_id` INT NOT NULL,
  `publisher_id` INT NOT NULL,
  PRIMARY KEY (`game_id`, `publisher_id`),
  INDEX `fk_game_has_publisher_publisher1_idx` (`publisher_id` ASC) VISIBLE,
  INDEX `fk_game_has_publisher_game1_idx` (`game_id` ASC) VISIBLE,
  CONSTRAINT `fk_game_has_publisher_game1`
    FOREIGN KEY (`game_id`)
    REFERENCES `db_crtl_play`.`game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_game_has_publisher_publisher1`
    FOREIGN KEY (`publisher_id`)
    REFERENCES `db_crtl_play`.`publisher` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;