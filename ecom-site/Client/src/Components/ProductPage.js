import React, { useState, useEffect } from "react";
import { Route, useParams, useMatch } from "react-router-dom";
import Axios from "axios";
import { Buffer } from "buffer";
import "material-icons/iconfont/material-icons.css";
import "../CSS/App.css";
import AddReview from "./AddReview";

function ProductPage(props) {
  const { productID } = useParams();
  //const { path } = useMatch();
  const [productData, setProductData] = useState([]);
  const [initProduct, setInitProduct] = useState(false);
  const [productImagesList, setProductImagesList] = useState([]);
  const [convertedImagesList, setConvertedImagesList] = useState([]);
  const [imageSelected, setImageSelected] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [productQty, setProductQty] = useState(-1);
  const [reviewCount, setReviewCount] = useState(0);
  const [productReviews, setProductReviews] = useState([]);
  const [productReviewAverageRating, setProductReviewAverageRating] =
    useState(0);
  const [completedProductReview, setCompletedProductReview] = useState(false);
  const [accountID, setAccountID] = useState(-1);

  useEffect(() => {
    if (!initProduct) {
      SetupProductPage();
      setInitProduct(true);
      let tempID = localStorage.getItem("accountID");
      setAccountID(tempID);
    }
  }, []);

  useEffect(() => {
    if (productData.length > 0) {
      setProductDesc(productData[0].productDesc);
      setProductQty(productData[0].productQty);
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
      //console.log(convertedImagesList);
    }
  }, [convertedImagesList]);

  useEffect(() => {
    for (let i = 0; i < productReviews.length; i++) {
      if (productReviews[i].accountID == accountID) {
        console.log("Has Already Reviewed!");
        setCompletedProductReview(true);
        break;
      }
    }
  }, [productReviews]);

  const SetupProductPage = async () => {
    //Request data from server.
    await GetProductData();

    //Convert images into renderable url
  };

  const HandleAddToCart = () => {
    let currentCartData = JSON.parse(localStorage.getItem("cart"));
    let cartValues = [];
    let finalCartValues = [];

    if (currentCartData !== null && currentCartData !== undefined) {
      for (let i = 0; i < currentCartData.length; i++) {
        cartValues.push(currentCartData[i]);
      }

      if (cartValues.some((e) => e.productID === productID)) {
        for (let i = 0; i < cartValues.length; i++) {
          if (cartValues[i].productID == productID) {
            cartValues[i].quantity++;
          }
        }
      } else {
        //products already in cart, but not this one, add it now...
        cartValues.push({ productID: productID, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cartValues));
    } else if (
      currentCartData == null ||
      currentCartData == undefined ||
      currentCartData == []
    ) {
      //create a new entry
      cartValues.push({ productID: productID, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cartValues));
    }
    console.log("Props:", props);
    {
      props.updateCartIcon();
    }
    console.log(JSON.parse(localStorage.getItem("cart")));
    //console.log(cartValues.includes(productID));
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

    await Axios.get("http://localhost:3001/api/getproductwithid", {
      params,
    }).then((response) => {
      //console.log("Product: ", response);
      setProductData(response.data);
    });

    await Axios.get("http://localhost:3001/api/getproductreviews", {
      params,
    })
      .then((response) => {
        //console.log("Product: ", response);
        setProductReviews(response.data);
      })
      .then((response) => {
        return "Success!";
      });
  };

  const GetProductName = () => {
    if (productData.length > 0) {
      return productData[0].productName;
    }
  };

  const GetProductDesc = () => {
    if (productData.length > 0) {
      return productDesc;
    }
  };

  const GetProductPrice = () => {
    if (productData.length > 0) {
      return productData[0].productPrice;
    }
  };

  const GetReviewCount = () => {
    return productReviews.length.toString();
  };

  const ReviewStarsStyle = () => {
    let reviewTotalScore = 0;
    let reviewAverage = 0;
    let reviewStars = [];

    //Calculate review average
    if (productReviews.length > 0) {
      for (let i = 0; i < productReviews.length; i++) {
        reviewTotalScore += productReviews[i].reviewRating;
      }

      reviewAverage = reviewTotalScore / productReviews.length;

      for (let i = 0; i < 5; i++) {
        if (reviewAverage > i) {
          //Half star check
          if (reviewAverage > i && reviewAverage < i + 1) {
            reviewStars.push(
              <span className="material-icons-outlined text-warning">
                star_half
              </span>
            );
          } else {
            reviewStars.push(
              <span className="material-icons-outlined text-warning">star</span>
            );
          }
        } else {
          reviewStars.push(
            <span className="material-icons-outlined">star_border</span>
          );
        }
      }
    }

    return reviewStars;
  };

  const GetStars = (reviewRating) => {
    let reviewStars = [];
    for (let i = 0; i < 5; i++) {
      if (reviewRating > i) {
        //Half star check
        if (reviewRating > i && reviewRating < i + 1) {
          reviewStars.push(
            <span className="material-icons-outlined text-warning">
              star_half
            </span>
          );
        } else {
          reviewStars.push(
            <span className="material-icons-outlined text-warning">star</span>
          );
        }
      } else {
        reviewStars.push(
          <span className="material-icons-outlined mt-0">star_border</span>
        );
      }
    }
    return reviewStars;
  };

  const ReviewAverage = () => {
    let reviewTotalScore = 0;
    let reviewAverage = 0;

    //Calculate review average
    if (productReviews.length > 0) {
      for (let i = 0; i < productReviews.length; i++) {
        reviewTotalScore += productReviews[i].reviewRating;
      }

      reviewAverage = reviewTotalScore / productReviews.length;
    }
    return reviewAverage;
  };

  const CheckReviewComplete = (reviewAccountID) => {
    if (reviewAccountID == accountID) {
      setCompletedProductReview(true);
    }
  };

  const GetProductQty = () => {
    return productQty;
  };

  return (
    <div>
      <div className="container maxheight">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 pt-4">
            <img
              className="img-fluid w-100"
              alt="not found"
              width={"250px"}
              src={convertedImagesList[imageSelected]}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
            <h1 className="text-left pt-5">{GetProductName()}</h1>

            <hr className="bg-primary border-2 border-top border-primary" />

            <div className="d-flex inline-block">
              {ReviewStarsStyle().map((val, key) => {
                return val;
              })}

              <p className="ps-3">{GetReviewCount()} reviews</p>
            </div>

            <h1 className="pt-3 font-weight-bold text-success">
              £{GetProductPrice()}
            </h1>
            <p className="fw-bold">Qty: {GetProductQty()}</p>

            <button
              onClick={() => HandleAddToCart()}
              className="btn btn-success mt-1"
            >
              <h4>BUY NOW</h4>
            </button>

            <hr className="bg-primary border-2 border-top border-primary" />
            <p className="pt-5 display-6">{GetProductDesc()}</p>
          </div>
          <div>
            <div className="d-flex align-items-center">
              <h2 className="mb-4 me-2">Reviews - {ReviewStarsStyle()}</h2>
              <h6 className="mb-4">{ReviewAverage()}</h6>
            </div>

            <div className="row">
              {productReviews.map((val, key) => {
                return (
                  <div className="mb-4 col-4">
                    <p className="mb-0 fw-bold">
                      {val.anonymous == true ? "Anonymous" : val.username}
                    </p>
                    <div className="d-flex">
                      <div className="pe-4">{val.reviewText}</div>
                    </div>
                    <div className="mb-0">{GetStars(val.reviewRating)}</div>
                  </div>
                );
              })}
            </div>
            <AddReview
              productID={productID}
              reviewComplete={completedProductReview}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
