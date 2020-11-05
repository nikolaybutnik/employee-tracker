# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A command line application that uses databases to keep track of and organize data on employees and other relevant information such as departments, salaries, roles, and managers.

[A demo of the application can be viewed here](https://drive.google.com/file/d/1JGZezTpuW1seiaF7lK21Q_qkMc4hCtnp/view)

![Employee Tracker Image](https://github.com/nikolaybutnik/employee-tracker/blob/main/employee-tracker-screenshot.png?raw=true)

## Table of Contents

1. [Installation](#Installation)
2. [Usage](#Usage)
3. [License](#License)
4. [Contributing](#Contributing)
5. [Tests](#Tests)
6. [Questions](#Questions)

## Installation

Run `npm install` to install all dependencies required to run this application. Navigate to `./assets/mysql` folder and open `schema.sql` with a database development tool. Run the code in the file to create the database and populate it with tables. As an option, run the code in `seed.sql` to populate the database with placeholder entries.

## Usage

To start the application enter `node employee-tracker.js` into the CLI. The user will be presented with the following options:

- **View departments:** Displays a table with all currently existing departments in the database.
- **Add departments:** Add a new department to the database by entering the name of the department.
- **Delete departments:** Delete an existing deparmtent from the database by selecting a department from the list.
- **View roles:** Displays a table with all currently existing roles in the database.
- **Add roles:** Add a new role to the database by entering the title, salary, and which department the role belongs to.
- **Delete roles:** Delete an existing role from the database by selecting a role from the list.
- **View employees:** Displays a table with all currently existing employees in the database. The table will include the following data: emloyee id, first name, last name, title, department, salary, and manager.
- **Add employees:** Add a new employee to the database by entering the employee's first name, last name, role, and whether the employee will have a manager.
- **Delete employees:** Delete an existing employee from the database by entering a first and last name.
- **Change employee role:** Select an employee whose role requires changing, followed by a new role to assign to the employee.
- **Reassign manager:** Select an employee whose manager requires reassigning, followed by an employee who will act as the new manager. If no manager is required select 'Not applicable'.
- **Exit:** Exit the application.

For each option, follow the on-screen prompts. Once an operation has completed the user will be taken back to the home screen with a list of possible operations. Select `Exit` to exit the application.

## License

This project is covered under the MIT license. To find out what is permitted under this license, click the license badge at the top of the README.

## Contributing

Feel free to submit any pull requests. All pull requests will be considered.

## Tests

No tests are currently written for this application.

## Questions

You may directly send any questions related to this project or any of my other projects to [my email adress](mailto:btnk.nik@gmail.com). To find all my projects visit [my GitHub profile](https://github.com/nikolaybutnik).
