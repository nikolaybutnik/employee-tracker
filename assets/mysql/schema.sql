DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE `role` (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(9 , 2 ) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT `department_id` FOREIGN KEY (department_id)
        REFERENCES department (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=INNODB;

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT `role_id` FOREIGN KEY (role_id)
        REFERENCES `role` (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    manager_id INT NULL,
    CONSTRAINT `manager_id` FOREIGN KEY (manager_id)
		REFERENCES employee (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)  ENGINE=INNODB;