// Load all dependencies.
const inquirer = require("inquirer");
const functions = require("./assets/functions");
const connection = require("./assets/mysqlconnection");
const cTable = require("console.table");

// Assign user choices to variables to be used in inquirer and switch statement.
const DEPT_VIEW = "View departments";
const DEPT_ADD = "Add departments";
const DEPT_DEL = "Delete departments";
const ROLE_VIEW = "View roles";
const ROLE_ADD = "Add roles";
const ROLE_DEL = "Delete roles";
const EMP_VIEW = "View employees";
const EMP_ADD = "Add employees";
const EMP_DEL = "Delete employees";
const ROLE_UPD = "Change employee role";
const MGR_UPD = "Reassign manager";
const EXIT = "Exit";

// Initialize the application.
main();

// connect to database and loop the inquirer function to ask the user for input every time a function finishes executing.
async function main() {
  let loop = true;
  try {
    await connect();
    while (loop) {
      await runInquirer();
    }
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}

// Set up a connection to database
async function connect() {
  console.log(`Connected to database`);
}

// Set up inquirer to ask the initial set of questions. Each response will branch out into a separate function in the functions.js file.
// The functions return promises, thus a return statement is used instead of a break for each case to resolve each promise.
async function runInquirer() {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "operation",
        choices: [
          DEPT_VIEW,
          DEPT_ADD,
          DEPT_DEL,
          ROLE_VIEW,
          ROLE_ADD,
          ROLE_DEL,
          EMP_VIEW,
          EMP_ADD,
          EMP_DEL,
          ROLE_UPD,
          MGR_UPD,
          EXIT,
        ],
      },
    ])
    .then(async function (response) {
      const userResponse = await response.operation;
      switch (userResponse) {
        case DEPT_VIEW:
          return functions.viewDepartments();
        case DEPT_ADD:
          return functions.addDepartment();
        case DEPT_DEL:
          return functions.deleteDepartment();
        case ROLE_VIEW:
          return functions.viewRoles();
        case ROLE_ADD:
          return functions.addRole();
        case ROLE_DEL:
          return functions.deleteRole();
        case EMP_VIEW:
          return functions.viewEmployees();
        case EMP_ADD:
          return functions.addEmployee();
        case EMP_DEL:
          return functions.deleteEmployee();
        case ROLE_UPD:
          return functions.changeRole();
        case MGR_UPD:
          return functions.changeManager();
        case EXIT:
          return functions.exitLoop();
      }
    });
}
