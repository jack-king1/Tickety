import React, { useState, useEffect } from "react";
import Axios from "axios";

function Products() {
  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("test");
  const [productDesc, setProductDesc] = useState("test");
  const [productPrice, setProductPrice] = useState("test");

  const debugCLick = () => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response);
      setProductList(response.data);
    });
  };

  const addProductToDB = () => {
    Axios.post("http://localhost:3001/api/insert", {
      productName: productName,
      productDesc: productDesc,
      productPrice: productPrice,
    }).then(() => {
      alert("successful insert");
    });
  };

  return (
    <div>
      Products page
      <div className="container">
        <form onSubmit={addProductToDB}>
          <label>Product Name:</label>
          <input type="text" onChange={(e) => setProductName(e.target.value)} />
          <br />
          <label>Product Description:</label>
          <input type="text" onChange={(e) => setProductDesc(e.target.value)} />
          <br />
          <label>Product Price:</label>
          <input
            type="text"
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </form>
        <button onClick={addProductToDB}>Add New Product</button>
      </div>
      <button onClick={debugCLick}>CLick Me</button>
      {productList.map((val) => {
        return (
          <h1>
            Product: {val.productName} | Product Description: {val.productDesc}{" "}
            | Product Price: {val.productPrice}
          </h1>
        );
      })}
    </div>
  );
}

export default Products;
