import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";

function Products() {
  const [productList, setProductList] = useState([]);
  const [productImagesList, setProductImagesList] = useState([]);
  const [asciiImageData, setAsciiImageData] = useState([]);
  const [productObjectData, setProductObjectData] = useState([]);
  //{productData: Object, productImage: string}

  const [initProducts, setInitProducts] = useState(false);

  const newTo = {
    pathname: "/productpage",
    param1: "Par1",
  };
  useEffect(() => {
    if (!initProducts) {
      GetProductsList();
      setInitProducts(true);
    }
  }, []);

  //when the product list is set, retrieve the images.
  useEffect(() => {
    if (productList.length > 0) {
      CreateProductImageList();
      console.log("i fire once");
    }
  }, [productList]);

  useEffect(() => {
    if (productImagesList.length > 0) {
      //now convert blob data into id/base64 pair.
      CreateImageProductPairList();
    }
  }, [productImagesList]);

  const CreateImageProductPairList = async () => {
    //convert blob data to base64
    let imgProdIDPairs = await CreateImageProductIDPairs();
    let finalPairList = [];

    return Promise.all(
      //need to check if product list is > 0
      productList.map(async (val) => {
        console.log("val:", val);
        let productID = val.productID;
        let objImg = imgProdIDPairs.find((o) => o.productID == productID);
        finalPairList.push({ val, objImg });
      })
    ).then(() => {
      setProductObjectData(finalPairList);
      return "Success!";
    });
  };

  const CreateProductImageList = async () => {
    let tempImages = [];
    return Promise.all(
      //need to check if product list is > 0
      productList.map(async (val) => {
        let params = new URLSearchParams([["productID", val.productID]]);
        await Axios.get("http://localhost:3001/api/getproductimagesingle", {
          params,
        }).then((response) => {
          tempImages.push(response.data[0]);
          console.log("Image Returned: ", response.data[0]);
        });
      })
    ).then(() => {
      setProductImagesList(tempImages);
      console.log("Succes!", tempImages);
      return "Success!";
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

  //this function is creating an array of base64 images so we dont have to do each one
  //with a seperate function call. and linking them togethor in a single obj with productID as the key.
  const CreateImageProductIDPairs = async () => {
    const tempPairObj = [];
    return new Promise((resolve) => {
      productImagesList.map(async (val, key) => {
        //Convert images to images.
        let tempImgData = Buffer.from(val.imageBlob, "base64").toString(
          "ascii"
        );
        let tempID = val.productID;
        tempPairObj.push({ productID: tempID, productImage: tempImgData });
      });
      //console.log("temp pair", tempPairObj);
      resolve(tempPairObj);
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
        {productObjectData.map((val, key) => {
          return (
            <div key={key} className="border border-primary container mt-3">
              <div className="row">
                <div id="previewImg" className="col-2">
                  <img
                    className="img-fluid"
                    alt="not found"
                    width={"250px"}
                    src={val.objImg.productImage}
                  />
                </div>
                <div id="productInfo" className="col-7">
                  <h1>{val.val.productID}</h1>
                  <h1>{val.val.productName}</h1>
                  <h4>{val.val.productDesc}</h4>
                  <h3 className="font-weight-bold">£{val.val.productPrice}</h3>
                </div>
                <div className="col-3">
                  <button type="button" className="btn btn-success">
                    Add To Cart
                  </button>{" "}
                  <Link to={`/productpage/${val.val.productID}`}>
                    <button type="button" className="btn btn-success">
                      View Product
                    </button>
                  </Link>
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
