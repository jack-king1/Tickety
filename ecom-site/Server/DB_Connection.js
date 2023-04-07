const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const { response } = require("express");
const session = require("express-session");
const stripe = require("stripe")(
  "sk_test_51Mo9PbGTuZFzGPicZqCqfkYCBeuBVGHHDj3kgI44pZs3rQ7u3BekjJ1R9445RjuiU3P54jqp9B0687rSp3nOcFPS00zGwlCurU"
);

const nodemailer = require("nodemailer");

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
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// var transporter = nodemailer.createTransport({
//   name: "TicketySender@outlook.com",
//   host: "smtp-mail.outlook.com", // hostname
//   secureConnection: false, // TLS requires secureConnection to be false
//   port: 587, // port for secure SMTP
//   auth: {
//     user: "TicketySender@outlook.com",
//     pass: "cRatt3EPwald",
//   },
//   tls: {
//     ciphers: "SSLv3",
//     rejectUnauthorized: false,
//   },
// });

var transporter = nodemailer.createTransport({
  host: "smtp.outlook.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "TicketySender@outlook.com",
    pass: "cRatt3EPwald",
  },
});

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

app.get("/api/getproductreviews", (req, res) => {
  const productID = req.query.productID;
  const sqlSelect = "SELECT * FROM productreviews WHERE productID = ?";
  db.query(sqlSelect, [productID], (err, result) => {
    res.send(result);
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

//User registraion/login

app.post("/api/createuser", (req, res) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  console.log(username, firstname, lastname, email, password);

  //console.log(imageData);

  const sqlInsertNewUser =
    "INSERT INTO accounts (username, password, email, firstname, lastname) VALUES (?,?,?,?,?)";
  db.query(
    sqlInsertNewUser,
    [username, password, email, firstname, lastname],
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

app.get("/api/getuserlogin", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  const sqlSelect =
    "SELECT * FROM accounts WHERE username = ? AND password = ?";
  db.query(sqlSelect, [username, password], (err, result) => {
    res.send(result);
    console.log(err);
  });
});

//Stripe
app.get("/order/success", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  res.send(
    `<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`
  );
});

//Review
app.post("/api/createreview", (req, res) => {
  const reviewText = req.body.reviewText;
  const anonymous = req.body.anonymous;
  const reviewRating = req.body.reviewRating;
  const productID = req.body.productID;
  const accountID = req.body.accountID;
  const username = req.body.username;
  console.log(reviewText, reviewRating, productID, accountID, anonymous);

  const sqlInsertNewReview =
    "INSERT INTO productreviews (reviewText, reviewRating, productID, accountID, anonymous, username) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlInsertNewReview,
    [reviewText, reviewRating, productID, accountID, anonymous, username],
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

//Contact

app.post("/api/sendemail", (req, res) => {
  console.log("Sending Email...");
  let tempText = req.body.emailText + " : " + req.body.contactText;

  const options = {
    from: "TicketySender@outlook.com",
    to: "jackking.gm97@gmail.com",
    subject: "Tickety Contact Form",
    text: "Text",
    html: `<p>${tempText.toString()}<p>`,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Send", info.response);
      (err, result) => {
        console.log(err);
        res.send(result);
      };
    }
  });
});
