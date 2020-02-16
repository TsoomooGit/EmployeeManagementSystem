var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "MySQL@1993",
  database: "homework10"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
  });

  function start() {
    inquirer
      .prompt({
        name: "selection",
        type: "list",
        message: "Would you like to do?",
        choices: ["View All Employees", "View All Employee By Department", "View All Employee By Managers"]
      })
      .then(function(answer) {
        if (answer.selection == "View All Employees") {
            
          console.log("View All Employees");
        } else if(answer.selection=="View All Employee By Department"){
            console.log("View All Employee By Department");
        }else if(answer.selection=="View All Employee By Managers"){
            console.log("View All Employee By Managers");
        }
        else {
          connection.end();
        }
      });
  }
  connection.end();