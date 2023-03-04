import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Buffer } from "buffer";
var fs = require("fs");

function Admin() {
  const [productName, setProductName] = useState("test");
  const [productDesc, setProductDesc] = useState("test");
  const [productPrice, setProductPrice] = useState("test");
  const [itemDelete, setItemDelete] = useState("");
  const [productList, setProductList] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [imageBlobData, setImageBlobData] = useState([]);
  const [asciiImageData, setAsciiImageData] = useState([]);
  const [tempProduct, setTempProduct] = useState();
  const [lastIDData, setLastIDData] = useState({});

  let lastRowProductData;

  //do something when upload images variable changes
  useEffect(() => {
    // Update the document title using the browser API.
    if (uploadImages.length > 0) {
      alert("New images addedd successfully!");
    }
  }, [uploadImages]);

  const sendProductPostRequest = async () => {
    await Axios.post("http://localhost:3001/api/insert/", {
      productName: productName,
      productDesc: productDesc,
      productPrice: productPrice,
    }).then((response) => {
      console.log("Insert Success!", response);
      return "success!";
    });
  };

  const addImagesToDB = () => {
    Axios.post("http://localhost:3001/api/insertimage", {
      productName: productName,
      productDesc: productDesc,
      productPrice: productPrice,
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

  const ConvertImageToBlob = () => {
    if (uploadImages.length > 0) {
      let tempBlobData = [];
      setImageBlobData([]);
      uploadImages.map((val, key) => {
        let blob = val.tempBlobData.push(val);
      });
    } else {
      console.log("no images to convert!");
    }
  };

  async function encodeImageFileAsURL(imgToEncode) {
    return new Promise((resolve) => {
      var file = imgToEncode;
      //console.log(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        //console.log("RESULT", reader.result);
        resolve(reader.result);
      };
    });
  }

  async function InsertImagesToDB() {
    return Promise.all(
      uploadImages.map(async (val) => {
        let blobImage;
        let tempName = lastRowProductData.productName;
        blobImage = await encodeImageFileAsURL(val);
        await Axios.post("http://localhost:3001/api/insertimage", {
          imageName: tempName,
          productImage: blobImage,
          productID: lastRowProductData.productID,
        }).then((response) => {
          console.log("image uploaded to db...", response);
        });
      })
    );
  }

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

  async function debugGetImageFromDB() {
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
  }

  //get the last productID of the last row inserted into product database.
  //this will return the entire row so can use for other columns.
  async function GetLastID() {
    await Axios.get("http://localhost:3001/api/getlastid").then((response) => {
      console.log("LastID: ", response);
      let tempObj = {
        productName: response.data[0].productName,
        productID: response.data[0].productID,
      };
      lastRowProductData = tempObj;
      console.log("Saved Data:", lastRowProductData);
      return "success!";
    });
  }

  //this function will handle everything from uploading product and images.
  //And call the appropriate functions.
  async function UploadProductToDB() {
    //maybe start a loading bar here to tell user that its doing something.
    await sendProductPostRequest();
    console.log("Add Product Info To DB - Complete!");
    //get last ID
    await GetLastID();
    console.log("Retrieve data for last product - Complete!");
    console.log("Last ID Data: ", lastRowProductData);
    //insert images to db
    await InsertImagesToDB(lastRowProductData);
    console.log("Add Product Images Info To DB - Complete!");

    console.log("Product Added!");
  }

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
        </div>

        {/* <div className="mt-4">
          <button onClick={debugCLick}>Display All Products</button>
          {productList.map((val) => {
            return (
              <h1>
                Product: {val.productName} | Product Description:{" "}
                {val.productDesc} | Product Price: {val.productPrice}
              </h1>
            );
          })}
        </div> */}
      </div>
      <div className="mt-4">
        <form>
          <label>Delete Item: </label>
          <input type="text" onChange={(e) => setItemDelete(e.target.value)} />
        </form>
        <button onClick={removeProductFromDB}>Click to delete entry</button>
      </div>
      <div className="mt-4">
        <form action="/store-image" method="POST" encType="multipart/form-data">
          <label>Store Image</label>
          <br></br>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              const fileListAsArray = Array.from(e.target.files);
              setUploadImages(fileListAsArray);
              //setUploadImages();
            }}
            multiple
          />
        </form>
        <div className="d-flex">
          {uploadImages.map((val, key) => {
            return (
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(val)}
              />
            );
          })}
        </div>
        <div className="d-flex">
          {asciiImageData.map((val, key) => {
            return <img alt="not found" width={"250px"} src={val} />;
          })}
        </div>
        <button type="submit" onClick={UploadProductToDB}>
          Create New Product
        </button>
      </div>
    </div>
  );
}

export default Admin;
