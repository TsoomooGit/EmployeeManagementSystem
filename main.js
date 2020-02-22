const inquirer=require("inquirer");
const mysql=require("mysql");
const connection=require("./config/connection.js");
const orm=require("./config/orm.js");
const columnify=require("columnify");
const chalk=require("chalk");

var allChoices=["View All Employees", "View All Departments", "View All Roles","Add employee", "Add Role", "Add Department", "Update Employee Roles"];
var allEmployee=[];
var allRoles=[];

function initVariables(){
  orm.select("concat(first_name,' ',last_name) as name","employee",function(data){
    for(var i=0; i<data.length; i++){
    allEmployee.push(data[i].name);
    }
  });
  orm.select("title", "roles",function(data){
    for(var i=0; i<data.length; i++){
    allRoles.push(data[i].title);
    }
  });
}


  function start() {
    initVariables();
    inquirer
      .prompt({
        name: "selection",
        type: "list",
        message: "Would you like to do?",
        choices: allChoices,
      })
      .then(function(answer) {
        if (answer.selection == allChoices[0]) {
            orm.getAllEmployee(function(data){
              var colArr1=['first_name', 'last_name', 'title', 'department', 'salary', 'Manager'];
              print(data, colArr1);
              start();
            }); 
         }else if (answer.selection == allChoices[1]) {
          orm.select("*", "department", function(data){
            var colarr2=["id", "department"];
            print(data, colarr2);
            start();
          });
            }else if (answer.selection == allChoices[2]) {
           orm.select("*","roles", function(data){
             var colarr3=["title","salary","department_id"];
             print(data,colarr3);
             start();
           })

           //add employee
              }else if (answer.selection == allChoices[3]) { 
                inquirer
                .prompt([
                  {
                  name: "first",
                  type: "input",
                  message: "Enter First name",
                },
                {
                  name: "last",
                  type: "input",
                  message: "Enter Last Name",
                },
                {
                  name: "selection",
                  type: "list",
                  message: "Select your role",
                  choices: allRoles,
                },
                {
                  name: "manager",
                  type: "list",
                  message: "Select manager",
                  choices: allEmployee,
                }
              ])
                .then(function(answer) {
                  
                  orm.selectWithCondition("id","roles","title="+"'"+answer.selection+"'",function(data){
                    console.log(data);
                   var roleId=data[0].id;
  
                 orm.selectWithCondition("id","employee","first_name="+"'"+answer.manager.substring(0,answer.manager.indexOf(" "))+"'", function(data){
                   var managerId=data[0].id;
                console.log(managerId);
                orm.addEmployee(answer.first,answer.last,roleId,managerId);
                console.log(chalk.green("Successfully added new employee: "+answer.first+" "+answer.last));
                  start();
                });
              });
            });
             }else if (answer.selection == allChoices[4]) {
              inquirer
              .prompt([
                {
                name: "title",
                type: "input",
                message: "Enter role",
              },
              {
                name: "salary",
                type: "input",
                message: "Enter salary",
              },
              {
                name: "departmentId",
                type: "input",
                message: "Enter department id",
              },
            ])
            .then(function(answer) {
              orm.addRole(answer.title,answer.salary,answer.departmentId);
              start();
            });
                  }else  if (answer.selection == allChoices[5]) {
                    inquirer
                    .prompt([
                      {
                      name: "id",
                      type: "input",
                      message: "Department id:",
                    },
                    {
                      name: "department",
                      type: "input",
                      message: "Enter department name:",
                    },
                  ])
                  .then(function(answer) {
                    orm.addDepartment(answer.id,answer.department);
                    start();
                  });
                    }else  if (answer.selection == allChoices[6]) {
                      inquirer
                      .prompt([
                        {
                          name: "employee",
                          type: "list",
                          message: "Select employee name:",
                          choices: allEmployee,
                        },
                        {
                          name:"role",
                          type:"list",
                          message: "Select employee new role:",
                          choices: allRoles,
                        }
                      ]).then(function(answer){
                      
                        orm.selectWithCondition("role_id","employee","first_name="+"'"+answer.employee.substring(0,answer.employee.indexOf(" "))+"'", function(data){
                          var roleId=data[0].role_id;
                          console.log(roleId);
                          orm.selectWithCondition("id","roles","title="+"'"+answer.role+"'", function(data){
                            var newRoleId=data[0].id;
                            console.log(newRoleId);
                            orm.updateEmployeeRole(roleId,newRoleId,answer.employee.substring(0,answer.employee.indexOf(" ")));
                            console.log(chalk.green("Successfully updated employee role: "+answer.employee));
                          })
                   
                      })
                    });
                  }
                  
         });
      
  
  }

  function print(data, column){
    var columns = columnify(data, {
      columns: column
    });
    console.log("\n\n"+columns+"\n\n");
  }

  start();