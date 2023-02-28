import React, { useState, useEffect } from "react";
import Axios from "axios";

function Products() {
  const [productList, setProductList] = useState([]);

  const debugCLick = () => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response);
      setProductList(response.data);
    });
  };

  return (
    <div>
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
