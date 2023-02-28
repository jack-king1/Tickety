import React, { useState, useEffect } from "react";
import Axios from "axios";

function Admin() {
  const [productName, setProductName] = useState("test");
  const [productDesc, setProductDesc] = useState("test");
  const [productPrice, setProductPrice] = useState("test");
  const [itemDelete, setItemDelete] = useState("");
  const [productList, setProductList] = useState([]);

  const addProductToDB = () => {
    Axios.post("http://localhost:3001/api/insert", {
      productName: productName,
      productDesc: productDesc,
      productPrice: productPrice,
    }).then(() => {
      alert("successful insert");
    });
  };

  const removeProductFromDB = () => {
    Axios.post("http://localhost:3001/api/delete", {
      productName: itemDelete,
    }).then(() => {
      alert("successful deletion");
    });
  };

  const debugCLick = () => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response);
      setProductList(response.data);
    });
  };
  return (
    <div className="container">
      Admin CRUD page
      <div className="container">
        <div className="">
          <form>
            <label>Product Name:</label>
            <input
              type="text"
              onChange={(e) => setProductName(e.target.value)}
            />
            <br />
            <label>Product Description:</label>
            <input
              type="text"
              onChange={(e) => setProductDesc(e.target.value)}
            />
            <br />
            <label>Product Price:</label>
            <input
              type="text"
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </form>
          <button onClick={addProductToDB}>Add New Product</button>
        </div>

        <div className="mt-4">
          <button onClick={debugCLick}>Display All Products</button>
          {productList.map((val) => {
            return (
              <h1>
                Product: {val.productName} | Product Description:{" "}
                {val.productDesc} | Product Price: {val.productPrice}
              </h1>
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <form>
          <label>Delete Item: </label>
          <input type="text" onChange={(e) => setItemDelete(e.target.value)} />
        </form>
        <button onClick={removeProductFromDB}>Click to delete entry</button>
      </div>
    </div>
  );
}

export default Admin;
