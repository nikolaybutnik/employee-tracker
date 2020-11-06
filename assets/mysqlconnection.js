// Load dependency
const mysql = require("mysql2");

// Connection details to connect to mysql2. Export to be used in employee-tracker.js and functions.js.
const mysqlConnection = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "example",
  database: "employee_trackerDB",
};

let connection = mysql.createConnection(mysqlConnection);

module.exports = connection.promise();
