import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

function Navbar() {
  const [loginText, setLoginText] = useState();

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = () => {
    setLoginText(localStorage.getItem("username"));
    SetMenuLoginText();
  };

  const SetMenuLoginText = () => {
    console.log("Login Text: ", loginText);
    if (
      localStorage.getItem("username") == null ||
      localStorage.getItem("username") == undefined
    ) {
      setLoginText("Login");
    } else {
      setLoginText("logout");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand " to="/">
          <h1 className="text-xl text-light">Tickety</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={() => SetMenuLoginText()}
                className="nav-link"
                to="/login"
              >
                {loginText}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //   <div className="container">
    //     <div className="d-flex justify-content-between w-100">
    //       <Link className="navbar-brand mr-auto" to="/">
    //         Ecommerce Site
    //       </Link>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-toggle="collapse"
    //         data-target="#navbarNav"
    //         aria-controls="navbarNav"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarNav">
    //         <ul className="navbar-nav">
    //           <li className="nav-item">
    //             <NavLink className="nav-link" to="/products">
    //               Products
    //             </NavLink>
    //           </li>
    //           <li className="nav-item">
    //             <NavLink className="nav-link" to="/about">
    //               About Us
    //             </NavLink>
    //           </li>
    //           <li className="nav-item">
    //             <NavLink className="nav-link" to="/contact">
    //               Contact Us
    //             </NavLink>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
}

export default Navbar;
