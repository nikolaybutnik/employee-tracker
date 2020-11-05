const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const functions = require("./assets/functions");
const mysqlConnection = require("./assets/mysqlconnection");
const cTable = require("console.table");

const DEPT_VIEW = "View departments";
const DEPT_ADD = "Add departments";
const DEPT_DEL = "Delete departments";
const ROLE_VIEW = "View roles";
const ROLE_ADD = "Add roles";
const ROLE_DEL = "Delete roles";
const EMP_VIEW = "View employees";
const EMP_ADD = "Add employees";
const EMP_DEL = "Delete employees";
const EMP_UPD = "Change employee role";
const EXIT = "Exit";

let connection;
main();

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

async function connect() {
  connection = await mysql.createConnection(mysqlConnection);
  console.log(`Connected as id: ${connection.threadId}`);
}

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
          EMP_UPD,
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
          console.log(`You have selected ${userResponse}`);
          break;
        case EMP_VIEW:
          return functions.viewEmployees();
        case EMP_ADD:
          return functions.addEmployee();
        case EMP_DEL:
          return functions.deleteEmployee();
        case EMP_UPD:
          console.log(`You have selected ${userResponse}`);
          break;
        case EXIT:
          break;
      }
    });
}
