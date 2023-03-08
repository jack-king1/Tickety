import React from "react";
import { Route, useParams, useMatch } from "react-router-dom";

function ProductPage() {
  const { productID } = useParams();
  //const { path } = useMatch();
  //www.youtube.com/watch?v=WfpmvgVZD1A
  return (
    <div>
      {console.log(productID)}Product ID: {productID}
    </div>
  );
}

export default ProductPage;
