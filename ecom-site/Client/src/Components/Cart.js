import React, { useState, useEffect } from "react";
import { Route, useParams, useMatch } from "react-router-dom";
import Axios from "axios";
import { Buffer } from "buffer";
import "material-icons/iconfont/material-icons.css";

function Cart() {
  const [cartProductData, setCartProductData] = useState([]);
  const [cartQty, setCartQty] = useState(0);
  const [cartCost, setCartCost] = useState(0);

  useEffect(() => {
    LoadData();
  }, []);

  useEffect(() => {
    GetCartTotalCost();
    GetCartTotalQty();
  }, [cartProductData]);

  const LoadData = async () => {
    //Get storage data and load product information from database.
    let localCartItems = await JSON.parse(localStorage.getItem("cart"));

    if (localCartItems.length > 0) {
      //get product data based on cart items product ids.
      let productData = await CreateProductCartList(localCartItems);

      let imageData = await CreateImageCartList(localCartItems);

      //now pair cart items with image based on product id
      await CreateCartDataObjects(productData, localCartItems, imageData);
    } else {
      setCartProductData([]);
    }
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

      for (let k = 0; k < productIDImagePairs.length; k++) {
        if (productIDImagePairs[k][0].productID == cartObj.productID) {
          imageObj = productIDImagePairs[k][0];
        }
      }

      cartProductObjs.push({
        data: productObj,
        cart: cartObj,
        image: imageObj,
      });
    }
    setCartProductData(cartProductObjs);
    console.log("Finished Loading Data...");
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
    if (items == null) {
      return;
    }
    if (items.length > 0) {
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
        return tempProducts;
      });
    }
  };

  const GetCartTotalCost = () => {
    if (cartProductData.length > 0) {
      let cartTotal = 0;

      for (let i = 0; i < cartProductData.length; i++) {
        cartTotal +=
          cartProductData[i].data.productPrice.toFixed(2) *
          cartProductData[i].cart.quantity;
      }
      setCartCost(cartTotal);
    } else {
      setCartCost(0);
    }
  };

  const GetCartTotalQty = () => {
    if (cartProductData.length > 0) {
      let cartTotal = 0;

      for (let i = 0; i < cartProductData.length; i++) {
        cartTotal += cartProductData[i].cart.quantity;
      }
      setCartQty(cartTotal);
    } else {
      setCartQty(0);
    }
  };

  const RemoveCartItem = async (productID) => {
    let tempCart = await JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < tempCart.length; i++) {
      if (tempCart[i].productID == productID) {
        tempCart.splice(i, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(tempCart));
    LoadData();
    GetCartTotalCost();
    GetCartTotalQty();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <div className="row">
            <div className="col-12">
              {cartProductData.map((val, key) => {
                return (
                  <div key={key}>
                    <div className="row">
                      <div className="col-1 my-auto align-items-center text-center">
                        <button
                          onClick={() => RemoveCartItem(val.data.productID)}
                          className="btn btn-danger btn-sm"
                        >
                          <span className="material-icons-round">
                            delete_forever
                          </span>
                        </button>
                      </div>
                      <div className="col-2">
                        <img
                          className="img-fluid w-100"
                          alt="not found"
                          width={"250px"}
                          src={val.image.productImage}
                        />
                      </div>
                      <div className="col-6 d-flex align-items-center">
                        <div>{val.data.productName}</div>
                      </div>
                      <div className="col-1 d-flex align-items-center justify-content-end">
                        <div>
                          <div className="d-flex">
                            <button className="btn btn-outline-secondary btn-sm">
                              -
                            </button>
                            <p className="my-auto px-1">{val.cart.quantity}</p>
                            <button className="btn btn-outline-secondary btn-sm">
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-2 d-flex align-items-center justify-content-end">
                        <div>
                          £
                          {(val.data.productPrice * val.cart.quantity).toFixed(
                            2
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <hr className="bg-primary border-2 border-top border-primary" />
              <div className="row">
                <div className="col-8 d-flex justify-content-start">
                  <h2>Total: </h2>
                </div>
                <div className="col-2 d-flex justify-content-end align-items-center">
                  <p className="fw-bold">{cartQty}</p>
                </div>
                <div className="col-2 d-flex justify-content-end">
                  <p className="fw-bold">£{cartCost.toFixed(2)} </p>
                </div>
              </div>
              <hr className="bg-primary border-2 border-top border-primary" />
            </div>
          </div>
        </div>
        <div className="col-3">checkout?</div>
      </div>
    </div>
  );
}

export default Cart;
