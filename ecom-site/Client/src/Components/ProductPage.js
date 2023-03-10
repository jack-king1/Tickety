import React, { useState, useEffect } from "react";
import { Route, useParams, useMatch } from "react-router-dom";
import Axios from "axios";
import { Buffer } from "buffer";
import "material-icons/iconfont/material-icons.css";

function ProductPage() {
  const { productID } = useParams();
  //const { path } = useMatch();
  const [productData, setProductData] = useState([]);
  const [initProduct, setInitProduct] = useState(false);
  const [productImagesList, setProductImagesList] = useState([]);
  const [convertedImagesList, setConvertedImagesList] = useState([]);
  const [imageSelected, setImageSelected] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const [productReviews, setProductReviews] = useState([]);
  const [productReviewAverageRating, setProductReviewAverageRating] =
    useState(0);

  useEffect(() => {
    if (!initProduct) {
      SetupProductPage();
      setInitProduct(true);
    }
  }, []);

  useEffect(() => {
    if (productData.length > 0) {
      setProductDesc(productData[0].productDesc);
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
        console.log("product Reviews: ", response.data);
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
      console.log("Product Rating:", reviewAverage);

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

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <img
              className="img-fluid w-100"
              alt="not found"
              width={"250px"}
              src={convertedImagesList[imageSelected]}
            />
          </div>
          <div className="col-5">
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
            <button className="btn btn-success mt-3">
              <h4>BUY NOW</h4>
            </button>
            <hr className="bg-primary border-2 border-top border-primary" />
            <p className="pt-5 display-6">{GetProductDesc()}</p>
          </div>
          <div>
            <h2>Reviews</h2>
            <div className="">{productReviews.map((val, key) => {})}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
