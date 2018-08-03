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

    console.log(
      '\n' 
      + "The Available Products In Inventory Are Listed Below"
      + '\n' + "---------------------------------------------------------------------"
      + '\n'
    );

    for(var i = 0; i < res.length; i++) {
      console.log(
     "ID #" + res[i].id + " | " + res[i].product_name + " | " + "Price: $" + res[i].price + " | " + res[i].stock_quantity + " left in stock"
      + '\n' + "---------------------------------------------------------------------");
    }

    //commented out code below because the res will just print out the different items in the database as an object
    // console.log(res);
    
    connection.end();
  });
}
