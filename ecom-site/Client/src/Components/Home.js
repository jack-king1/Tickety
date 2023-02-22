import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">Fast!</div>
          </div>
          <div className="row">
            <div className="col-md-12">More Professional</div>
          </div>
        </div>
        <div className="col-md-4">picture</div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">More Hygienic</div>
          </div>
          <div className="row">
            <div className="col-md-12">Better Readability</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
