var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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
				// viewAllEmployees();
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

function addDepartment() {
	inquirer.prompt({
		message: "Name of dept you would like to add",
		type: "input",
		name: "answer"
	}).then(function (response) {
		var query = "INSERT INTO departments SET ?";
		connection.query(query, { name: response.answer }, function (err, data) {
			if (err) throw err;
			console.log(data.affectedRows + " department inserted!\n")
			start();
		});
	});
}

function viewDepartments() {
	var query = "SELECT * FROM departments";
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
		// console.log(data);
		data.forEach(element => {
			depts.push(element.dept_name);
		});

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
			console.log(response);

		});
	});
}

function viewRoles() {
	var query = "SELECT roles.id, roles.title, roles.salary, departments.name FROM roles LEFT JOIN departments ON roles.department_id=departments.id";
	connection.query(query, function (err, data) {
		if (err) throw err;
		console.log(data);
		console.table(['id', 'title', 'salary', 'department'], data);
		start();
	})
}

function viewAllEmployees() {
	// var query = "SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name, role.salary, employees.manager_id ";
	// query += "FROM employees"
	// connection.query(query, function (err, data) {
	// 	if (err) throw err;
	// 	// console.log(data);
	// 	console.table(data);
	// 	start();
	// });
}




//::MINIMUM:://
//What would you like to do?
	//ADD employees
		// first_name, last_name, role_id, manager_id
	//ADD roles
		//title, salary, dept_id
	//ADD department
		// name

	//VIEW employees
	//VIEW roles
	//VIEW department

	//UPDATE employee roles


	//::BONUS:://
	//UPDATE employee managers

	//VIEW employees by manager

	//DELETE employees
	//DELETE roles
	//DELETE departments

	//VIEW utilized budget