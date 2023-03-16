import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "material-icons/iconfont/material-icons.css";
import Cart from "./Cart";

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
      <div className="row w-100">
        <div className="col-4 my-auto">
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
        <div className="col-4">
          <Link className="navbar-brand justify-content-center d-flex" to="/">
            <img className="w-25" src={require("../Images/logo-white.png")} />
          </Link>
        </div>
        <div className="col-4 d-flex justify-content-end">
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
