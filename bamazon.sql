DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity DECIMAL(10,2) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
    ("Mac Charger", "Electronics", 40, 10),
    ("Mac Laptop", "Electronics", 1000, 5),
    ("World Cup Soccer Ball", "Sports", 100, 7),
    ("Philadelphia Eagles Jersey", "Sports", 90, 4),
    ("Electric Guitar", "Music", 150, 12),
    ("Outdoor Bench", "Household", 35, 30),
    ("Towel", "Household", 2, 50),
    ("Frying Pan", "Cooking", 7.99, 20),
    ("Bookbag", "School Merchandise", 19.99, 13),
    ("Notebook", "School Merchandise", 0.99, 57);