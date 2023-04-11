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
  const [ticketFilter, setTicketFilter] = useState(false);
  const [standFilter, setStandFilter] = useState(false);
  const [pinFilter, setPinFilter] = useState(false);
  const [printerFilter, setPrinterFilter] = useState(false);
  const [cleaningFilter, setCleaningFilter] = useState(false);

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

  useEffect(() => {
    console.log("Final product Data: ", productObjectData);
  }, [productObjectData]);

  const CreateImageProductPairList = async () => {
    //convert blob data to base64
    let productTagsAll = [];
    let imgProdIDPairs = await CreateImageProductIDPairs();
    let finalPairList = [];

    await Axios.get("http://localhost:3001/api/getallproducttags").then(
      (response) => {
        productTagsAll = response.data;
      }
    );

    return Promise.all(
      //need to check if product list is > 0
      productList.map(async (val) => {
        //console.log("val:", val);
        let productID = val.productID;
        let objImg = imgProdIDPairs.find((o) => o.productID == productID);
        let tags;

        //Get product tags
        //use filter function here to filter tags for product id array
        tags = productTagsAll.filter((tag) => {
          if (tag.productID === val.productID) {
            return tag;
          }
        });
        finalPairList.push({ val, objImg, tags });
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
    if (
      (searchQuery === "all" || searchQuery === "") &&
      ticketFilter === false &&
      standFilter === false &&
      pinFilter === false &&
      printerFilter === false &&
      cleaningFilter === false
    ) {
      return (
        <div className="row justify-content-center mb-4">
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
        <div className="row justify-content-center mb-4">
          {productObjectData
            .filter((productData) => {
              if (
                searchQuery === "" &&
                ticketFilter === false &&
                standFilter === false &&
                pinFilter === false &&
                printerFilter === false &&
                cleaningFilter === false
              ) {
                //if query is empty
                return productData;
              } else if (
                searchQuery !== "all" ||
                ticketFilter === true ||
                standFilter === true ||
                pinFilter === true ||
                printerFilter === true ||
                cleaningFilter === true
              ) {
                //returns filtered array
                if (searchQuery !== "all" || searchQuery !== "") {
                  if (CheckSearchIncludes(productData)) {
                    return productData;
                  }
                }

                console.log("cleaningFilter", cleaningFilter);
                if (cleaningFilter === true) {
                  if (productData.tags.length > 0) {
                    //console.log("Cleaning Obj:", productData);
                    for (let i = 0; i < productData.tags.length; i++) {
                      if (productData.tags[i].tagID == 5) {
                        return productData;
                      }
                    }
                  }
                }

                if (ticketFilter === true) {
                  if (productData.tags.length > 0) {
                    for (let i = 0; i < productData.tags.length; i++) {
                      if (productData.tags[i].tagID == 1) {
                        console.log("TICKET FILTER", ticketFilter);
                        return productData;
                      }
                    }
                  }
                }
                if (standFilter === true) {
                  if (productData.tags.length > 0) {
                    for (let i = 0; i < productData.tags.length; i++) {
                      if (productData.tags[i].tagID == 2) {
                        return productData;
                      }
                    }
                  }
                }

                if (pinFilter === true) {
                  if (productData.tags.length > 0) {
                    for (let i = 0; i < productData.tags.length; i++) {
                      if (productData.tags[i].tagID == 4) {
                        return productData;
                      }
                    }
                  }
                }

                if (printerFilter === true) {
                  if (productData.tags.length > 0) {
                    for (let i = 0; i < productData.tags.length; i++) {
                      if (productData.tags[i].tagID == 3) {
                        return productData;
                      }
                    }
                  }
                }
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

  const CheckSearchIncludes = (productData) => {
    return productData.val.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
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
        <div className="d-flex">
          <div className="mx-auto d-flex gap-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={() => setTicketFilter(!ticketFilter)}
              />
              <label class="form-check-label" for="flexCheckDefault">
                Tickets
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                onChange={() => setStandFilter(!standFilter)}
              />
              <label class="form-check-label" for="flexCheckChecked">
                Stands
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                onChange={() => setPinFilter(!pinFilter)}
              />
              <label class="form-check-label" for="flexCheckChecked">
                Pin
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                onChange={() => setPrinterFilter(!printerFilter)}
              />
              <label class="form-check-label" for="flexCheckChecked">
                Printer
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                onChange={() => setCleaningFilter(!cleaningFilter)}
              />
              <label class="form-check-label" for="flexCheckChecked">
                Cleaning
              </label>
            </div>
          </div>
        </div>
        {DisplayProducts()}
      </div>
    </div>
  );
}

export default Products;
