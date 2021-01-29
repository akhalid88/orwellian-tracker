USE employee_DB;

INSERT INTO departments (name)
VALUES ("Executive"), ("Human Resources"), ("Sales"), ("Engineering"), ("Legal"), ("Finance"), ("IT");

INSERT INTO roles (title, salary, department_id)
VALUES ("Director", 60000, 1), ("Accountant", 50000, 6), ("HR Manager", 40000, 2), ("Salesperson", 50000, 3), ("Software Engineer", 70000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Charles", "Xavier", 1, 1), ("Scott", "Summers", 3, 1), ("Henry", "McCoy", 5, 1), ("Jean", "Grey", 4, 1), ("Hisako", "Ichiki", null, 2);