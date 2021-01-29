DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE departments (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	PRIMARY KEY (id)
);

CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(30),
	salary DECIMAL,
	department_id INT,
	PRIMARY KEY(id),
	FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	role_id INT,
	manager_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (manager_id) REFERENCES employees(id),
	FOREIGN KEY (role_id) REFERENCES roles(id)
);