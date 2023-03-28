import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/homepage.css";
import BgImage from "../Images/printer.png";

function Home() {
  return (
    <div className="">
      <div className="jumbotron-color w-100">
        <div className="container h-100">
          <div className="d-flex h-100 justify-content-center">
            <div className="text-end w-75 my-auto display-6 fw-bold">
              <span className="accent-text fw-bold">All-In-One Solution </span>
              To Your
              <span className="underline-text"> Business Display Needs!</span>
              <div>
                <button className="btn btn-large btn-primary">More Info</button>
              </div>
            </div>

            <div className="text-center w-75 my-auto">
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
