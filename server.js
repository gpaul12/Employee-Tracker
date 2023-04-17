const inquirer = require("inquirer");
const fs = require("fs");
const cTable = require("console.table");
var mysql = require("mysql");
const util = require("util");

const logo = require("asciiart-logo");
const config = require("./package.json");
console.log(logo(config).render());
