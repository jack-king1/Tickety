import "../CSS/footer.css";
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as FacebookSVG } from "../Images/facebook.svg";
import { ReactComponent as InstagramSVG } from "../Images/instagram.svg";
import { ReactComponent as YoutubeSVG } from "../Images/youtube.svg";

function Footer() {
  return (
    <div className="">
      <div className="bg-dark text-white footer-style pt-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-4">
              <div className="">
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
                    <NavLink className="nav-link" to="/admin">
                      Admin
                    </NavLink>
                  </li>
                </ul>
              </div>
              <Link
                className="navbar-brand justify-content-left d-flex w-50 w-md-25"
                to="/"
              >
                <img
                  className="img-fluid w-100 w-sm-50 w-md-25 w-lg-25"
                  src={require("../Images/logo-white-orange.png")}
                />
              </Link>
            </div>
            <div className="col-4 ">
              <div className="d-flex justify-content-center mx-auto gap-4">
                <div className="">
                  <FacebookSVG className="social-media" />
                </div>
                <div className="">
                  <InstagramSVG />
                </div>
                <div className="">
                  <YoutubeSVG />
                </div>
              </div>
            </div>
            <div className="col-4 ">Social Media</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
