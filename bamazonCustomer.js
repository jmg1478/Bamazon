var mysql = require('mysql');
var inquirer = require('inquirer');
//var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 1478,
    user: "root",
    password: "Shitfuck1!",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;

    displayProducts();
});


function displayProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].id + " | " + results[i].item_name + " | " + results[i].department_name +
                    " | " + results[i].price);
            }
        inquirer
            .prompt([
                {
                    name: "IDnumber",
                    type: "rawlist",
                    choices: choiceArray,
                    message: "What is the ID of the item you want to purchse?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Please enter the amount you wish to purchase."

                },
            ])
            .then(function (answer) {


                var query = "SELECT * FROM products WHERE ?";
                connection.query(query, { id: answer.IDnumber }, function (err, results) {
                    if (err) throw err;
console.log(results);
                    if (results[0].stock_quantity <= answer.quantity) {
                        console.log("I am sorry, we do not have enough items in stock to fulfill your order. Please check again next week.");
                        connection.end();
                    } else {
                        var total = answer.quantity * results[0].price;
                        console.log(total);
                        console.log("We have " + results[0].stock_quantity + " in stock. We can fill your order. Your total is $" + total + " Please check your email for an invoice.");
                    }
                    var newStock = {
                        "results": results[0].stock_quantity,
                        "quantity": answer.quantity,
                        "answer": answer.IDnumber
                    };
                    function updateProduct() {
                        var id = newStock.answer;
                        var item_quantity = newStock.results - newStock.quantity;
                        var query = connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    item_quantity: item_quantity
                                },
                                {
                                    id: id
                                }
                            ],
                            function (error) {
                                if (error) throw err;

                            });
                            updateProduct();
                            var query2 = "SELECT * FROM products where id = 9";
                            connection.query(query2, { id: 9 }, function (err, results) {
                                if (err) throw err;
                                console.log(results);
                    });

                }

               
                });
            });
    });
}

console.log("Thank you. Goodbye");