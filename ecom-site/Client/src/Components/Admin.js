import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

function Admin() {
  const [productName, setProductName] = useState("test");
  const [productDesc, setProductDesc] = useState("test");
  const [productPrice, setProductPrice] = useState("test");
  const [itemDelete, setItemDelete] = useState("");
  const [productList, setProductList] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [tempProduct, setTempProduct] = useState();

  //do something when upload images variable changes
  useEffect(() => {
    // Update the document title using the browser API.
    if (uploadImages.length > 0) {
      alert("New images addedd successfully!");
    }
  }, [uploadImages]);

  const addProductToDB = () => {
    Axios.post("http://localhost:3001/api/insert", {
      productName: productName,
      productDesc: productDesc,
      productPrice: productPrice,
    }).then(() => {
      alert("successful insert");
      // initial data has been inserted above...
      // now retrieve productID for inserting images.
      Axios.get("http://localhost:3001/api/getproduct", {
        params: { productName: productName },
      }).then((response) => {
        console.log(response);
        setTempProduct(response.data);
        //loop here?
      });

      //Now we have the product data we want, loop through each image
      //and store them in the mysql database as blob data.

      //after we can remove the temporary reference to the images since they are in the database.
    });
  };

  const addImagesToDB = () => {
    Axios.post("http://localhost:3001/api/insertimage", {
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
      <div className="mt-4">
        <form action="/store-image" method="POST" encType="multipart/form-data">
          <label>Store Image</label>
          <br></br>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              console.log(e.target.files);
              const fileListAsArray = Array.from(e.target.files);
              setUploadImages(fileListAsArray);
              //setUploadImages();
            }}
            multiple
          />
          <button type="submit">Upload</button>
        </form>
        <div className="d-flex">
          {uploadImages.map((val, key) => {
            console.log(uploadImages);
            return (
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(val)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Admin;
