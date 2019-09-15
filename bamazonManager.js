var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 1478,
    user: "root",
    password: "Shitfuck1!",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;

    showProducts();
});


function showProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log('');
        console.log('-------------Our current Inventory---------------');
        console.log('');


        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].id + '      Product: ' + res[i].item_name + '      Department: ' + res[i].department_name);
            console.log('Price: ' + res[i].price + '      Quantity Left: ' + res[i].stock_quantity);
            console.log(' ');

        }
        
        manageStore();
    });
}

                
function manageStore() {
    connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw console.log("connection error:" + err);
            inquirer
                .prompt([
                    {
                        name: 'selectId',
                        type: 'list',
                        message: 'Choose an option below to manage inventory:',
                        choices: ["Add inventory", "Add a new product", "Remove a product", "Quit"]

        }                
            ]).then(function (answers) {
                    if (answers.selectId === "Add inventory") {
                        addInventory()
                    } else if (answers.selectId === "Add a new product") {
                        newProduct()
                    } else if (answers.selectId === "Remove a product") {
                        deleteProduct()
                    } else if (answers.selectId === "Quit") {
                        quit()
                    } else {
                        console.log("Please choose one of the options");
                    }
                });
                
            function addInventory() {
              inquirer.prompt([

        {
            name: "ID",
            type: "input",
            message: "What is the item number you wish to restock?"
        }, {
            name: 'stock_quantity',
            type: 'input',
            message: "How many would you like to add?"
        },

                  ]).then(function(answers) {
        var quantityAdded = answers.stock_quantity;
        var IDOfProduct = answers.ID;
        restockDatabase(IDOfProduct, quantityAdded);
    });
}; 

        function restockDatabase(id, stock_quantity) {
    connection.query('SELECT * FROM bamazondb.products WHERE id = ' + id, function(error, response) {
        if (error) { console.log(error) };
        connection.query('UPDATE products SET quantity = stock_quantity + ' + stock_quantity + ' WHERE id = ' + id);
        showProducts();
    });
}; 
        
         function newProduct() {
              inquirer.prompt([

         {
            name: 'item_name',
            type: 'input',
            message: "Name of new product?"
        },
                {
            name: 'department_name',
            type: 'input',
            message: "Department?"
        },
                  {
            name: 'price',
            type: 'input',
            message: "Price?"
        },
                  {
            name: 'stock_quantity',
            type: 'input',
            message: "quantity?"
        },
                  
                  ]).then(function(answers) {
        var item_name = answers.item_name;
        var department_name = answers.department_name;
        var price = answers.price;
        var stock_quantity = answers.stock_quantity;
                  
        addNewItemtoDB(item_name, department_name, price, stock_quantity);
    });
}; 

        function addNewItemtoDB(item_name, department_name, price, stock_quantity) {
  connection.query('INSERT INTO products (item_name, department_name, price, quantity) VALUES("' + item_name + '","' + department_name + '",' + price + ',' + stock_quantity +  ')');
            
    
        showProducts();
  
}; 
        
        
        function deleteProduct(){
            inquirer.prompt([{
                name: "ID",
                type: "input",
                message: "Enter the ID number for the item you wish to remove?"
            }]).then(function(answer){
                var id = answer.ID;
                deleteFromDB(id);
            });
        };
        
        function deleteFromDB(id){
            connection.query("DELETE FROM products WHERE id =" + id);
            showProducts();
        }
        

               
            });
    } 