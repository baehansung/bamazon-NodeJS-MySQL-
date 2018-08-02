var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

//require("mysql") allows code below to connect user in terminal
connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome, you're connected as id " + connection.threadId);
  listItems();
});

// function syntax below lists all the products within the bamazonDB database
function listItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
