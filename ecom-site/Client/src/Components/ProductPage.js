import React, { useState, useEffect } from "react";
import { Route, useParams, useMatch } from "react-router-dom";
import Axios from "axios";
import { Buffer } from "buffer";

function ProductPage() {
  const { productID } = useParams();
  //const { path } = useMatch();
  const [productData, setProductData] = useState([]);
  const [initProduct, setInitProduct] = useState(false);
  const [productImagesList, setProductImagesList] = useState([]);
  const [convertedImagesList, setConvertedImagesList] = useState([]);

  useEffect(() => {
    if (!initProduct) {
      SetupProductPage();
      setInitProduct(true);
    }
  }, []);

  useEffect(() => {
    if (productData != []) {
      GetProductImages();
    }
  }, [productData]);

  useEffect(() => {
    if (productImagesList.length > 0) {
      ConvertBlobToImages();
    }
  }, [productImagesList]);

  useEffect(() => {
    if (convertedImagesList.length > 0) {
      console.log(convertedImagesList);
    }
  }, [convertedImagesList]);

  const SetupProductPage = async () => {
    //Request data from server.
    await GetProductData();
    //Convert images into renderable url
  };

  const GetProductImages = async () => {
    let params = new URLSearchParams([["productID", productID]]);

    await Axios.get("http://localhost:3001/api/getproductimage", { params })
      .then((response) => {
        //console.log("Product: ", response);
        setProductImagesList(response.data);
        //Now convert them to readable data.
      })
      .then(() => {
        return "Success!";
      });
  };

  const ConvertBlobToImages = async () => {
    const convertedImages = [];
    return new Promise((resolve) => {
      productImagesList.map((val, key) => {
        //Convert images to images.
        convertedImages.push(
          Buffer.from(val.imageBlob, "base64").toString("ascii")
        );
      });
      setConvertedImagesList(convertedImages);
      resolve("Success!");
    });
  };

  const GetProductData = async () => {
    let params = new URLSearchParams([["productID", productID]]);

    await Axios.get("http://localhost:3001/api/getproductwithid", { params })
      .then((response) => {
        console.log("Product: ", response);
        setProductData(response.data);
      })
      .then(() => {
        return "Success!";
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <img
              className="img-fluid"
              alt="not found"
              width={"250px"}
              src={convertedImagesList[0]}
            />
          </div>
          <div className="col-6">
            <h1>{productData[0].productName}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
