import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/homepage.css";
import BgImage from "../Images/logo-white.png";

function Home() {
  return (
    <div className="jumbotron">
      <div className="d-flex h-50 justify-content-center">
        <div className="text-center w-100">Hello</div>
        <div className="text-center w-100">User</div>
      </div>
    </div>
  );
}

export default Home;
