# bamazon-NodeJS-MySQL-

Description:
  An Amazon-like storefront that incorporates MySQL and NodeJS. The app will take in orders from customers and deplete stock  from the store's inventory. As a bonus task,the app should program to track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

NPM Modules: 
  require("mysql")
  require("inquirer")

SQL Data:
  bamazon.sql contains the data that will contain products that the user can purchase

JS:
  bamazonCustomer.js 
    -JS that contains logic to allow node user to see products availabe and buy them like an amazon app
    
    Needed Updates:
      -cannot log the newly updated quantity onto the console after the user buys a specific item
      -originially had another prompt that would run, to ask customers if they want ot purchase more items, but the function is buggy and runs numerous times.
