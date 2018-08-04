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

    // connection.end();

    productIdPrompt();
  });
}

function inputCheck(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return "Enter a positive, whole number.";
  }
}

// function that prompts users for the ID of the product they would like to buy
function productIdPrompt() {
  // query the database for all products
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'product_id',
          message: "Please type the desired product ID",
          validate: inputCheck,
          filter: Number
        },
        {
          type: 'input',
          name: 'quantity',
          message: "How many units of this product do you want to purchase?",
          validate: inputCheck,
          filter: Number
        }
      ]).then(function(answer) {
        connection.query("SELECT * FROM products WHERE id=?", answer.product_id, function(err, res) {
          for(var i = 0; i < res.length; i++) {
            //if statement below determines if the user chose a number that exceeds the inventory number of the product within the database
            if(answer.quantity > res[i].stock_quantity) {
              console.log(
                '\n'
                + "       =================================================================       " 
                + '\n' + "=============================== Our Apologies =================================="
                + '\n' + " Unfortunately, at the moment, we do not have enough inventory of this product" 
                + '\n' + "     Please select a lower number, as we apologize for this inconvenience"
                + '\n' + "==========================================================================="
                + '\n' + "       =================================================================       "
                + '\n'
              );

              productIdPrompt();

            } else {
                console.log(
                  '\n'
                  + "Sounds great!"
                  + '\n' + "Your order has been fulfilled and details of the purchase has been logged below:"
                  + '\n' + "==========================================================================="
                  + '\n' + "PURCHASED ITEM: " + res[i].product_name
                  + '\n' + "QUANTITY: " + answer.quantity
                  + '\n' + "PRICE: $" + res[i].price
                  + '\n' + "=========================================================================="
                  + '\n' + "TOTAL: $" + res[i].price * answer.quantity
                  + '\n'
                );

                //quantity of product AFTER user's quantity is subtracted from what it was before
                quantityRemaining = (res[i].stock_quantity - answer.quantity);
                //ID of product the user chooses
                usersProductId = answer.product_id;


                var query = connection.query(
                  "UPDATE products SET ? WHERE ?", 
                  [
                    {
                      stock_quantity: quantityRemaining
                    }, 
                    {
                      item_id: usersProductId
                    }
                  ], 
                  function(err, res) {
                    // if(err) throw err;
                    console.log("Product ID: " + usersProductId + " now has " + quantityRemaining + " left remaining in stock" + '\n');

                    connection.end();
                  });

  //was trying to log the list of items again, with the updated number of inventory posted onto console but the code below will not update the number
            // inquirer.prompt([
            //   {
            //     type: "confirm",
            //     name: "question",
            //     message: "Thank you for shopping with us! Would you like to make another purchase?",
            //     default: true
            //   }
            // ])
            //   .then(function(answer) {
            //     if(answer.question === true) {
            //       listItems();
            //       productIdPrompt();
            //     } else {
            //       console.log("Have a nice day!");
            //     }
            //   })

            }
          }
        })
        // console.log("it works");
        // listItems();
      })
  })
}

//was originally going to add this endPrompt to ask user if they wanted anything else, but did not add the code because it would run the function numerious times instead of once...
function endPrompt() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "choice",
      message: "Thank you for shopping with us! Would you like to make another purchase?"
    }
  ])
    .then(function(answer) {
      if(answer.choice) {
        listItems();
        productIdPrompt();
      } else {
        console.log("Have a nice day!");
        connection.end();
      }
    })
  }

  //originally had inquirer prompt to display all the merchandise in order but selection got buggy..
  // inquirer
  //   .prompt([
  //     {
  //     name: "SelectProduct",
  //     type: "rawlist",
  //     message: "Type in the ID number of the desired item into the console",
  //     choices: function() {
  //       var choicesArr = [];
  //       for (var i = 0; i < res.length; i++) {
  //         choicesArr.push(res[i].product_name);
  //       }
  //       // return choicesArr;
  //     },
  //     // message: "Type in the ID number of the desired item into the console"
  //     }
  //   ])
  //   .then(function(answer) {
  //     // based on their answer, either call the bid or the post functions
  //     if (answer.SelectProduct === "1") {
  //       console.log("selected 1");
  //     }
  //     else if (answer.SelectProduct === false) {
  //       console.log("selected 2");
  //     }
  //   });
  //   }
  // )};