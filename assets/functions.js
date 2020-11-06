// Dependencies for functions used in this file
const mysql = require("mysql2/promise");
const connection = require("./mysqlconnection");
const inquirer = require("inquirer");

// Display all relevant data to the user about every employee in the database using a series of JOIN statement to JOIN columns from multiple tables.
async function viewEmployees() {
  const [employeeData] = await connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON (employee.role_id = role.id) LEFT JOIN department ON (department.id = role.department_id) LEFT JOIN employee manager ON (manager.id = employee.manager_id);"
  );
  console.table(employeeData);
}

// Function that adds a new employee to the database.
// Create array of employee names and another array for role titles, and present as lists for user to select from. Name is entered manually.
// Add 'not applicable' option to array of employee names when asking the user if they want to assign a manager to the employee.
// Save the user's responses as variables and use the variables to INSERT the data into database.
// INSERT statements will vary slightly depending on whether a manager is being added or not.
async function addEmployee() {
  const [roles] = await connection.query("SELECT title FROM role");
  const rolesArr = roles.map((element) => element.title);
  const [employees] = await connection.query(
    "SELECT first_name, last_name FROM employee"
  );
  const employeesArr = employees.map(
    (element) => element.first_name + " " + element.last_name
  );
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

// Function that deletes an existing employee from the database.
// Create array of employee names to be used for matching the user responses to records in database.
// Collect the employee's first name and last name as manual inputs from the user. Match the first and last name to records in database using array.find() method.
// If the employee does not exist in the database, alert the user. Otherwise, proceed to DELETE the employee row from the database.
async function deleteEmployee() {
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

// Function that displays all departments to the user.
async function viewDepartments() {
  const [departments] = await connection.query("SELECT * FROM department");
  console.table(departments);
}

// Function that adds a new department to the database.
// Prompt the user to input the name of the new department and hold it as a variable. Use the variable to INSERT the data into the relevant table.
async function addDepartment() {
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

// Function that deletes an existing department from the database.
// Create array of departments and present as list for user to select from. Hold the user's choice as a variable.
// Use the variable in a DELETE statement to remove the relevant row from a relevant table in the database.
async function deleteDepartment() {
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

// Function that displays all the current roles and relevant data to the user.
async function viewRoles() {
  const [roles] = await connection.query(
    "SELECT title, salary, name AS department FROM role, department WHERE department.id = role.department_id"
  );
  console.table(roles);
}

// Function that adds a new role to the database.
// Create array of departments and present as list for user to select from. Department name and salary are entered manually. Hold the user's choices as variables.
// Obtain the department ID number from the name of the department that the user selected.
// INSERT the data into the relevant table in the database.
async function addRole() {
  const [departments] = await connection.query("SELECT * FROM department");
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of role you wish to add?",
        name: "roleName",
      },
      {
        type: "input",
        message: "Enter the salary for this role to two decimal places.",
        name: "roleSalary",
      },
      {
        type: "list",
        message: "Which department does this role belong to?",
        name: "roleDepartment",
        choices: departments,
      },
    ])
    .then(async function (response) {
      const departmentId = departments.find(
        (element) => element.name === response.roleDepartment
      ).id;
      const [
        newRole,
      ] = await connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
        [response.roleName, response.roleSalary, departmentId]
      );
      console.log(`${response.roleName} has been added.`);
    });
}

// Function that deletes an existing role from the database.
// Create an array of roles for present to user as a list ot select from. Use the selection in a DELETE statement to remove the relevant row from database.
async function deleteRole() {
  const [roles] = await connection.query("SELECT title FROM role");
  const rolesArr = roles.map((element) => element.title);
  return inquirer
    .prompt([
      {
        type: "list",
        message: "Which role do you wish to delete?",
        name: "deleteRole",
        choices: rolesArr,
      },
    ])
    .then(async function (response) {
      const [deleteRow] = await connection.query("DELETE FROM role WHERE ?", [
        { title: response.deleteRole },
      ]);
      console.log(`${deleteRow.affectedRows} role has been deleted.`);
    });
}

// Function that changes an existing employee's role.
// Create an array of employee names and an array of roles to present to user as lists.
// Use the user's reponse to find the ID number of the new role using the array.find() method.
// UPDATE the database with the user's selections.
async function changeRole() {
  const [employees] = await connection.query(
    "SELECT first_name, last_name FROM employee"
  );
  const employeesArr = employees.map(
    (element) => element.first_name + " " + element.last_name
  );
  const [roles] = await connection.query("SELECT id, title FROM role");
  const rolesArr = roles.map((element) => element.title);
  return inquirer
    .prompt([
      {
        type: "list",
        message: "Whose role do you wish to update?",
        name: "employeeName",
        choices: employeesArr,
      },
      {
        type: "list",
        message: "Which role do you wish to assign this employee?",
        name: "roleName",
        choices: rolesArr,
      },
    ])
    .then(async function (response) {
      const roleId = roles.find(
        (element) => element.title === response.roleName
      ).id;
      const [
        update,
      ] = await connection.query(
        "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?",
        [
          roleId,
          response.employeeName.split(" ")[0],
          response.employeeName.split(" ")[1],
        ]
      );
      console.log("Employee role has been updated.");
    });
}

// Function that reassigns an employee's manager.
// Create arrays of employee and manager names to be presented to user as lists to select from.
// Assign user's selections to variables. Use the variables to UPDATE the database.
// SET manager_id to undefined if no manager is needed. Alert the user if they try to assign an employee as manager to themselves.
async function changeManager() {
  const [employees] = await connection.query("SELECT * FROM employee");
  const employeesArr = employees.map(
    (element) => element.first_name + " " + element.last_name
  );
  const managersArr = employees.map(
    (element) => element.first_name + " " + element.last_name
  );
  managersArr.push("No manager");
  return inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee do you wish to assign a new manager to?",
        name: "employeeName",
        choices: employeesArr,
      },
      {
        type: "list",
        message: "Which manager do you wish to assign this employee?",
        name: "managerName",
        choices: managersArr,
      },
    ])
    .then(async function (response) {
      const [managerId] = await connection.query(
        "SELECT id FROM employee WHERE ? AND ?",
        [
          {
            first_name: response.managerName.split(" ")[0],
          },
          {
            last_Name: response.managerName.split(" ")[1],
          },
        ]
      );
      if (response.employeeName === response.managerName) {
        console.log("You cannot assign an employee as their own manager.");
      } else if (response.managerName === "No manager") {
        const [
          newManager,
        ] = await connection.query(
          "UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?",
          [
            undefined,
            response.employeeName.split(" ")[0],
            response.employeeName.split(" ")[1],
          ]
        );
        console.log("Manager has been removed.");
      } else {
        const [
          newManager,
        ] = await connection.query(
          "UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?",
          [
            managerId[0].id,
            response.employeeName.split(" ")[0],
            response.employeeName.split(" ")[1],
          ]
        );
        console.log("Manager has been assigned.");
      }
    });
}

// Function that exits the program.
async function exitLoop() {
  console.log("Thanks for using the employee tracker!");
  connection.end();
  process.exit();
}

// Export functions for use in employee-tracker.js.
module.exports = {
  addEmployee,
  viewEmployees,
  viewDepartments,
  viewRoles,
  deleteEmployee,
  addDepartment,
  deleteDepartment,
  addRole,
  deleteRole,
  exitLoop,
  changeRole,
  changeManager,
};
