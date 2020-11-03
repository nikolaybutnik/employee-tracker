const mysql = require("mysql2/promise");
const mysqlConnection = require("./mysqlconnection");

async function addEmployee() {
  connection = await mysql.createConnection(mysqlConnection);
  const [roles] = await connection.query("SELECT title FROM role");
  console.log(roles);
}

module.exports = {
  addEmployee,
};
