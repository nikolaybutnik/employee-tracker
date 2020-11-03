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

let connection;
main();

async function main() {
  try {
    await connect();
    await runInquirer();
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

let loop = true;

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
        ],
      },
    ])
    .then(async function (response) {
      const userResponse = await response.operation;
      switch (userResponse) {
        case DEPT_VIEW:
          console.log(`You have selected ${userResponse}`);
          break;
        case DEPT_ADD:
          console.log(`You have selected ${userResponse}`);
          break;
        case DEPT_DEL:
          console.log(`You have selected ${userResponse}`);
          break;
        case ROLE_VIEW:
          console.log(`You have selected ${userResponse}`);
          break;
        case ROLE_ADD:
          console.log(`You have selected ${userResponse}`);
          break;
        case ROLE_DEL:
          console.log(`You have selected ${userResponse}`);
          break;
        case EMP_VIEW:
          console.log(`You have selected ${userResponse}`);
          break;
        case EMP_ADD:
          functions.addEmployee();
          break;
        case EMP_DEL:
          console.log(`You have selected ${userResponse}`);
          break;
        case EMP_UPD:
          console.log(`You have selected ${userResponse}`);
          break;
      }
    });
}
