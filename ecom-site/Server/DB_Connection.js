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

app.post("/api/insert", (req, res) => {
  const sqlInert =
    "INSERT INTO myproducts (productName, productDesc, productPrice) VALUES (?,?)";
  db.query(
    sqlInert,
    [productName, productDesc, productPrice],
    (err, result) => {}
  );
});

app.listen(3001, () => {
  console.log("running on port 3001!");
});
