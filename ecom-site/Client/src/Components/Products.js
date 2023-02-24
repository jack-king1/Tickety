import React, { useState, useEffect } from "react";
import Axios from "axios";

function Products() {
  const debugCLick = () => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      Products page
      <button onClick={debugCLick}>CLick Me</button>
    </div>
  );
}

export default Products;
