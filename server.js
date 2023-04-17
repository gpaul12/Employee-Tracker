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
