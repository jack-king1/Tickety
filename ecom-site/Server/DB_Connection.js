const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const { response } = require("express");

//password is password on windows.
//password is nYs378AA on linux.
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ecomdb",
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("./public"));
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database as ID " + connection.threadId);
  connection.release();
});

// myproducts
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM myproducts";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/getproduct", (req, res) => {
  const productName = req.body.productName;
  const sqlSelect = "SELECT * FROM myproducts WHERE productName = ?";
  db.query(sqlSelect, [productName], (err, result) => {
    res.send(result);
  });
});

app.get("/api/getproductwithid", (req, res) => {
  const productID = req.query.productID;
  const sqlSelect = "SELECT * FROM myproducts WHERE productID = ?";
  db.query(sqlSelect, [productID], (err, result) => {
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
      res.send(result);
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

app.get("/api/getlastid", (req, res) => {
  const sqlQuery = "SELECT * FROM myproducts ORDER BY productID DESC LIMIT 1";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log(err);
  });
});

//Images
app.post("/api/insertimage", (req, res) => {
  const imageName = req.body.imageName;
  const imageData = req.body.productImage;
  const fk_productID = req.body.productID;

  //console.log(imageData);

  const sqlInsertImage =
    "INSERT INTO productimages (imageName, imageBlob, productID) VALUES (?,?,?)";
  db.query(
    sqlInsertImage,
    [imageName, imageData, fk_productID],
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

app.get("/api/getproductimage", (req, res) => {
  const pID = req.query.productID;
  const sqlSelect = "SELECT * FROM productimages WHERE productID = ?";
  db.query(sqlSelect, [pID], (err, result) => {
    res.send(result);
    console.log(err);
  });
});

app.get("/api/getproductimagesingle", (req, res) => {
  const pID = req.query.productID;
  const sqlSelect = "SELECT * FROM productimages WHERE productID = ? LIMIT 1";
  db.query(sqlSelect, [pID], (err, result) => {
    res.send(result);
    console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001!");
});
