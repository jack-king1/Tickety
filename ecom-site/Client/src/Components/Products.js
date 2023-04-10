import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Route, useParams, useMatch } from "react-router-dom";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import "../CSS/App.css";
import "../CSS/homepage.css";

function Products(props) {
  const { footerSearch } = useParams();
  const [productList, setProductList] = useState([]);
  const [productImagesList, setProductImagesList] = useState([]);
  const [asciiImageData, setAsciiImageData] = useState([]);
  const [productObjectData, setProductObjectData] = useState([]);
  const [searchProductData, setSearchProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //{productData: Object, productImage: string}
  const [productTags, setProductTags] = useState([]);

  const [initProducts, setInitProducts] = useState(false);

  useEffect(() => {
    if (!initProducts) {
      GetProductsList();
      setInitProducts(true);
      FooterSearchQueryInit();
    }
  }, []);

  useEffect(() => {
    if (
      footerSearch === null ||
      footerSearch === undefined ||
      footerSearch != ""
    ) {
      setSearchQuery(footerSearch);
    }
  }, [footerSearch]);

  //when the product list is set, retrieve the images.
  useEffect(() => {
    if (productList.length > 0) {
      CreateProductImageList();
      //console.log("i fire once");
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
        //console.log("val:", val);
        let productID = val.productID;
        let objImg = imgProdIDPairs.find((o) => o.productID == productID);
        finalPairList.push({ val, objImg });
      })
    ).then(() => {
      setProductObjectData(finalPairList);
      return "Success!";
    });
  };

  const FooterSearchQueryInit = () => {
    if (
      footerSearch === null ||
      footerSearch === undefined ||
      footerSearch != ""
    ) {
      console.log("Search Query From Footer: ", footerSearch);
      setSearchQuery("");
    } else {
      setSearchQuery(footerSearch);
    }
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
          //console.log("Image Returned: ", response.data[0]);
        });
      })
    ).then(() => {
      setProductImagesList(tempImages);
      //console.log("Succes!", tempImages);
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

  //Get Product Display
  const DisplayProducts = () => {
    if (searchQuery === "all") {
      return (
        <div className="row justify-content-center">
          {productObjectData.map((val, key) => {
            return (
              <div
                key={key}
                className="col-lg-2 col-md-6 col-sm-6 mt-3 me-lg-3 me-sm-0 circle-image"
              >
                <div className="m-1 text-center rounded h-100 p-3">
                  <div id="previewImg" className="">
                    <img
                      className="img-fluid w-75 rounded-2"
                      alt="not found"
                      width={"250px"}
                      src={val.objImg.productImage}
                    />
                  </div>
                  <div id="productInfo">
                    <p>{val.val.productName}</p>
                    <p className="fw-bold text-success">
                      £{val.val.productPrice}
                    </p>
                    <Link to={`/productpage/${val.val.productID}`}>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        View Product
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="row justify-content-center">
          {productObjectData
            .filter((productData) => {
              if (searchQuery === "") {
                //if query is empty
                return productData;
              } else if (
                productData.val.productName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ) {
                //returns filtered array
                return productData;
              }
            })
            .map((val, key) => {
              return (
                <div
                  key={key}
                  className="col-lg-2 col-md-6 col-sm-6 mt-3 me-lg-3 me-sm-0 circle-image"
                >
                  <div className="m-1 text-center rounded h-100 p-3">
                    <div id="previewImg" className="">
                      <img
                        className="img-fluid w-75 rounded-2"
                        alt="not found"
                        width={"250px"}
                        src={val.objImg.productImage}
                      />
                    </div>
                    <div id="productInfo">
                      <p>{val.val.productName}</p>
                      <p className="fw-bold text-success">
                        £{val.val.productPrice}
                      </p>
                      <Link to={`/productpage/${val.val.productID}`}>
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                        >
                          View Product
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      );
    }
  };

  return (
    <div className="maxheight">
      <div className="container pt-3">
        {/* <div className="text-center display-5 fw-bold">Products</div> */}
        <div className="input-group my-3 w-50 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              Search
            </button>
          </div>
        </div>
        {DisplayProducts()}
      </div>
    </div>
  );
}

export default Products;
