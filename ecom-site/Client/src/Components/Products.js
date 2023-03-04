import React, { useState, useEffect } from "react";
import Axios from "axios";

function Products() {
  const [productList, setProductList] = useState([]);
  const [productImagesList, setProductImagesList] = useState([]);
  const [asciiImageData, setAsciiImageData] = useState([]);
  const [productObjectData, setProductObjectData] = useState([]);
  //{productData: Object, productImage: string}

  const [initProducts, setInitProducts] = useState(false);
  useEffect(() => {
    if (!initProducts) {
      GetProductsList();
      console.log("i fire once");
      setInitProducts(true);
    }
  }, []);

  //when the product list is set, retrieve the images.
  useEffect(() => {
    CreateProductImageList();
  }, [productList]);

  const CreateProductImageList = async () => {
    let tempImages = [];
    return Promise.all(
      //need to check if product list is > 0
      productList.map(async (val) => {
        let params = new URLSearchParams([["productID", val.productID]]);
        await Axios.get("http://localhost:3001/api/getproductimagesingle", {
          params,
        }).then((response) => {
          console.log("Image Returned: ", response);
        });
      })
    ).then(() => {
      return;
    });
  };

  const GetProductsList = async () => {
    await Axios.get("http://localhost:3001/api/get")
      .then((response) => {
        console.log("Product: ", response);
        setProductList(response.data);
      })
      .then(() => {
        return "Success!";
      });
  };

  const ConvertBlobToImages = async (blobs) => {
    const convertedImages = [];
    return new Promise((resolve) => {
      blobs.map((val, key) => {
        //Convert images to images.
        convertedImages.push(
          Buffer.from(val.imageBlob, "base64").toString("ascii")
        );
      });
      resolve(convertedImages);
    });
  };

  const GetProductImages = async (productID) => {
    const tempImages = [];
    const params = new URLSearchParams([["productID", 1]]);
    Axios.get("http://localhost:3001/api/getproductimage", {
      params,
    }).then(async (response) => {
      console.log(response.data);
      const imagesFromDB = await ConvertBlobToImages(response.data);
      console.log(imagesFromDB);
      setAsciiImageData(imagesFromDB);
    });
  };

  return (
    <div className="container">
      <div>
        {productList.map((val, key) => {
          return (
            <div key={key} className="border border-primary container mt-3">
              <div className="row">
                <div id="previewImg" className="col-2">
                  img
                </div>
                <div id="productInfo" className="col-7">
                  <h1>{val.productName}</h1>
                  <h4>{val.productDesc}</h4>
                  <h3 className="font-weight-bold">£{val.productPrice}</h3>
                </div>
                <div className="col-3">
                  <button type="button" className="btn btn-success">
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
