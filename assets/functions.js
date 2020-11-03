const mysql = require("mysql2/promise");
const mysqlConnection = require("./mysqlconnection");
const inquirer = require("inquirer");

async function addEmployee() {
  connection = await mysql.createConnection(mysqlConnection);
  const [roles] = await connection.query("SELECT title FROM role");
  const rolesArr = roles.map((element) => element.title);
  inquirer
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
    ])
    .then(async function (response) {
      const [roleId] = await connection.query("SELECT id FROM role WHERE ?", {
        title: response.role,
      });
      const [
        results,
      ] = await connection.query(
        "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)",
        [response.firstName, response.lastName, roleId[0].id]
      );
      console.log(
        `${response.firstName} ${response.lastName} has been added to the database.`
      );
    });
}

module.exports = {
  addEmployee,
};
