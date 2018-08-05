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
    console.log('\n' + "Welcome, you're connected as id " + connection.threadId + '\n\n');
    managerPrompt();
  });

//this function prompts manager in terminal with a set of choices that the manager can choose from
function managerPrompt() {
    inquirer
      .prompt([
        {
            type: "list",
            name: "managerOptions",
            message: "Hey Boss! Select between the options below \n",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    //after manager chooses between the choices, logic below determines choice and runs the appropriate function
    ]).then(function(managersChoice) {
        if(managersChoice.managerOptions === "View Products for Sale") {
            listItems();
        } else if(managersChoice.managerOptions === "View Low Inventory") {
            lowInventory();
        } else if(managersChoice.managerOptions === "Add to Inventory") {
            add();
        } else {

        }
    });
};


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
        + '\n' + "---------------------------------------------------------------------"
        + '\n'
        );
      }

    });

    promptQuestion();
}

function promptQuestion() {
    inquirer
        .prompt([
            {
                type: "conform",
                name: "question",
                message: "Would you like to perform another action?",
                default: true
            }
        ]).then(function(selection) {
            if(selection.question === true) {
                managerPrompt();
            } else {
                console.log("Have a great day Boss!");
                connection.end();
            }
        })
}

function lowInventory() {
    connection.query("SELECT * FROM products", function(err, res) {

        console.log("\n============================= LOW INVENTORY =================================\n")

        for(var i = 0; i < res.length; i++) {
            if(res[i].stock_quantity <= 5) {
                console.log(
                    "ID #" + res[i].id + " | " + res[i].product_name + " | " + "Price: $" + res[i].price + " | " + res[i].stock_quantity + " left in stock"
                )
            }
        }

        console.log("\n=============================================================================\n");

        addInventoryPrompt();

    })
}

function add() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "idNumber",
                message: "What is the ID number of the product that you would like to add inventory to?"
            },
            {
                type: "input",
                name: "addAmount",
                message: "How many more would you like to add?"
            }
        ]).then(function(answer) { 
            connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                id: answer.idNumber
            },
            {
                stock_quantity: answer.addAmount
            }
        ])
        })
}

function addInventoryPrompt() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "addInventory",
                message: "Would you like to add more to the inventory?",
                choices: ["Yes", "No"]
            }
        ]).then(function(answer) {
            if (answer.addInventory === "Yes") {
                console.log("adding");
                add();
            } else {
                console.log("\n\nSounds good Boss, have a nice day!\n\n");

                connection.end();
            }
        })
}