const mysql = require("mysql2/promise");
const mysqlConnection = require("./mysqlconnection");
const inquirer = require("inquirer");

async function viewEmployees() {
  connection = await mysql.createConnection(mysqlConnection);
  // Displays employee data from different tables
  const [employeeData] = await connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (department.id = role.department_id)"
  );
  // CONCAT(employee.first_name, ' ', employee.last_name) AS manager
  console.table(employeeData);
}

async function addEmployee() {
  // Establish connection
  connection = await mysql.createConnection(mysqlConnection);
  // Get role and employee data from database
  const [roles] = await connection.query("SELECT title FROM role");
  const rolesArr = roles.map((element) => element.title);
  const [employees] = await connection.query(
    "SELECT first_name, last_name FROM employee"
  );
  const employeesArr = employees.map(
    (element) => element.first_name + " " + element.last_name
  );
  // Add an option to not include a manager when creating employee
  employeesArr.push("Not applicable");

  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: rolesArr,
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        name: "manager",
        choices: employeesArr,
      },
    ])
    .then(async function (response) {
      // Match role ID to its name and insert into table
      const [roleId] = await connection.query("SELECT id FROM role WHERE ?", {
        title: response.role,
      });
      if (response.manager === "Not applicable") {
        const [
          results,
        ] = await connection.query(
          "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)",
          [response.firstName, response.lastName, roleId[0].id]
        );
        console.log(
          `${response.firstName} ${response.lastName} has been added to the database.`
        );
      } else {
        // Match manager name to employee ID and insert into table
        const [managerId] = await connection.query(
          "SELECT id FROM employee WHERE ? AND ?",
          [
            {
              first_name: response.manager.split(" ")[0],
            },
            {
              last_Name: response.manager.split(" ")[1],
            },
          ]
        );
        const [
          results,
        ] = await connection.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [response.firstName, response.lastName, roleId[0].id, managerId[0].id]
        );
        console.log(
          `${response.firstName} ${response.lastName} has been added to the database.`
        );
      }
    });
}

async function deleteEmployee() {
  connection = await mysql.createConnection(mysqlConnection);
  const [employees] = await connection.query(
    "SELECT first_name, last_name FROM employee"
  );
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the emoloyee you want to delete?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the last name of the emoloyee you want to delete?",
        name: "lastName",
      },
    ])
    .then(async function (response) {
      if (
        employees.some(
          (employee) => employee.first_name === response.firstName
        ) &&
        employees.some((employee) => employee.last_name === response.lastName)
      ) {
        const [
          deleteRow,
        ] = await connection.query("DELETE FROM employee WHERE ? and ?", [
          { first_name: response.firstName },
          { last_name: response.lastName },
        ]);
        console.log(`${deleteRow.affectedRows} employee has been deleted.`);
      } else {
        console.log("Employee does not exist.");
      }
    });
}

async function viewDepartments() {
  connection = await mysql.createConnection(mysqlConnection);
  const [departments] = await connection.query("SELECT * FROM department");
  console.table(departments);
}

async function addDepartment() {
  connection = await mysql.createConnection(mysqlConnection);
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of department you wish to add?",
        name: "departmentName",
      },
    ])
    .then(async function (response) {
      const [
        newDepartment,
      ] = await connection.query("INSERT INTO department (name) VALUES (?)", [
        response.departmentName,
      ]);
      console.log(`${response.departmentName} has been added.`);
    });
}

async function deleteDepartment() {
  connection = await mysql.createConnection(mysqlConnection);
  const [departments] = await connection.query("SELECT * FROM department");
  return inquirer
    .prompt([
      {
        type: "list",
        message: "Which department do you wish to delete?",
        name: "deleteDepartment",
        choices: departments,
      },
    ])
    .then(async function (response) {
      const [
        deleteRow,
      ] = await connection.query("DELETE FROM department WHERE ?", [
        { name: response.deleteDepartment },
      ]);
      console.log(`${deleteRow.affectedRows} department has been deleted.`);
    });
}

async function viewRoles() {
  connection = await mysql.createConnection(mysqlConnection);
  const [roles] = await connection.query(
    "SELECT title, salary, name AS department FROM role, department WHERE department.id = role.department_id"
  );
  console.table(roles);
}

module.exports = {
  addEmployee,
  viewEmployees,
  viewDepartments,
  viewRoles,
  deleteEmployee,
  addDepartment,
  deleteDepartment,
};
