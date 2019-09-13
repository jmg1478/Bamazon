DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INTEGER(11) NOT NULL AUTO_INCREMENT , 
  item_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(20) NOT NULL,
  stock_quantity INTEGER(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (item_name, department_name, price, stock_quantity)
VALUES ("I7-8700k", "Computers and Electronics", 323.99, 32),

 ("Lord of the Rings", "Movies", 12.69, 542),

 ("Dog Treats", "Animal Care", 4.99, 235),

 ("Flip Flops", "Men's Shoes", 11.89, 1235),

 ("Nerds Candy", "Groceries", 0.99, 2000),

 ("Blender", "Kitchen Appliances", 75.96, 1553),

 ("The Hobbit", "Books", 24.99, 1478),

 ("Training Treats", "Pet products, Dogs", 10.58, 565),

 ("Tooth Paste", "hygiene", 7.78, 5120),

 ("Cards Against Humanity", "Games", 32.00, 596),

 ("The Little Gold Book of Yes", "Books", 24.99, 1720),

 ("GTX 1080 ti", "Computers and Electronics", 875.25,725),

 ("Andriod galaxy 9s phone case", "Computers and Electronics", 10.25, 6000),

 ("weighted blanket", "Rest and Relaxation", 50.00, 124);
 
 SELECT * FROM bamazon_db.products;