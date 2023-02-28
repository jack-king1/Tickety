const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nYs378AA",
  database: "ecomdb",
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database as ID " + connection.threadId);
  connection.release();
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM myproducts";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const productName = req.body.productName;
  const productDesc = req.body.productDesc;
  const productPrice = req.body.productPrice;

  const sqlInsert =
    "INSERT INTO myproducts (productName, productDesc, productPrice) VALUES (?,?,?)";
  db.query(
    sqlInsert,
    [productName, productDesc, productPrice],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/api/delete", (req, res) => {
  const productName = req.body.productName;
  const sqlDelete = "DELETE FROM myproducts WHERE productName = ?";
  db.query(sqlDelete, productName, (err, result) => {
    console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001!");
});
