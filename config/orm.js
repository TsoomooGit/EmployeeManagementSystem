var connection = require("./connection.js");

var orm ={

addEmployee: function(first_name, last_name,role_id,manager){
    var queryString = "INSERT INTO employee (first_name, last_name, role_id, manager) VALUES ('"+first_name+"', '"+last_name+"', "+role_id+","+manager+");";
    console.log(queryString);
    connection.query(queryString, function(err, result){
      if(err) throw err;
    })

},

getAllEmployee: function(cb){
    connection.query("SELECT e.first_name,e.last_name,r.title,d.department, r.salary, (select CONCAT(first_name,' ',last_name) from employee where id=e.manager) as Manager from employee e JOIN roles r on e.role_id = r.id JOIN department d on d.id = r.department_id",function(err, data){
      if(err) throw err;
      cb(data);
  })
  },

  select: function(columns, table, cb){
      var queryString="SELECT "+columns+" FROM "+table;
    connection.query(queryString,function(err, data){
        if(err) throw err;
        cb(data);
    })

  },
  //Select id from roles where title="Sales manager";
  selectWithCondition: function(valueToPull, table,condition, cb){
      var queryString="Select "+valueToPull+" from "+table+" where "+condition+";";
      console.log(queryString);
      connection.query(queryString,function(err, data){
        if(err) throw err;
        cb(data);
    })
  },

  addRole: function(title, salary, department_id){
    var queryString = "INSERT INTO roles (title, salary, department_id) VALUES ('"+title+"',"+salary+","+department_id+");";
    console.log(queryString);
    connection.query(queryString, function(err, result){
      if(err) throw err;
    })
  },

  addDepartment: function(id, department){
    var queryString = "INSERT INTO department (id, department) VALUES ("+id+","+"'"+department+"'"+");";
    console.log(queryString);
    connection.query(queryString, function(err, result){
      if(err) throw err;
    })
  },
//   UPDATE Employee
// SET manager = 1, manager=3
// WHERE first_name="Tsolmon";
  updateEmployeeRole: function(c,currentRoleId, newRoleId, firstName){
      var queryString="UPDATE employee SET "+c+" = "+currentRoleId+", " + c+" = "+newRoleId +" WHERE first_name= "+"'"+firstName+"'"+";";
      connection.query(queryString, function(err, result){
        if(err) throw err;
      })

  },
deleteWithCondition: function(tableName,condition){
var queryString="Delete from "+tableName+" where "+condition+";";
connection.query(queryString, function(err, result){
  if(err) throw err;
})
}

}



module.exports = orm;