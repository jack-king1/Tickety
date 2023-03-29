import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/homepage.css";
import BgImage from "../Images/printer.png";

function Home() {
  return (
    <div className="">
      <div className="jumbotron-color w-100">
        <div className="container h-100">
          <div className="d-flex flex-column-reverse flex-xl-row flex-md-row flex-lg-row flex-sm-column h-100 justify-content-center">
            <div className="text-end w-75 my-auto display-6 fw-bold">
              <span className="accent-text fw-bold">All-In-One Solution </span>
              To Your
              <span className="underline-text"> Business Display Needs!</span>
              <div>
                <button className="btn btn-large btn-primary">More Info</button>
              </div>
            </div>

            <div className="text-center w-75 my-auto mx-auto">
              <img
                className="img-fluid w-75"
                alt="not found"
                width={"250px"}
                src={BgImage}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-100">
        <div className="container h-100">
          <div className="text-center display-6 m-4 fw-bold">
            <span className="accent-text fw-bold">
              What Our Customers Have To Say!
            </span>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 justify-content-center d-flex flex-column">
              <img
                className="img-fluid w-75 round-img"
                src={require("../Images/reviewer-1.jpg")}
              />
              <div className="text-black fw-bold text-center">Josh M.</div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 justify-content-center d-flex">
              <img
                className="img-fluid w-75 round-img"
                src={require("../Images/reviewer-2.jpg")}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 justify-content-center d-flex">
              <img
                className="img-fluid w-75 round-img"
                src={require("../Images/reviewer-3.jpg")}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 justify-content-center d-flex">
              <img
                className="img-fluid w-75 round-img"
                src={require("../Images/reviewer-4.jpg")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="jumbotron w-100">
        <div className="container h-100">
          <div className="d-flex h-100 justify-content-center">
            <div className="text-center w-75 my-auto">Hello</div>
            <div className="text-center w-75 my-auto">User</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
