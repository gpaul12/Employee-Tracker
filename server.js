const inquirer = require("inquirer");
const fs = require("fs");
const cTable = require("console.table");
var mysql = require("mysql");
const util = require("util");

const logo = require("asciiart-logo");
const config = require("./package.json");
console.log(logo(config).render());

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345",
  database: "employee_tracker",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    res.status(500);
    return res.send("There was an error connecting to the database.");
  }
  console.log("You're connected!");

  runSearch();
});

connection.query = util.promisify(connection.query);

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
                "View all employees by manager",
                "Add employee",
                "Add Department",
                "Add Role",
                "Remove employee",
                "Update employee role",
                "Update employee manager"
            ]
        }).then(answers => {
            switch (answers.action) {
                case "View all employees":
                    byEmployees();
                    runSearch();
                    break;
                case "View all employees by department":
                    byDepartment();
                    runSearch();
                    break;
                case "View all employees by manager":
                    byManager();
                    runSearch();
                    break;
                    case "Add employee":
                    inquirer
                        .prompt([
                            {
                                name: "employeeFirst",
                                type: "input",
                                message: "What is the employee's first name?",
                                validate: answer => {
                                    if (answer !== "") {
                                        return true;
                                    }
                                    return "Please enter at least one character.";
                                }
                            },
                            {
                                name: "employeeLast",
                                type: "input",
                                message: "What is the employee's last name?",
                                validate: answer => {
                                    if (answer !== "") {
                                        return true;
                                    }
                                    return "Please enter at least one character.";
                                }
                            },
                            {
                                name: "department",
                                type: "input",
                                message: "Please enter the role id",

                            },
                            {
                                name: "manager",
                                type: "input",
                                message: "Please enter manager id",
                            }
                        ]).then(answers => {
                            addEmployee(answers.employeeFirst, answers.employeeLast, answers.department, answers.manager);
                            runSearch();
                        })
                    break;
                case "Add Department":
                    inquirer
                        .prompt([
                            {
                                name: "Department",
                                type: "input",
                                message: "Please enter the department you would like to add?",
                                validate: answer => {
                                    if (answer !== "") {
                                        return true;
                                    }
                                    return "Please enter at least one character.";
                                }
                            },
                        ]).then(answers => {
                            addDepartment(answers.Department);
                            runSearch();
                        })
                    break;
                case "Add Role":
                    inquirer
                        .prompt([
                            {
                                name: "title",
                                type: "input",
                                message: "Please enter the role's title.",
                                validate: answer => {
                                    if (answer !== "") {
                                        return true;
                                    }
                                    return "Please enter at least one character.";
                                }
                            },
                            {
                                name: "salary",
                                type: "input",
                                message: "Please enter the role's salary.",
                            },
                            {
                                name: "department_id",
                                type: "input",
                                message: "Please enter the department id.",
                            }
                        ]).then(answers => {
                            addRole(answers.title, answers.salary, answers.department_id);
                            runSearch();
                        })
                    break;
