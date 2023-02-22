const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ecomdb",
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database as ID " + connection.threadId);
  connection.release();
});

app.get("/", (err, res) => {
  const sqlInsert =
    "INSERT INTO myproducts (productName, productDesc, productPrice) VALUES ('Iphone', 'cool and slick', '4.99');";
  db.query(sqlInsert, (err, result) => {
    res.send("Hello World!");
    console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001!");
});
