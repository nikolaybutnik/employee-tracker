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

-- Insert department names --
INSERT INTO department (`name`)
VALUES ("Human Resources");
INSERT INTO department (`name`)
VALUES ("Engineering");
INSERT INTO department (`name`)
VALUES ("Finance");
INSERT INTO department (`name`)
VALUES ("Support");

-- Insert HR roles -- 
INSERT INTO `role` (title, salary, department_id)
VALUES ("HR Manager", 60000.00, 1);
INSERT INTO `role` (title, salary, department_id)
VALUES ("HR Assistant", 42000.00, 1);
-- Insert Engineering roles -- 
INSERT INTO `role` (title, salary, department_id)
VALUES ("Senior Engineer", 90000.00, 2);
INSERT INTO `role` (title, salary, department_id)
VALUES ("Junior Engineer", 55000.00, 2);
INSERT INTO `role` (title, salary, department_id)
VALUES ("Engineering Intern", 40000.00, 2);
-- Insert Finance roles -- 
INSERT INTO `role` (title, salary, department_id)
VALUES ("Accountant", 60000.00, 3);
-- Insert Support roles --
INSERT INTO `role` (title, salary, department_id)
VALUES ("Technical Support", 65000.00, 4);
INSERT INTO `role` (title, salary, department_id)
VALUES ("Reception", 45000.00, 4);
-- Insert employees --
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jane", "Smith", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Dallas", 2, 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Joseph", "Frigg", 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kyle", "Johnson", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Emma", "Vango", 5, 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Josh", "White", 6);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Andy", "Proone", 7);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Vanessa", "Holmes", 8);

SELECT * FROM department;
SELECT * FROM `role`;
SELECT * FROM employee;