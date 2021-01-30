var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "employee_DB"
});

connection.connect(function (err) {
	if (err) throw err;
	// console.log("connected as id " + connection.threadId + "\n");
	console.log(`User ${connection.threadId}, you are now connected to the Orwellian Aparatus. You may begin surveillance. \n`);
	start();
});

function start() {
	inquirer.prompt({
		message: "What would you like to do?",
		type: "list",
		name: "option",
		choices: [
			//Minimum requirements
			"View all employees", "View all roles", "View all departments",
			"Add employee", "Add role", "Add department",
			"Update employee roles",
			//Bonus points
			"Update employee managers", "View employees by manager",
			"Delete departments", "Delete roles", "Delete employees",
			"View utilized department budget", "Exit"
		]
	}).then(function (response) {
		switch (response.option) {
			//Minimum requirements
			case "View all employees":
				viewAllEmployees();
				break;
			case "View all roles":
				viewRoles();
				break;
			case "View all departments":
				viewDepartments();
				break;
			case "Add employee":
				break;
			case "Add role":
				addRole();
				break;
			case "Add department":
				addDepartment();
				break;
			case "Update employee roles":
				updateEmployeeRole();
				break;
			//Bonus points
			case "Update employee managers":
				break;
			case "View employees by manager":
				break;
			case "Delete employees":
				break;
			case "Delete roles":
				break;
			case "Delete departments":
				break;
			case "View utilized department budget":
				break;
			case "Exit":
				connection.end();
				break;
			default:
				break;
		}
	});
}

function viewAllEmployees() {
	var query = "SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.dept_name, CONCAT(m.first_name,' ', m.last_name) AS manager ";
	query += "FROM employees AS e LEFT JOIN roles AS r ON e.role_id = r.id ";
	query += "LEFT JOIN departments AS d ON r.department_id = d.id ";
	query += "LEFT JOIN employees AS m ON e.manager_id = m.id";
	connection.query(query, function (err, data) {
		if (err) throw err;
		console.table(data);
		start();
	});
}

function viewRoles() {
	var query = "SELECT roles.id, roles.title, roles.salary, departments.dept_name FROM roles LEFT JOIN departments ON roles.department_id=departments.id";
	connection.query(query, function (err, data) {
		if (err) throw err;
		console.table(data);
		start();
	})
}

function viewDepartments() {
	var query = "SELECT id, dept_name AS department FROM departments";
	connection.query(query, function (err, data) {
		if (err) throw err;
		console.table(data);
		start();
	});
}

function addRole() {
	var depts = [];
	connection.query("SELECT * FROM departments", function (err, data) {
		if (err) throw err;

		data.forEach(element => {
			depts.push(element.dept_name);
		});
		console.log(depts);
		inquirer.prompt([
			{
				message: "Enter role:",
				type: "input",
				name: "role_name"
			},
			{
				message: "How much does this role make?",
				type: "input",
				name: "money",
				validation: function (value) {
					if (isNaN(value === false)) { return true; }
					return false;
				}
			},
			{
				message: "Which department would you like to add a role to?",
				type: "list",
				name: "choice",
				choices: depts
			}
		]).then(function (response) {
			connection.query("SELECT id FROM departments WHERE dept_name = ?", [response.choice], function (err, data) {
				if (err) throw err;

				connection.query("INSERT INTO roles SET ?", {
					title: response.role_name,
					salary: response.money,
					department_id: data[0].id
				}, function (err, data) {
					if (err) throw err;
					start();
				});
			});
		});
	});
}

function addDepartment() {
	inquirer.prompt({
		message: "Name of dept you would like to add",
		type: "input",
		name: "answer"
	}).then(function (response) {
		var query = "INSERT INTO departments SET ?";
		connection.query(query, { dept_name: response.answer }, function (err, data) {
			if (err) throw err;
			console.log(data.affectedRows + " department inserted!\n")
			start();
		});
	});
}

function updateEmployeeRole() {
	inquirer.prompt([
		{
			message: "Select an employee to update:",
			type: "list",
			name: "person",
			choices: selectEmployees("employees", "first_name", "last_name", function (data) {
				return Object.values(data);
			})
		},
		{
			message: "Select a new role:",
			type: "list",
			name: "role",
			choices: selectRoles("roles", "title", function (data) {
				return Object.values(data);
			})
		}
	]).then(function (response) {
	});
}

function selectEmployees(table, column1, column2, cb) {
	var query = "SELECT CONCAT(id, '. ', ??, ' ', ??) FROM ??";
	connection.query(query, [column1, column2, table], function (err, res) {
		if (err) throw err;
		var data = [];
		res.forEach(element => data.push(element["CONCAT(id, '. ', `first_name`, ' ', `last_name`)"]));
		cb(data);
	});
}

function selectRoles(table, column1, cb) {
	var query = "SELECT CONCAT(id, '. ', ??) FROM ??";
	connection.query(query, [column1, table], function (err, res) {
		if (err) throw err;
		var data = [];
		res.forEach(element => data.push(element["CONCAT(id, '. ', `title`)"]));
		cb(data);
	});
}

function callBack(result) {
	return result;
}