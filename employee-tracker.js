const mysql = require("mysql2/promise");
const inquirer = require("inquirer");

let connection;
main();

async function main() {
  try {
    await connect();
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}

async function connect() {
  connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "example",
    database: "employee_trackerDB",
  });
  console.log(`Connected as id: ${connection.threadId}`);
}
