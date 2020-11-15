-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema kfru
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kfru
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kfru` DEFAULT CHARACTER SET latin1 ;
USE `kfru` ;

-- -----------------------------------------------------
-- Table `kfru`.`students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kfru`.`students` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(30) NULL DEFAULT NULL,
  `lastname` VARCHAR(30) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = ndbcluster
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `kfru`.`grading`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kfru`.`grading` (
  `students_id` INT(11) NOT NULL,
  `subject` VARCHAR(45) NOT NULL,
  `grade` INT(11) NOT NULL,
  `passed` VARCHAR(1) NULL DEFAULT NULL,
  `submission_date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`students_id`, `subject`, `grade`),
  CONSTRAINT `fk_grading_students`
    FOREIGN KEY (`students_id`)
    REFERENCES `kfru`.`students` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = ndbcluster
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
