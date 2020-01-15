-- DROP DATABASE IF EXISTS `employee_tracker_db`;
CREATE DATABASE IF NOT EXISTS `employee_tracker_db`;

USE `employee_tracker_db`;

-- DROP TABLE IF EXISTS `departments`;
CREATE TABLE IF NOT EXISTS departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- INSERTING DEPARTMENTS
INSERT INTO departments (name) VALUES ('Human Resources');
INSERT INTO departments (name) VALUES ('Information Technology');
INSERT INTO departments (name) VALUES ('Administration');
INSERT INTO departments (name) VALUES ('Software Development');
INSERT INTO departments (name) VALUES ('Marketing');
INSERT INTO departments (name) VALUES ('Business Development');

-- START INSERTING ROLES
-- HUMAN RESOURCES 1-4
INSERT INTO roles (title, salary, department_id) VALUES ('Head of HR', 75000.00, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('VP of HR', 45000.00, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Manager', 35000.00, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Intern', 15000.00, 1);

-- INFORMATION TECHNOLOGY 5-8
INSERT INTO roles (title, salary, department_id) VALUES ('Head of IT', 575000.00, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('VP of IT', 145000.00, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('IT Manager', 85000.00, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('IT Intern', 45000.00, 2);

-- ADMINISTRATION 9-12
INSERT INTO roles (title, salary, department_id) VALUES ('Head of Admin', 575000.00, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('VP of Admin', 445000.00, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Admin Manager', 135000.00, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Manager Apprentice', 15000.00, 3);

-- SOFTWARE DEVELOPMENT 13-16
INSERT INTO roles (title, salary, department_id) VALUES ('Head of Software Development', 375000.00, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('VP of Software Development', 245000.00, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Software Development Manager', 135000.00, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Software Development Intern', 15000.00, 4);

-- MARKETING 17-20
INSERT INTO roles (title, salary, department_id) VALUES ('Head of Marketing', 575000.00, 5);
INSERT INTO roles (title, salary, department_id) VALUES ('VP of Marketing', 345000.00, 5);
INSERT INTO roles (title, salary, department_id) VALUES ('Marketing Manager', 135000.00, 5);
INSERT INTO roles (title, salary, department_id) VALUES ('Marketing Intern', 15000.00, 5);

-- BUSINESS DEVELOMENT 21-24
INSERT INTO roles (title, salary, department_id) VALUES ('President & CEO', 575000.00, 6);
INSERT INTO roles (title, salary, department_id) VALUES ('VP of Business Development', 345000.00, 6);
INSERT INTO roles (title, salary, department_id) VALUES ('Business Development Manager', 135000.00, 6);
INSERT INTO roles (title, salary, department_id) VALUES ('Business Development Intern', 15000.00, 6);
-- END INSERTING ROLES

-- INSERTING EMPLOYEES
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Jack", "Black", 21, null); -- 1
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Oprah", "Winfrey", 1, null); -- 2
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Jack", "White", 2, 2); -- 3
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Black", 3, 3); -- 4
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Barbara", "Black", 5, null); -- 5
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Bernise", "Smith", 6, 5); -- 6
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Sam", "Wilson", 7, 6); -- 7
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Billy", "Joel", 13, null); -- 8
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Sammie", "Davis Jr.", 14, 8); -- 9
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Jason", "Kidd", 15, 9); -- 10
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Mike", "McCready", 17, null); -- 11
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Jones", 18, 11); -- 12
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Beyonce", "Knowles", 19, null); -- 13
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Numberone", "Dancer", 20, 13); -- 14
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Numbertwo", "Dancer", 20, 13); -- 15
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Numberthree", "Dancer", 20, 13); -- 16
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Tom", "Jones", 22, 1); -- 17
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Jack", "Stone", 23, 17); -- 18
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Jack", "Money", 23, 17); -- 19
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Jane", "Bologna", 24, 1); -- 20 

SELECT * FROM employees; -- WHERE manager_id IS NULL;

SELECT * FROM departments;
SELECT * FROM roles;
