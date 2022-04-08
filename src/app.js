const express = require("express");
const mysql = require("mysql");

const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//MySQL

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Avatar075",
  database: "node20_mysql",
});

//Check connect

connection.connect((error) => {
  if (error) throw error;
  console.log("Database Server Running");
});

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));

//Route
app.get("/", (req, res) => {
  res.send("Welcome to the API FoodParadise");
});

// List all Customers customers
app.get("/customers", (req, res) => {
  const sql = "SELECT * FROM customers";

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No Results");
    }
  });
});

//List a Customer by id
app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM customers WHERE id = ${id}`;

  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send("No Result");
    }
  });
});

//Add new Customer
app.post("/add", (req, res) => {
  const sql = `INSERT INTO customers SET ?`;
  const customerObj = {
    name: req.body.name,
    city: req.body.city,
  };

  connection.query(sql, customerObj, (error) => {
    if (error) throw error;
    res.send("Customer Created!");
  });
});

//Update Customer by ID
app.patch("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, city } = req.body;
  const sql = `UPDATE customers SET name = '${name}', city = '${city}' WHERE id = ${id} `;

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Customer Updated!");
  });
});

//Delete Customer by id
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM customers WHERE id = ${id}`;

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Customer Deleted!");
  });
});
