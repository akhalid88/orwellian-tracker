USE employee_DB;

INSERT INTO departments (name)
VALUES ("Human Resources");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 60000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Charles", "Xavier", 1, 1);