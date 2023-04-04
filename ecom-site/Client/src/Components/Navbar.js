import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "material-icons/iconfont/material-icons.css";
import Cart from "./Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/homepage.css";

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
      setLoginText("Logout");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar">
      <div className="row w-100">
        <div className="col-lg-5 col-md-5 col-sm-5 col-5 my-auto">
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
            className="collapse navbar-collapse justify-content-middle"
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
                  FAQ
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
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-4 col-4">
          <Link className="navbar-brand justify-content-left d-flex" to="/">
            <img
              className="img-fluid w-75"
              src={require("../Images/logo-white-orange.png")}
            />
          </Link>
        </div>
        <div className="col-lg-5 col-md-4 col-sm-3 col-3 d-flex justify-content-end">
          <div className="my-auto d-flex">
            <NavLink className="nav-link me-3" to="/search">
              <span className="material-icons fs-2 text-white ">search</span>
            </NavLink>
            <NavLink className="nav-link me-3" to="/login">
              <span className="material-icons fs-2 text-white">person</span>
            </NavLink>
            <NavLink className="nav-link" to="/cart">
              <span className="material-icons fs-2 text-white">
                shopping_bag
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
