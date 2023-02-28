import React, { useState, useEffect } from "react";
import Axios from "axios";

function Products() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    debugCLick();
  }, []);

  const debugCLick = () => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response);
      setProductList(response.data);
    });
  };

  return (
    <div className="container">
      <div>
        {productList.map((val) => {
          return (
            <div className="border border-primary container mt-3">
              <div className="row">
                <div id="previewImg" className="col-2">
                  IMG
                </div>
                <div id="productInfo" className="col-7">
                  <h1>{val.productName}</h1>
                  <h4>{val.productDesc}</h4>
                  <h3 className="font-weight-bold">£{val.productPrice}</h3>
                </div>
                <div className="col-3">
                  <button type="button" class="btn btn-success">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
