import React, { useState, useEffect } from "react";
import { Route, useParams, useMatch } from "react-router-dom";
import Axios from "axios";
import { Buffer } from "buffer";
import "material-icons/iconfont/material-icons.css";

function Cart() {
  const [cartProductData, setCartProductData] = useState([]);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async () => {
    //Get storage data and load product information from database.
    let localCartItems = await JSON.parse(localStorage.getItem("cart"));

    //get product data based on cart items product ids.
    let productData = await CreateProductCartList(localCartItems);

    let imageData = await CreateImageCartList(localCartItems);

    //now pair cart items with image based on product id
    await CreateCartDataObjects(productData, localCartItems, imageData);
  };

  const CreateCartDataObjects = async (productData, localCartItems, images) => {
    //convert blob data to ascii with matching productID
    let productIDImagePairs = await CreateImageProductIDPairs(images);
    let productObj;
    let cartObj;
    let imageObj;
    let cartProductObjs = [];
    for (let i = 0; i < localCartItems.length; i++) {
      cartObj = localCartItems[i];

      for (let j = 0; j < productData.length; j++) {
        if (productData[j][0].productID == cartObj.productID) {
          productObj = productData[j][0];
        }
      }

      for (let k = 0; k < images.length; k++) {
        if (images[k].productID == cartObj.productID) {
          imageObj = images[k];
        }
      }

      cartProductObjs.push({
        data: productObj,
        cart: cartObj,
        image: imageObj,
      });
    }
    console.log(cartProductObjs);
    setCartProductData(cartProductObjs);
  };

  //this function is creating an array of base64 images so we dont have to do each one
  //with a seperate function call. and linking them togethor in a single obj with productID as the key.
  const CreateImageProductIDPairs = async (imageData) => {
    const tempPairObj = [];
    return new Promise((resolve) => {
      imageData.map(async (val, key) => {
        //Convert images to images.
        let tempImgData = Buffer.from(val.imageBlob, "base64").toString(
          "ascii"
        );
        let tempID = val.productID;
        tempPairObj.push([{ productID: tempID, productImage: tempImgData }]);
      });
      //console.log("temp pair", tempPairObj);
      resolve(tempPairObj);
    });
  };

  const CreateImageCartList = async (items) => {
    let tempBlobData = [];
    return Promise.all(
      //need to check if product list is > 0
      items.map(async (val) => {
        let params = new URLSearchParams([["productID", val.productID]]);
        await Axios.get("http://localhost:3001/api/getproductimage", {
          params,
        }).then((response) => {
          tempBlobData.push(response.data[0]);
        });
      })
    ).then(() => {
      //console.log("Cart products: ", tempBlobData);
      return tempBlobData;
    });
  };

  const CreateProductCartList = async (items) => {
    let tempProducts = [];
    return Promise.all(
      //need to check if product list is > 0
      items.map(async (val) => {
        let params = new URLSearchParams([["productID", val.productID]]);
        await Axios.get("http://localhost:3001/api/getproductwithid", {
          params,
        }).then((response) => {
          tempProducts.push(response.data);
          //console.log("Image Returned: ", response.data[0]);
        });
      })
    ).then(() => {
      console.log("Cart products: ", tempProducts);
      return tempProducts;
    });
  };

  return (
    <div>
      {cartProductData.map((val, key) => {
        console.log("Val: ", val.data.productName);
        return <div key={key}>{val.data.productName}</div>;
      })}
    </div>
  );
}

export default Cart;
