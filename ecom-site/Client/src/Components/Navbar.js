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
import Cookies from "js-cookie";

function Navbar(props) {
  const [loginText, setLoginText] = useState();
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    LoadData();
  }, []);

  useEffect(() => {
    console.log("props count: ", props.cartCount);
  }, props.cartCount);

  const LoadData = () => {
    if (
      Cookies.get("loginCookie") !== null &&
      Cookies.get("loginCookie") !== undefined
    ) {
      setLoginText(JSON.parse(Cookies.get("loginCookie")).given_name);
    } else if (localStorage.getItem("demoUser")) {
      setLoginText(localStorage.getItem("demoUser").firstName);
    }

    SetMenuLoginText();
  };

  const SetMenuLoginText = () => {
    if (
      (Cookies.get("loginCookie") !== null &&
        Cookies.get("loginCookie") !== undefined) ||
      localStorage.getItem("demoUser")
    ) {
      setLoginText("Logout");
    } else {
      setLoginText("Login");
    }
  };

  const SetCartQtyIcon = () => {
    let value = props.cartCount >= 9 ? "9+" : props.cartCount;
    return (
      <div className="text-white cart-number bg-danger position-absolute bottom-0 end-0 w-50">
        {value}
      </div>
    );
  };

  const GetProfileImg = () => {
    const loginCookie = Cookies.get("loginCookie");
    if (loginCookie !== null && loginCookie !== undefined) {
      let googleUser = JSON.parse(Cookies.get("loginCookie"));
      return googleUser.picture;
    } else if (
      localStorage.getItem("demoUser") !== null &&
      localStorage.getItem("demoUser") !== undefined
    ) {
      let demoUser = JSON.parse(localStorage.getItem("demoUser"));

      return demoUser.profileImgURL;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar sticky-nav navbar-z">
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
            <ul className="navbar-nav mx-1">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/products/all`}
                  style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                  to="/about"
                >
                  FAQ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                  to="/build"
                >
                  Build
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={() => SetMenuLoginText()}
                  className="nav-link "
                  to="/login"
                  style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                >
                  {loginText}
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li> */}
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
        <div className="col-lg-5 col-md-4 col-sm-3 col-3 d-flex justify-content-end my-auto">
          <div className="my-auto h-100 d-flex">
            {/* <NavLink className="nav-link me-3" to="/search">
              <span className="material-icons fs-2 text-white ">search</span>
            </NavLink> */}
            <NavLink className="nav-link me-3" to="/login">
              {(Cookies.get("loginCookie") !== null &&
                Cookies.get("loginCookie") !== undefined) ||
              (localStorage.getItem("demoUser") !== null &&
                localStorage.getItem("demoUser") !== undefined) ? (
                <img
                  className=" rounded-2"
                  alt="not found"
                  width={"32px"}
                  height={"32px"}
                  src={GetProfileImg()}
                />
              ) : (
                <span className="material-icons fs-2 text-white">person</span>
              )}
            </NavLink>
            <NavLink className="nav-link me-3 position-relative" to="/cart">
              <span className="material-icons fs-2 text-white ">
                shopping_bag
              </span>
              {SetCartQtyIcon()}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
